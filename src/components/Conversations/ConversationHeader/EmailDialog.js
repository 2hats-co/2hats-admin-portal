import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@material-ui/core/Button';

import { updateConversation } from '../../../utilities/conversations';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    minWidth: 480,
  },
  iconButton: {
    padding: theme.spacing(1.5),
    borderRadius: '50%',
    minWidth: 'auto',
    marginRight: -10,
    '& svg': { marginRight: 0 },
  },
});

function EmailDialog(props) {
  const { classes, showDialog, conversation, setShowDialog } = props;

  const [email, setEmail] = useState('');

  const addEmail = () => {
    const channels = { ...conversation.channels, email };
    updateConversation(conversation.id, { channels });
    handleClose();
  };
  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <Dialog
      open={showDialog}
      onClose={handleClose}
      classes={{ paper: classes.root }}
    >
      <DialogTitle>Set email</DialogTitle>

      <DialogContent>
        <TextField
          label="Email"
          onKeyPress={e => {
            if (e.key === 'Enter') addEmail();
          }}
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          fullWidth
          autoFocus
        />
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" onClick={addEmail}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(EmailDialog);
