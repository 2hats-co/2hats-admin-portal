import React, { Component } from 'react';
import {getTrackerData} from '../../utilities/analytics/index'
import ReactEcharts from 'echarts-for-react';

class TrackerChart extends Component {  
    state = {
        trackers:[
            { type:'candidate',
            name:'signup',
            data:[]},
            { type:'candidate',
            name:'submission',
            data:[]}
        ],
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
        let trackerData = await getTrackerData(x,range,format)
        return ({label:x.label,type:x.type,name:x.name,data:trackerData})
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
           }
            )
      
           return(<ReactEcharts theme="light" style={{height:300}} option={{
            title: { show: false },
            color: ['#BB61CD','#36A4F4','#FC875E','#C33238'],
          
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
            return (<div>
            
                {/* <ReactEcharts theme="light" style={{height:chartHeight||300}} option={{
                                    title: { show: false },
                                    color: ['#BB61CD','#36A4F4','#FC875E','#C33238'],
                                  
                                    tooltip: {
                                    trigger: 'axis',
                                },
                                
                                xAxis: {
                                    data: formatTimeStep(statsData.xAxis,timeStep).map(x=>timestampLabel(x,timeStep))
                                },
                                yAxis: {},
                                series: [{
                                    name: 'Accounts',
                                    type: 'line',
                                    data: formatData(statsData.series.account[lineType].slice(0),timeStep),
                                    smooth: true,
                                    animation: true,
                                    animationDuration: 2000,
                                    andimationDelay: 1000,
                                }
                                }} /> */}
            </div>)
        }
     
        
    }
}
 
export default TrackerChart;