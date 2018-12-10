import React from 'react';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import withAnlytics from './withAnalytics'
function TrackerBarChart (props){  

        const {trackers,title} = props
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
           return(<ReactEchartsCore echarts={echarts} theme="light" style={{height:'100%'}} 
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
                    // magicType: {
                    //     type: ['stack', 'tiled']
                    // },
                   // dataView: {},
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
    
}
 
export default withAnlytics(TrackerBarChart);
