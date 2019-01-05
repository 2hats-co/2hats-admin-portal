import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';

import Avatar from '@material-ui/core/Avatar';
import NotificationIcon from '@material-ui/icons/Notifications';

import { messaging } from '../store';

const styles = theme => ({
  avatar: {
    marginRight: theme.spacing.unit * 1.5,
    marginLeft: -theme.spacing.unit * 0.75,

    color:
      theme.palette.type === 'dark'
        ? theme.palette.primary.main
        : theme.palette.primary.light,
    backgroundColor: theme.palette.primary.darkText,
  },
  type: {
    '& *': {
      color:
        theme.palette.type === 'dark'
          ? 'rgba(0,0,0,.87) !important'
          : '#fff !important',
    },
  },
  clipText: {
    lineClamp: 2,
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',
  },
});

function PushNotifications(props) {
  const { classes } = props;

  const [snackbarMessage, setSnackbarMessage] = useState({});

  messaging.onMessage(function(payload) {
    console.log('Message received in PushNotifications ', payload);
    setSnackbarMessage(payload.notification);
  });

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={snackbarMessage && (snackbarMessage.body || snackbarMessage.title)}
      autoHideDuration={3000}
      onClose={() => {
        setSnackbarMessage('');
      }}
      message={
        <Grid container alignItems="center">
          <Grid item>
            <Avatar className={classes.avatar}>
              <NotificationIcon />
            </Avatar>
          </Grid>
          <Grid item xs className={classes.type}>
            <Typography variant="subtitle1">{snackbarMessage.title}</Typography>
            <Typography variant="body2" className={classes.clipText}>
              {snackbarMessage.body}
            </Typography>
          </Grid>
        </Grid>
      }
    />
  );
}
export default withStyles(styles)(PushNotifications);
