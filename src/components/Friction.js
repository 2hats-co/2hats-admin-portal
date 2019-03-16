import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Friction = ({ children, message }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleClose = () => {
    setShowDialog(false);
  };

  const confirmHandler = children.props.onClick;
  const button = React.cloneElement(children, {
    onClick: () => {
      setShowDialog(true);
    },
  });

  return (
    <>
      {button}
      <Dialog open={showDialog} onClose={handleClose}>
        <DialogTitle>
          {(message && message.title) || 'Are you sure?'}
        </DialogTitle>
        {message && (
          <DialogContent>
            {message.customBody}
            {message.body && (
              <DialogContentText>{message.body}</DialogContentText>
            )}
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {(message && message.cancel) || 'Cancel'}
          </Button>
          <Button
            onClick={() => {
              confirmHandler();
              handleClose();
            }}
            color="primary"
            variant="contained"
            autoFocus
          >
            {(message && message.confirm) || 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Friction;
