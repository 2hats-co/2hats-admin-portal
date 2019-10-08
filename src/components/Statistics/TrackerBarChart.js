import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
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
    return {
      name: x.label,
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 1,
            color: x.colour.replace('rgb', 'rgba').replace(')', ', 1)'),
          },
          {
            offset: 0,
            color: x.colour.replace('rgb', 'rgba').replace(')', ', .8)'),
          },
        ]),
      },
      data,
    };
  });

  const sums = trackers.map((x, i) => (
    <Chip
      key={i}
      label={
        <>
          <b>{x.label}</b>: {x.sum}
        </>
      }
      style={{
        backgroundColor: x.colour,
        color: theme.palette.getContrastText(x.colour),
        marginBottom: theme.spacing(1),
      }}
    />
  ));

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      alignItems="center"
      style={{ height: '100%' }}
    >
      <Grid item xs style={{ width: '100%' }}>
        <ReactEchartsCore
          echarts={echarts}
          theme="light"
          style={{ height: '100%' }}
          option={{
            title: {
              text: title,
              top: theme.spacing(2),
              left: 'center',
              textStyle: {
                color: theme.palette.text.primary,
                fontSize: 20,
                fontWeight: 500,
              },
            },
            color: trackers.map(x => x.colour),
            grid: {
              left: theme.spacing(3),
              right: theme.spacing(3),
              bottom: theme.spacing(3),
              containLabel: true,
            },

            tooltip: { trigger: 'axis' },

            xAxis: {
              data: xAxis,
              silent: false,
              axisLabel: { fontSize: 14 },
              axisLine: {
                lineStyle: {
                  color:
                    theme.palette.type === 'dark'
                      ? 'rgba(255,255,255,.2)'
                      : 'rgba(0,0,0,.2)',
                },
              },
            },
            yAxis: {
              type: 'value',
              splitLine: { show: false },
              axisLabel: { fontSize: 14 },
              axisLine: {
                lineStyle: {
                  color:
                    theme.palette.type === 'dark'
                      ? 'rgba(255,255,255,.2)'
                      : 'rgba(0,0,0,.2)',
                },
              },
            },
            series: seriesData,
            legend: { show: false },
            textStyle: {
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
            },
          }}
        />
      </Grid>
      <Grid
        item
        style={{
          padding: theme.spacing(2),
          paddingTop: 0,
          paddingBottom: theme.spacing(1),
          textAlign: 'center',
        }}
      >
        {sums}
      </Grid>
    </Grid>
  );
}

export default withAnalytics(
  withStyles(null, { withTheme: true })(TrackerBarChart)
);
