
import React, { Component } from 'react';
import {getTrackerSum} from '../../utilities/analytics/index'
import ReactEcharts from 'echarts-for-react';
import withAnalytics from './withAnalytics'
class TrackerDonutChart extends Component {  
    render() { 
        const {title,trackers} = this.props
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
        
    }
}
 
export default withAnalytics(TrackerDonutChart);