import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import withAnalytics from './withAnalytics';

function TrackerBarChart(props) {  
    const { theme, trackers, title } = props;
    const xAxis = trackers[0].data.map(x => x.label);
    const seriesData = trackers.map(x => {
        const data = x.data.map(x => x.value);
        return( {
            name: x.label,
            type: 'bar',
            data,
        });
    });

    const sums = trackers.map((x, i) =>
        <Chip key={i}
            label={`${x.label} (Total: ${x.sum})`}
            style={{ backgroundColor: x.colour, color: theme.palette.getContrastText(x.colour) }}
        />
    );

    return <React.Fragment>
    <ReactEchartsCore echarts={echarts} theme="light" style={{height:'100%'}} 
        option = {{
            title: {
                text: title,
                top: theme.spacing.unit * 2,
                left: theme.spacing.unit * 2,
                textStyle: {
                    fontFamily: 'Helvetica Neue',
                    fontSize: 20,
                    fontWeight: 500,
                },
            },
            color: trackers.map(x => x.colour),
            grid: {
                left: theme.spacing.unit * 3,
                right: theme.spacing.unit * 3,
                bottom: theme.spacing.unit * 3,
                containLabel: true,
            },

            tooltip: { trigger: 'axis' },

            xAxis: {
                data: xAxis,
                silent: false,
                axisLabel: {
                    fontSize: 14,
                    color: theme.palette.text.primary,
                },
                axisLine: {
                    lineStyle: { color: 'rgba(0,0,0,.2)' },
                },
            },
            yAxis: {
                type: 'value',
                splitLine: { show: false },
                axisLabel: {
                    fontSize: 14,
                    color: theme.palette.text.primary,
                },
                axisLine: {
                    lineStyle: { color: 'rgba(0,0,0,.2)' },
                },
            },
            series: seriesData,
            legend: { show: false },
        }}
    />
    <div style={{ position:'absolute', top:theme.spacing.unit*2, right:theme.spacing.unit*6 }}>
        { sums }
    </div>
    </React.Fragment>;
}
 
export default withAnalytics(withStyles(null, {withTheme:true})(TrackerBarChart));
