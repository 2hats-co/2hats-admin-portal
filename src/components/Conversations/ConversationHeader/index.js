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
import BlockIcon from '@material-ui/icons/Block';
// import MenuItem from '@material-ui/core/MenuItem';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import Select from '@material-ui/core/Select';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';

import ConversationTypeIcon from '../ConversationTypeIcon';
import ManageSubscribersDialog from './ManageSubscribersDialog';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { copyToClipboard } from '../../../utilities';
import { markAsSpam } from '../../../utilities/conversations';

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
  assignee: {
    width: 160,
  },
  linkedInButton: {
    color: `${theme.palette.text.secondary} !important`,
  },
});

function ConversationHeader(props) {
  const windowSize = useWindowSize();

  const { classes, conversation, closeConversation } = props;
  const [showSubscriberDialog, setShowSubscriberDialog] = useState(false);

  return (
    <React.Fragment>
      <Grid item className={classes.root}>
        <Grid container justify="space-between" alignItems="center">
          {windowSize.isMobile && (
            <Grid item>
              <IconButton onClick={closeConversation}>
                <BackIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item>
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
              <Grid item>
                <IconButton
                  onClick={() => {
                    markAsSpam(conversation.id);
                  }}
                >
                  <BlockIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.assignee} />
          <Grid item>
            {/* <FormControl variant="outlined" className={classes.formControl}>
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
            </FormControl> */}
          </Grid>
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
            <Tooltip title="Manage Subscribers">
              <IconButton
                onClick={() => {
                  setShowSubscriberDialog(true);
                }}
              >
                <AddSubscriberIcon />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Open Link in New Tab">
              <IconButton
                onClick={() => {
                  window.open('', '_blank');
                }}
              >
                <LinkIcon />
              </IconButton>
            </Tooltip> */}
            {/* <Tooltip title="Star">
              <IconButton>
                <StarOutlineIcon />
              </IconButton>
            </Tooltip> */}
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
