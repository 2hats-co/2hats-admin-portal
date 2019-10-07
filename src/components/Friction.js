import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  dryWrapper: {
    marginTop: theme.spacing.unit * 2,
    userSelect: 'none',
  },
  dryField: { marginTop: theme.spacing.unit },
});

const Friction = ({ classes, children, message, dryCommand }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dryText, setDryText] = useState('');

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
            {dryCommand && (
              <div className={classes.dryWrapper}>
                <DialogContentText>
                  Type {dryCommand} below to continue:
                </DialogContentText>
                <TextField
                  value={dryText}
                  variant="filled"
                  onChange={e => {
                    setDryText(e.target.value);
                  }}
                  className={classes.dryField}
                  InputProps={{ disableUnderline: true }}
                  autoFocus
                  margin="dense"
                  label={dryCommand}
                  fullWidth
                />
              </div>
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
            disabled={dryCommand ? dryText !== dryCommand : false}
          >
            {(message && message.confirm) || 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(Friction);
