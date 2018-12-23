import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import withAnalytics from './withAnalytics';

const styles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 1.5,
    textAlign: 'center',

    '& *': {
      color: 'inherit',
      lineHeight: 1.1,
    },
  },
});

function TrackerNumber(props) {
  const { classes, theme, trackers, layout } = props;
  return trackers.map((x, i) => (
    <Grid
      container
      key={i}
      className={classes.root}
      justify="center"
      alignItems="center"
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${x.colour
          .replace('rgb', 'rgba')
          .replace(')', ', 1)')} 0%, ${x.colour
          .replace('rgb', 'rgba')
          .replace(')', ', .5)')} 100%)`,
        color: theme.palette.getContrastText(x.colour),
      }}
    >
      <Grid item>
        <Typography variant={layout.w > 1 ? 'h3' : 'h4'}>{x.sum}</Typography>
        <Typography variant={layout.w > 1 ? 'subtitle1' : 'body1'}>
          {x.label}
        </Typography>
      </Grid>
    </Grid>
  ));
}

export default withAnalytics(
  withStyles(styles, { withTheme: true })(TrackerNumber)
);
