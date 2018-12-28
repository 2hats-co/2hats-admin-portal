import React, { useState } from 'react';

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
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';

import IntegrationReactSelect from '../../IntegrationReactSelect';

import { getInitials } from '../../../utilities';
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
            const notSubscribedAdmins = context
              .filter(x => !subscribersUIDs.includes(x.id))
              .map(x => ({
                label: `${x.givenName} ${x.familyName}`,
                value: x.id,
              }));
            return (
              <React.Fragment>
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
                        {x.photoURL ? (
                          <Avatar src={x.photoURL} />
                        ) : (
                          <Avatar>
                            {getInitials(`${x.givenName} ${x.familyName}`)}
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${x.givenName} ${x.familyName}`}
                        secondary={x.title}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={() => {
                            handleRemoveSubscriber(x.id);
                          }}
                          className={classes.iconButton}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </React.Fragment>
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
