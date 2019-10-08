import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import Item from './Item';
import useCollection from '../../../hooks/useCollection';
import ScrollyRolly from '../../ScrollyRolly';

const styles = theme => ({
  root: { minWidth: 240 },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  dialogContent: {
    paddingBottom: 0,
    borderTop: `1px solid ${theme.palette.divider}`,
  },

  listRoot: {
    paddingTop: 0,
  },
  infiniteScrollWrapper: {
    overflowY: 'auto',
    marginLeft: -theme.spacing(1),
    marginRight: -theme.spacing(1),

    minHeight: 200,
    height: 'calc(100vh - 173px)',
  },
  listLoader: {
    marginTop: theme.spacing(2),
  },
});

function EmailRecipientsContent(props) {
  const { classes, collectionPath, setShowDialog } = props;

  const [recipientsState, recipientsDispatch] = useCollection({
    path: collectionPath,
    // sort: { field: 'createdAt', direction: 'desc' },
    sort: { field: 'clicks', direction: 'desc' },
  });
  const recipients = recipientsState.documents;

  return (
    <>
      <DialogTitle className={classes.dialogTitle}>
        All recipients ({recipients && recipients.length})
      </DialogTitle>

      <IconButton
        className={classes.closeButton}
        onClick={() => {
          setShowDialog(false);
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent className={classes.dialogContent}>
        {recipients && recipients.length > 0 && (
          <div className={classes.infiniteScrollWrapper}>
            <ScrollyRolly
              dataState={recipientsState}
              dataDispatch={recipientsDispatch}
              classes={{ listLoader: classes.listLoader }}
              disablePadding
            >
              {data => <Item key={data.id} data={data} />}
            </ScrollyRolly>
          </div>
        )}
      </DialogContent>
    </>
  );
}

function EmailRecipients(props) {
  const { classes, showDialog, setShowDialog, collectionPath } = props;

  return (
    <Dialog
      open={showDialog}
      onClose={() => {
        setShowDialog(false);
      }}
      classes={{ paper: classes.root }}
    >
      <EmailRecipientsContent
        classes={classes}
        collectionPath={collectionPath}
        setShowDialog={setShowDialog}
      />
    </Dialog>
  );
}

export default withStyles(styles)(EmailRecipients);
