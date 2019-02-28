import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import AddSubscriberIcon from '@material-ui/icons/GroupAddOutlined';
// import LinkIcon from '@material-ui/icons/LinkOutlined';
import BackIcon from '@material-ui/icons/ArrowBackOutlined';
// import StarOutlineIcon from '@material-ui/icons/StarBorder';
import EmailIcon from '@material-ui/icons/MarkunreadOutlined';
import AddIcon from '@material-ui/icons/AddOutlined';
import LinkedInIcon from '../../../assets/icons/LinkedIn';
import SpamIcon from '@material-ui/icons/ReportOutlined';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import ConversationTypeIcon from '../ConversationTypeIcon';
import ManageSubscribersDialog from './ManageSubscribersDialog';
import DebugButton from '../../DebugButton';
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
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit * 1.5,
      paddingRight: theme.spacing.unit,
    },
  },
  typeIcon: {
    marginTop: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit,
    opacity: 0.87,
    color: theme.palette.text.primary,

    [theme.breakpoints.down('sm')]: { display: 'none' },
  },

  categoryDropdownWrapper: {
    margin: 0,
    marginLeft: theme.spacing.unit * 2,
    // [theme.breakpoints.down('md')]: { marginLeft: theme.spacing.unit },
  },
  categoryDropdown: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit - 1,
    paddingRight: theme.spacing.unit * 3,
    fontSize: '.875rem',
    minWidth: 100,

    [theme.breakpoints.down('xs')]: { minWidth: 'auto', width: 80 },
  },

  rightButtons: {
    [theme.breakpoints.down('sm')]: { display: 'none' },
  },

  emailAdd: {
    position: 'absolute',
    bottom: theme.spacing.unit * 0.75,
    right: theme.spacing.unit * 0.75,

    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.background.paper,
    borderRadius: '50%',
    fontSize: 18,
  },

  iconButton: {
    [theme.breakpoints.down('sm')]: { padding: theme.spacing.unit },
  },
  linkedInButton: {
    color: `${theme.palette.text.secondary} !important`,
  },

  actionButtons: {
    position: 'relative',
    display: 'inline-block',
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

    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
      '&::before': {
        height: theme.spacing.unit * 3,
      },
    },
  },

  backButton: { marginLeft: -theme.spacing.unit },
});

function ConversationHeader(props) {
  const isMobile = useMediaQuery('(max-width: 704px)');

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
    <>
      <Grid item className={classes.root}>
        <Grid container alignItems="center">
          {isMobile && (
            <Grid item>
              <IconButton
                onClick={closeConversation}
                className={classes.backButton}
              >
                <BackIcon />
              </IconButton>
            </Grid>
          )}

          <Grid item>
            <Grid container alignItems="flex-start">
              <ConversationTypeIcon
                type={conversation.type}
                className={classes.typeIcon}
              />

              <Typography variant={isMobile ? 'subtitle1' : 'h6'}>
                {conversation.displayName}
              </Typography>
            </Grid>
          </Grid>

          <Grid item md>
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
              {conversationCategories(conversation.type).map(x => (
                <MenuItem key={x.value} value={x.value}>
                  {x.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item className={classes.rightButtons}>
            {conversation.channels.email ? (
              <Tooltip
                onClick={() => {
                  copyToClipboard(conversation.channels.email);
                }}
                title={
                  <>
                    <b>{conversation.channels.email}</b>
                    <br />
                    (Click to copy)
                  </>
                }
              >
                <IconButton className={classes.iconButton}>
                  <EmailIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip
                onClick={() => {
                  setShowEmailDialog(true);
                }}
                title="Set email"
              >
                <IconButton className={classes.iconButton}>
                  <EmailIcon />
                  <AddIcon className={classes.emailAdd} />
                </IconButton>
              </Tooltip>
            )}
            {conversation.channels.linkedin && (
              <Tooltip title="Open LinkedIn thread (as Gloria)">
                <IconButton
                  className={classNames(
                    classes.iconButton,
                    classes.linkedInButton
                  )}
                  component="a"
                  href={
                    'https://www.linkedin.com/messaging/thread/' +
                    conversation.channels.linkedin.threadId
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  disabled={!conversation.channels.linkedin.threadId}
                >
                  <LinkedInIcon />
                </IconButton>
              </Tooltip>
            )}

            <div className={classes.actionButtons}>
              <DebugButton
                title="Copy conversation ID"
                toCopy={conversation.id}
              />
              <DebugButton toCopy={conversation.UID} />
              <Tooltip title="Manage subscribers">
                <IconButton
                  className={classes.iconButton}
                  onClick={() => {
                    setShowSubscriberDialog(true);
                  }}
                >
                  <AddSubscriberIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={
                  conversation.type === 'spam'
                    ? 'Unmark as spam'
                    : 'Mark as spam'
                }
              >
                <IconButton
                  className={classes.iconButton}
                  onClick={() => {
                    if (conversation.type === 'spam')
                      unmarkAsSpam(conversation.id);
                    else markAsSpam(conversation.id);
                  }}
                >
                  <SpamIcon />
                </IconButton>
              </Tooltip>
            </div>
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
    </>
  );
}

export default withStyles(styles)(ConversationHeader);
