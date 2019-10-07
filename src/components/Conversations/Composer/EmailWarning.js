import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

function EmojiDialog(props) {
  const { showDialog, handleNo, handleYes } = props;

  return (
    <Dialog open={showDialog} onClose={handleNo}>
      <DialogTitle>
        This email has no subject! Are you sure you want to send this email?
      </DialogTitle>

      <DialogActions>
        <Button onClick={handleNo} color="primary">
          No, cancel
        </Button>
        <Button onClick={handleYes} color="primary" variant="contained">
          Yes, send without subject
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmojiDialog;
