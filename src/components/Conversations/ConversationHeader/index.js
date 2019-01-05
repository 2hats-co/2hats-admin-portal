import React, {
  useState, //useRef
} from 'react';

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
// import MenuItem from '@material-ui/core/MenuItem';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import Select from '@material-ui/core/Select';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';

import ConversationTypeIcon from '../ConversationTypeIcon';
import ManageSubscribersDialog from './ManageSubscribersDialog';
import DebugButton from '../../DebugButton';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { copyToClipboard } from '../../../utilities';
import { markAsSpam, unmarkAsSpam } from '../../../utilities/conversations';

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
              <Grid item>
                <ConversationTypeIcon
                  type={conversation.type}
                  className={classes.typeIcon}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">{conversation.displayName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={InputLabelRef} htmlFor="outlined-tag">
                Tag 
              </InputLabel>
              <Select
                value={tag}
                onChange={e => setTag(e.target.value)}
                input={
                  <OutlinedInput labelWidth={25} name="tag" id="outlined-tag" />
                }
              >
                <MenuItem value="futureNeed">Future Need</MenuItem>
                <MenuItem value="generalCatchup">General Catchup</MenuItem>
                <MenuItem value="partnerships">Partnerships</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item>
            {conversation.channels.email && (
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
            <Tooltip title="Manage Subscribers">
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

      <ManageSubscribersDialog
        conversation={conversation}
        showDialog={showSubscriberDialog}
        setShowDialog={setShowSubscriberDialog}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(ConversationHeader);
