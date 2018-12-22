import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';

import withAnalytics from './withAnalytics';

function TrackerDonutChart(props) {
  const { theme, title, trackers } = props;
  return (
    <ReactEchartsCore
      echarts={echarts}
      theme="light"
      style={{ height: '100%' }}
      option={{
        title: {
          text: title,
          top: theme.spacing.unit * 2,
          left: 'center',

          textStyle: {
            color: theme.palette.text.primary,
            fontSize: 20,
            fontWeight: 500,
          },
        },
        grid: {
          left: theme.spacing.unit * 2,
          right: theme.spacing.unit * 2,
          bottom: theme.spacing.unit * 8,
          containLabel: true,
        },
        tooltip: {
          trigger: 'item',
          formatter: '<b>{b}</b> <br/>{c} ({d}%)',
        },
        legend: {
          show: true,
          left: 'center',
          bottom: theme.spacing.unit * 2,
          textStyle: { color: theme.palette.text.primary },
        },
        color: trackers.map(x => x.colour),
        series: [
          {
            name: title,
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: { show: false },
            labelLine: { normal: { show: false } },
            data: trackers.map(x => ({ name: x.label, value: x.sum })),
          },
        ],
        textStyle: {
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily,
        },
      }}
    />
  );
}

export default withAnalytics(
  withStyles(null, { withTheme: true })(TrackerDonutChart)
);
