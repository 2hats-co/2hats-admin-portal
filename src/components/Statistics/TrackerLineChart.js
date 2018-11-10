import React, { Component } from 'react';
import {getTrackerLineData} from '../../utilities/analytics/index'
import ReactEcharts from 'echarts-for-react';

class TrackerLineChart extends Component {  
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
        const {trackers,isloading} = this.state
    
        if(!isloading){
            const xAxis = trackers[0].data.map(x=>x.label)
            const colours = trackers.map(x=>x.colour)
            console.log(trackers,colours)
           const seriesData = trackers.map(x=> {
           const data = x.data.map(x=>x.value)
           return( {
            name: x.label,
            type: 'line',
            data: data,
            smooth: true,
            animation: true,
            animationDuration: 2000,
            andimationDelay: 1000,
            })
        })
           return(<ReactEcharts theme="light" style={{height:300}} option={{
            title: { show: false },
            color: colours,
          
            tooltip: {
            trigger: 'axis',
        },
        
        xAxis: {
            data: xAxis
        },
        yAxis: {},
        series:seriesData}}
        />)
        }else{
            return (<div/>)
        }
     
        
    }
}
 
export default TrackerLineChart;