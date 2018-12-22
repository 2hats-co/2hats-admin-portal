import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';

import withAnalytics from './withAnalytics';

const styles = theme => ({
  root: {
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  circularProgress: {
    opacity: 0.87,
    position: 'absolute',
    top: 0,
    left: 0,
    color: 'inherit',

    padding: theme.spacing.unit * 2,
    boxSizing: 'border-box',
  },
  circularProgressSvg: {
    width: '100%',
    height: '100%',
  },
  circularProgressBgCircle: {
    opacity: 0.2,
  },
  linearProgress: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
  linearProgressBar: {
    backgroundColor: 'currentColor',
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 8,
    zIndex: 9,

    textAlign: 'center',
    '& *': {
      color: 'inherit',
      lineHeight: 1.1,
    },
    '& small': {
      fontSize: '.67em',
      fontWeight: 400,
    },
  },
});

function TrackerPercentage(props) {
  const { classes, theme, title, trackers, layout } = props;

  const colour = trackers[0].colour;

  if (trackers.length < 2)
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{
          height: '100%',
          backgroundImage: `linear-gradient(to bottom right, ${colour
            .replace('rgb', 'rgba')
            .replace(')', ', 1)')} 0%, ${colour
            .replace('rgb', 'rgba')
            .replace(')', ', .5)')} 100%)`,
        }}
      >
        <CircularProgress
          style={{ color: theme.palette.getContrastText(colour) }}
        />
      </Grid>
    );

  let percentage = 0;
  if (trackers[0].sum < trackers[1].sum) {
    percentage = Math.round((trackers[0].sum / trackers[1].sum) * 100);
  } else {
    percentage = Math.round((trackers[1].sum / trackers[0].sum) * 100);
  }

  return (
    <React.Fragment>
      <Grid
        container
        className={classes.root}
        justify="center"
        alignItems="center"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${colour
            .replace('rgb', 'rgba')
            .replace(')', ', 1)')} 0%, ${colour
            .replace('rgb', 'rgba')
            .replace(')', ', .5)')} 100%)`,
          color: theme.palette.getContrastText(colour),
        }}
      >
        {layout.w > 1 && layout.h > 1 ? (
          <Grid item className={classes.container}>
            <CircularProgress
              className={classes.circularProgress}
              classes={{
                svg: classes.circularProgressSvg,
                circle: classes.circularProgressBgCircle,
              }}
              variant="determinate"
              value={100}
              size="100%"
              thickness={3}
            />
            <CircularProgress
              className={classes.circularProgress}
              classes={{ svg: classes.circularProgressSvg }}
              variant="static"
              value={percentage}
              size="100%"
              thickness={3}
            />
          </Grid>
        ) : (
          <LinearProgress
            variant="determinate"
            value={percentage}
            className={classes.linearProgress}
            classes={{ bar: classes.linearProgressBar }}
          />
        )}
      </Grid>

      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.textContainer}
        style={
          layout.w > 1 && layout.h > 1
            ? { padding: theme.spacing.unit * 4 }
            : {}
        }
      >
        <Tooltip
          title={
            <React.Fragment>
              <b>{trackers[0].label}</b>: {trackers[0].sum} <br />
              <b>{trackers[1].label}</b>: {trackers[1].sum}
            </React.Fragment>
          }
        >
          <Grid item>
            <Typography
              className={classes.percentage}
              variant={layout.w > 1 ? 'display2' : 'display1'}
            >
              {percentage}
              <small>%</small>
            </Typography>
            <Typography variant={layout.w > 1 ? 'subheading' : 'body2'}>
              {title}
            </Typography>
          </Grid>
        </Tooltip>
      </Grid>
    </React.Fragment>
  );
}

export default withAnalytics(
  withStyles(styles, { withTheme: true })(TrackerPercentage)
);
