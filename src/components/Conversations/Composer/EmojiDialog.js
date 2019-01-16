import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  block: {
    '& + &': { marginTop: theme.spacing.unit * 4 },
  },
  key: {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.background.paper,
    padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit}px`,
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing.unit / 2,
    display: 'inline-block',
  },
});

function EmojiDialog(props) {
  const { classes, showDialog, setShowDialog } = props;

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onClose={handleClose}>
      <DialogTitle>
        Add emoji using your computer’s built-in emoji picker
      </DialogTitle>

      <DialogContent>
        <div className={classes.block}>
          <Typography variant="body1">
            macOS (10.9 Mavericks and later):
          </Typography>
          <Typography variant="body1">
            <span className={classes.key}>Control</span>{' '}
            <span className={classes.key}>Command</span>{' '}
            <span className={classes.key}>Space</span>
          </Typography>
        </div>
        <div className={classes.block}>
          <Typography variant="body1">
            Windows 10 (1709 Fall Creators Update and later):
          </Typography>
          <Typography variant="body1">
            <span className={classes.key}>Win</span>{' '}
            <span className={classes.key}>.</span> or{' '}
            <span className={classes.key}>Win</span>{' '}
            <span className={classes.key}>;</span>
          </Typography>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(EmojiDialog);
