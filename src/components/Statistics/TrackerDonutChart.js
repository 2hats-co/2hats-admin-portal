
import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';

import withAnalytics from './withAnalytics'

function TrackerDonutChart(props){
    const { theme, title, trackers } = props;
    return(<ReactEchartsCore
        echarts={echarts}
        theme="light" style={{height:'100%'}} 
        option = {{
            title: {
                text: title,
                top: theme.spacing.unit * 2,
                left: 'center',

                textStyle: {
                    fontFamily: 'Helvetica Neue',
                    fontSize: 20,
                    fontWeight: 500,
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: "<b>{b}</b> <br/>{c} ({d}%)"
            },
            legend: {
                show: 'true',
            },
            color: trackers.map(x=>x.colour),
            series: [
                {
                    name:title,
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            textBorderWidth: 2,
                            textBorderColor: '#000',
                            textStyle: { fontSize: 16 },
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: 20,
                                fontFamily: 'Helvetica Neue',
                                fontWeight: '500',
                            }
                        }
                    },
                    labelLine: { normal: { show: false } },
                    data: trackers.map(x => ({ name:x.label, value:x.sum }))
                }
            ]
        }}
    />)
}
 
export default withAnalytics(withStyles(null, { withTheme:true })(TrackerDonutChart));
