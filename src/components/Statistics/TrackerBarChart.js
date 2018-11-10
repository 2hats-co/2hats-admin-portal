import React, { Component } from 'react';
import {getTrackerLineData} from '../../utilities/analytics/index'
import ReactEcharts from 'echarts-for-react';

class TrackerBarChart extends Component {  
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
        let trackerData = await getTrackerLineData(x,range,format)
        const tracker = Object.assign({data:trackerData},x)
        return (tracker)
     })
      const trackUpdater = this.updateTrackers
      Promise.all(trackerPromises).then(function(updatedTrackers) {
        trackUpdater(updatedTrackers)
    })
    }
    render() { 
        const {trackers,isloading,title} = this.state
        if(!isloading){
            const xAxis = trackers[0].data.map(x=>x.label)
           const seriesData = trackers.map(x=> {
           const data = x.data.map(x=>x.value)
           return( {
            name: x.label,
            type: 'bar',
            data,
            animationDelay: function (idx) {
                return idx * 10;
            }
        })
        })
           return(<ReactEcharts theme="light" style={{height:300}} 
           option = {{
            title: {
                text: title
            },
            legend: {
                data: trackers.map(x=>x.label),
                align: 'left'
            },
            toolbox: {
                // y: 'bottom',
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    },
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            color:trackers.map(x=>x.colour),
            tooltip: {},
            xAxis: {
                data: xAxis,
                silent: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
            },
            series:seriesData,
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        }}
        />)
        }else{
            return (<div/>)
        }
     
        
    }
}
 
export default TrackerBarChart;