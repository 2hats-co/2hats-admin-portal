
import React, { Component } from 'react';
import {getTrackerSum} from '../../utilities/analytics/index'
import ReactEcharts from 'echarts-for-react';

class TrackerDonutChart extends Component {  
    state = {
         isloading:true
    }
    updateTrackers =(trackers) =>{this.setState({trackers,isloading:false})}
     componentDidMount() { 
        this.loadData()
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.format !== this.props.format || prevProps.range !== this.props.range){
            this.loadData()
        }
    }
    loadData = async()=>{
        const {trackers,range,format} = this.props
     const trackerPromises = trackers.map(async(x)=>{
        let trackerData = await getTrackerSum(x,range) 
        const tracker = Object.assign({sum:trackerData},x)
        return (tracker)
      })
      const trackUpdater = this.updateTrackers
      Promise.all(trackerPromises).then(function(updatedTrackers) {
        trackUpdater(updatedTrackers)
    })
    }
    render() { 
        const {trackers,isloading} = this.state
        const {title} = this.props
        console.log('trackers',trackers)
        if(!isloading){
        return(<ReactEcharts theme="light" style={{height:300}} 
        option = {{
            tooltip: {
                trigger: 'item',
               formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:trackers.map(x=>x.label)
            },color:trackers.map(x=>x.colour),
            series: [
                {
                    name:title,
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:trackers.map(x=>({name:x.label,value:x.sum}))
                }
            ]
        }}
        />)
        }else{
            return (<div/>)
       }
    }
}
 
export default TrackerDonutChart;