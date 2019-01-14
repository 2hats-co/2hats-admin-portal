import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@material-ui/core/Button';

import { updateConversation } from '../../../utilities/conversations/index';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    minWidth: 480,
  },
  iconButton: {
    padding: theme.spacing.unit * 1.5,
    borderRadius: '50%',
    minWidth: 'auto',
    marginRight: -10,
    '& svg': { marginRight: 0 },
  },
});

function EmailDialog(props) {
  const { classes, showDialog, conversation, setShowDialog } = props;

  const handleClose = email => {
    let channels = conversation.channels;
    channels[email] = email;
    updateConversation(conversation.id, channels);
    setShowDialog(false);
  };

  return (
    <Dialog
      open={showDialog}
      onClose={handleClose}
      classes={{ paper: classes.root }}
    >
      <DialogTitle>Set Email</DialogTitle>

      <DialogContent>
        <TextField
          label="email"
          onKeyPress={e => {
            if (e.key === 'Enter') handleClose(e.target.value);
          }}
        />
      </DialogContent>

      <DialogActions />
    </Dialog>
  );
}

export default withStyles(styles)(EmailDialog);
