import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

import LinkedInIcon from '../../../assets/icons/LinkedIn';

import moment from 'moment';

const styles = theme => ({
  root: {
    // '& + &': { marginTop: theme.spacing.unit },
  },
  details: {
    position: 'relative',
  },
  icon: {
    marginLeft: -theme.spacing.unit * 0.375,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 0.25,
    color:
      theme.palette.type === 'dark'
        ? theme.palette.primary.darkText
        : theme.palette.primary.main,
  },
  timestamp: {
    position: 'absolute',
    top: theme.spacing.unit * 0.5,
    right: 0,
    opacity: 0.54,
  },
});

function ConnectionRequest(props) {
  const { classes, data } = props;

  return (
    <ListItem
      button
      component="a"
      href={`https://linkedin.com${data.profileUrl}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Grid container className={classes.root}>
        <Grid item>
          <div className={classes.icon}>
            <LinkedInIcon />
          </div>
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
    </ListItem>
  );
}

export default withStyles(styles)(ConnectionRequest);
