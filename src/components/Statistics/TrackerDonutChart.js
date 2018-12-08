
import React from 'react';


import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';



import withAnalytics from './withAnalytics'
function TrackerDonutChart(props){  

        const {title,trackers} = props
        return(<ReactEchartsCore
            echarts={echarts}
            theme="light" style={{height:'100%'}} 
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
}
 
export default withAnalytics(TrackerDonutChart);
