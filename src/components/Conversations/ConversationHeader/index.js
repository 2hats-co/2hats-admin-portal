import React, { useState, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import AddSubscriberIcon from '@material-ui/icons/GroupAdd';
// import LinkIcon from '@material-ui/icons/Link';
import BackIcon from '@material-ui/icons/ArrowBack';
// import StarOutlineIcon from '@material-ui/icons/StarBorder';
import EmailIcon from '@material-ui/icons/Markunread';
import LinkedInIcon from '../../../assets/icons/LinkedIn';
import SpamIcon from '@material-ui/icons/Report';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import ConversationTypeIcon from '../ConversationTypeIcon';
import ManageSubscribersDialog from './ManageSubscribersDialog';
import DebugButton from '../../DebugButton';
import useWindowSize from '../../../hooks/useWindowSize';
import { copyToClipboard } from '../../../utilities';
import {
  markAsSpam,
  unmarkAsSpam,
  updateCategory,
} from '../../../utilities/conversations';
import conversationCategories from '../../../constants/conversationCategories';
import EmailDialog from './EmailDialog';
const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 1.5}px ${
      theme.spacing.unit
    }px ${theme.spacing.unit * 2.25}px`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  typeIcon: {
    marginTop: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit,
    opacity: 0.87,
    color: theme.palette.text.primary,
  },

  categoryDropdownWrapper: {
    margin: 0,
    marginLeft: theme.spacing.unit * 2,
  },
  categoryDropdown: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit - 1,
    paddingRight: theme.spacing.unit * 3,
    fontSize: '.875rem',
    minWidth: 100,
  },

  linkedInButton: {
    color: `${theme.palette.text.secondary} !important`,
  },

  actionButtons: {
    position: 'relative',
    paddingLeft: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,

    '&::before': {
      content: '""',
      display: 'block',
      backgroundColor: theme.palette.divider,
      height: theme.spacing.unit * 4,
      width: 1,

      position: 'absolute',
      left: 0,
      top: theme.spacing.unit,
    },
  },
});

function ConversationHeader(props) {
  const windowSize = useWindowSize();

  const { classes, conversation, closeConversation } = props;

  const [showSubscriberDialog, setShowSubscriberDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(
    () => {
      setCategory(conversation.category ? conversation.category : '');
    },
    [conversation]
  );

  const handleChangeCategory = e => {
    setCategory(e.target.value);
    if (e.target.value) updateCategory(conversation, e.target.value);
  };

  return (
    <React.Fragment>
      <Grid item className={classes.root}>
        <Grid container alignItems="center">
          {windowSize.isMobile && (
            <Grid item>
              <IconButton onClick={closeConversation}>
                <BackIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item xs>
            <Grid container alignItems="flex-start">
              <ConversationTypeIcon
                type={conversation.type}
                className={classes.typeIcon}
              />

              <Typography variant="h6">{conversation.displayName}</Typography>

              {conversation.type === 'client' && (
                <TextField
                  select
                  InputProps={{
                    disableUnderline: true,
                    classes: { inputMarginDense: classes.categoryDropdown },
                  }}
                  margin="dense"
                  variant="filled"
                  value={category}
                  onChange={handleChangeCategory}
                  className={classes.categoryDropdownWrapper}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value="">No category</MenuItem>
                  {conversationCategories.map(x => (
                    <MenuItem key={x.value} value={x.value}>
                      {x.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>
          </Grid>
          <Grid item>
            {conversation.channels.email ? (
              <Tooltip
                onClick={() => {
                  copyToClipboard(conversation.channels.email);
                }}
                title={
                  <React.Fragment>
                    <b>{conversation.channels.email}</b>
                    <br />
                    (Click to copy)
                  </React.Fragment>
                }
              >
                <IconButton>
                  <EmailIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip
                onClick={() => {
                  setShowEmailDialog(true);
                }}
                title={
                  <React.Fragment>
                    <b>add email</b>
                  </React.Fragment>
                }
              >
                <IconButton>
                  <EmailIcon />
                </IconButton>
              </Tooltip>
            )}
            {conversation.channels.linkedin && (
              //<Tooltip title={conversation.channels.email}>
              <IconButton disabled className={classes.linkedInButton}>
                <LinkedInIcon />
              </IconButton>
              //</Tooltip>
            )}
          </Grid>
          <Grid item className={classes.actionButtons}>
            <DebugButton
              title="Copy conversation ID"
              toCopy={conversation.id}
            />
            <DebugButton toCopy={conversation.UID} />
            <Tooltip title="Manage subscribers">
              <IconButton
                onClick={() => {
                  setShowSubscriberDialog(true);
                }}
              >
                <AddSubscriberIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                conversation.type === 'spam' ? 'Unmark as spam' : 'Mark as spam'
              }
            >
              <IconButton
                onClick={() => {
                  if (conversation.type === 'spam')
                    unmarkAsSpam(conversation.id);
                  else markAsSpam(conversation.id);
                }}
              >
                <SpamIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <EmailDialog
        conversation={conversation}
        showDialog={showEmailDialog}
        setShowDialog={setShowEmailDialog}
      />
      <ManageSubscribersDialog
        conversation={conversation}
        showDialog={showSubscriberDialog}
        setShowDialog={setShowSubscriberDialog}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(ConversationHeader);
