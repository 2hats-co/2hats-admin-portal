import React from 'react';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import withAnalytics from './withAnalytics'
function TrackerLineChart(props){  
            const {trackers} = props
            const xAxis = trackers[0].data.map(x=>x.label)
            const colours = trackers.map(x=>x.colour)
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
           return(<ReactEchartsCore      
            echarts={echarts}
             theme="light" style={{height:'100%'}} option={{
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
}
export default withAnalytics(TrackerLineChart);
