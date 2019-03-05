import React from 'react';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

import DeliveredIcon from '@material-ui/icons/MoveToInboxOutlined';
import BouncedIcon from '@material-ui/icons/ReportOutlined';

const styles = theme => ({
  root: {
    userSelect: 'none',
  },

  statusIcon: {
    marginLeft: -theme.spacing.unit * 1.5,
    marginRight: theme.spacing.unit,
  },

  tooltip: {
    textAlign: 'center',
  },

  analytic: {
    marginLeft: theme.spacing.unit * 4,
  },
});

function Item(props) {
  const { classes, data } = props;

  return (
    <ListItem className={classes.root}>
      <Grid container wrap="nowrap" alignItems="center" spacing={8}>
        <Grid item>
          <Tooltip
            title={data.delivered ? 'Delivered' : 'Bounced'}
            classes={{ tooltip: classes.tooltip }}
          >
            {data.delivered ? (
              <DeliveredIcon className={classes.statusIcon} />
            ) : (
              <BouncedIcon className={classes.statusIcon} />
            )}
          </Tooltip>
        </Grid>

        <Grid item xs>
          <Typography variant="subtitle1">{data.fullName}</Typography>
          <Typography variant="body2">{data.email}</Typography>
          <Typography variant="body2" color="textSecondary">
            Delivered {moment.unix(data.createdAt.seconds).fromNow()}
          </Typography>
        </Grid>

        <Grid item className={classes.analytic}>
          <Typography variant="subtitle1">{data.clicks}</Typography>
          <Typography variant="body2">clicks</Typography>
        </Grid>
        <Grid item className={classes.analytic}>
          <Typography variant="subtitle1">{data.opens}</Typography>
          <Typography variant="body2">opens</Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default withStyles(styles)(Item);
