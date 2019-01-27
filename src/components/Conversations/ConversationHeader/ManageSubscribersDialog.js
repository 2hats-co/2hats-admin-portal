import React, { useState, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/Button';

import RemoveIcon from '@material-ui/icons/Close';
import AssigneeIcon from '@material-ui/icons/HowToRegOutlined';
import { setAssignee } from '../../../utilities/conversations';

import Button from '@material-ui/core/Button';

import IntegrationReactSelect from '../../IntegrationReactSelect';
import SuperAvatar from '../../SuperAvatar';
import { AdminsConsumer } from '../../../contexts/AdminsContext';
import { updateProperties } from '../../../utilities/firestore';
import { COLLECTIONS } from '../../../constants/firestore';

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

function ManageSubscribersDialog(props) {
  const { classes, showDialog, conversation, setShowDialog } = props;
  const [subscribersUIDs, setSubscribersUIDs] = useState(
    conversation.subscribedAdmins
  );

  useEffect(
    () => {
      setSubscribersUIDs(conversation.subscribedAdmins);
    },
    [conversation]
  );

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleAddSubscriber = data => {
    const newSubscribers = subscribersUIDs;

    if (data.value) {
      newSubscribers.push(data.value);
      updateProperties(COLLECTIONS.conversations, conversation.id, {
        subscribedAdmins: newSubscribers,
      });
      setSubscribersUIDs(newSubscribers);
    }
  };

  const handleRemoveSubscriber = UID => {
    const newSubscribers = subscribersUIDs;
    const index = subscribersUIDs.indexOf(UID);

    if (index > -1) {
      newSubscribers.splice(index, 1);
      updateProperties(COLLECTIONS.conversations, conversation.id, {
        subscribedAdmins: newSubscribers,
      });
      setSubscribersUIDs(newSubscribers);
    }
  };

  return (
    <Dialog
      open={showDialog}
      onClose={handleClose}
      classes={{ paper: classes.root }}
    >
      <DialogTitle>Manage Subscribers</DialogTitle>

      <DialogContent>
        <AdminsConsumer>
          {context => {
            const subscribedAdmins = context.admins.filter(x =>
              subscribersUIDs.includes(x.id)
            );
            const notSubscribedAdmins = context.admins
              .filter(x => !subscribersUIDs.includes(x.id))
              .map(x => ({
                label: `${x.givenName} ${x.familyName}`,
                value: x.id,
              }));
            return (
              <>
                <IntegrationReactSelect
                  placeholder="Add Subscriber"
                  autoFocus
                  changeHandler={handleAddSubscriber}
                  suggestions={notSubscribedAdmins}
                />

                <List>
                  {subscribedAdmins.map((x, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemAvatar>
                        <SuperAvatar data={x} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${x.givenName} ${x.familyName} ${
                          x.id === conversation.assignee ? '(Owner 👑)' : ''
                        }`}
                        secondary={x.title}
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title={`Make ${x.givenName} the owner`}>
                          <span>
                            <IconButton
                              disabled={x.id === conversation.assignee}
                              onClick={() => {
                                setAssignee(x.id, conversation);
                              }}
                              className={classes.iconButton}
                            >
                              <AssigneeIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title={`Unsubscribe ${x.givenName}`}>
                          <span>
                            <IconButton
                              disabled={x.id === conversation.assignee}
                              onClick={() => {
                                handleRemoveSubscriber(x.id);
                              }}
                              className={classes.iconButton}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </>
            );
          }}
        </AdminsConsumer>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(ManageSubscribersDialog);
