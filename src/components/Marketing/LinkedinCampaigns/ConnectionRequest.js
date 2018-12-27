import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import LinkedInIcon from '../../../assets/icons/LinkedIn';

import moment from 'moment';

const styles = theme => ({
  root: {
    '& + &': { marginTop: theme.spacing.unit },
  },
  details: {
    position: 'relative',
    paddingTop: theme.spacing.unit * 1.25,
  },
  linkedInButton: {
    marginLeft: -theme.spacing.unit * 1.75,
  },
  timestamp: {
    position: 'absolute',
    top: theme.spacing.unit * 1.75,
    right: 0,
    opacity: 0.54,
  },
});

function ConnectionRequest(props) {
  const { classes, data } = props;

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <IconButton
          className={classes.linkedInButton}
          href={`https://linkedin.com${data.profileUrl}`}
          color="primary"
        >
          <LinkedInIcon />
        </IconButton>
      </Grid>

      <Grid item xs className={classes.details}>
        <Typography variant="subtitle1">{data.fullName}</Typography>
        <Typography variant="body2" className={classes.timestamp}>
          {moment.unix(data.createdAt.seconds).fromNow()}
        </Typography>

        <Typography variant="body2">{data.tagLine}</Typography>
        <Typography variant="body2">{data.currentPosition}</Typography>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ConnectionRequest);
