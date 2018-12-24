import React, { useState } from 'react';
import { messaging } from '../store';
import Snackbar from '@material-ui/core/Snackbar';
import withStyles from '@material-ui/core/styles/withStyles';
const styles = theme => ({
  snackbar: {
    marginRight: theme.spacing.unit * 11.5,
    '& > div': { justifyContent: 'center' },
  },
});
function PushNotifications(props) {
  const { classes } = props;

  const [snackbarMessage, setSnackbarMessage] = useState('');

  messaging.onMessage(function(payload) {
    //console.log('Message received in PushNotifications ', payload);
    console.log(
      'Message received in PushNotifications ',
      setSnackbarMessage(payload.notification.body)
    );
    // ...
  });
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={snackbarMessage.length > 0}
      autoHideDuration={3000}
      onClose={() => {
        setSnackbarMessage('');
      }}
      message={snackbarMessage}
      className={classes.snackbar}
    />
  );
}
export default withStyles(styles)(PushNotifications);
