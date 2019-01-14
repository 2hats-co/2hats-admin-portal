import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

import SendIcon from '@material-ui/icons/Send';
import DoneIcon from '@material-ui/icons/Done';
import AtIcon from '@material-ui/icons/AlternateEmail';
// import EmojiIcon from '@material-ui/icons/InsertEmoticon';
import FileIcon from '@material-ui/icons/Attachment';
import EventIcon from '@material-ui/icons/EventOutlined';
import ReminderIcon from '@material-ui/icons/NotificationsOutlined';
import GroupIcon from '@material-ui/icons/Group';

// import EmojiDialog from './EmojiDialog';
import EventDialog from './EventDialog';
import ReminderDialog from './ReminderDialog';
import useKeyPress from '../../../hooks/useKeypress';

import GooglePicker from '../../GooglePicker';
import AdminSelector from '../../AdminSelector';

// const emojiButton = handleClick => (
//   <Tooltip title="Emoji" key="emoji">
//     <IconButton onClick={handleClick}>
//       <EmojiIcon />
//     </IconButton>
//   </Tooltip>
// );
const fileButton = (handleClick, pickerToken, setPickerToken) => (
  <GooglePicker
    key="Google Picker"
    onChange={handleClick}
    pickerToken={pickerToken}
    setPickerToken={setPickerToken}
    spinnerSize={24}
    spinnerPadding={12}
  >
    <Tooltip title="File">
      <IconButton>
        <FileIcon style={{ transform: 'rotate(-45deg)' }} />
      </IconButton>
    </Tooltip>
  </GooglePicker>
);
const eventButton = handleClick => (
  <Tooltip title="Event" key="event">
    <IconButton onClick={handleClick}>
      <EventIcon />
    </IconButton>
  </Tooltip>
);
const reminderButton = handleClick => (
  <Tooltip title="Reminder" key="reminder">
    <IconButton onClick={handleClick}>
      <ReminderIcon />
    </IconButton>
  </Tooltip>
);
const atButton = handleSelect => (
  <AdminSelector
    key="at"
    onSelect={handleSelect}
    extraItems={[
      { value: 'all', label: 'All subscribers', icon: <GroupIcon /> },
    ]}
    disableNone
  >
    <Tooltip title="Notify others">
      <IconButton>
        <AtIcon />
      </IconButton>
    </Tooltip>
  </AdminSelector>
);

const styles = theme => ({
  actionsWrapper: {
    marginLeft: -theme.spacing.unit * 1.5,
    '& > *': { display: 'inline-block' },
  },
});

const ComposerActions = React.memo(props => {
  const { classes, composerType, actions, conversation } = props;

  // const [showEmojiDialog, setShowEmojiDialog] = useState(false);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const returnKey = useKeyPress('Enter');
  const controlKey = useKeyPress('Control');

  const [pickerToken, setPickerToken] = useState('');

  useEffect(
    () => {
      if (controlKey && returnKey) {
        actions[composerType]();
      }
    },
    [controlKey, returnKey]
  );
  let fabContent;
  switch (composerType) {
    case 'email':
      fabContent = (
        <React.Fragment>
          <SendIcon />
          Send email
        </React.Fragment>
      );
      break;
    case 'linkedin':
      fabContent = (
        <React.Fragment>
          <SendIcon />
          Send message
        </React.Fragment>
      );
      break;
    case 'note':
      fabContent = (
        <React.Fragment>
          <DoneIcon />
          Save note
        </React.Fragment>
      );
      break;
    default:
      fabContent = null;
      break;
  }

  // const handleEmoji = () => {
  //   setShowEmojiDialog(!showEmojiDialog);
  // };

  let actionButtons;
  switch (composerType) {
    case 'email':
      actionButtons = [
        // emojiButton(handleEmoji),
        eventButton(() => {
          setShowEventDialog(true);
        }),
        fileButton(actions.file, pickerToken, setPickerToken),
      ];
      break;
    case 'linkedin':
      actionButtons = [
        // emojiButton(handleEmoji)
      ];
      break;
    case 'note':
      actionButtons = [
        // emojiButton(handleEmoji),
        reminderButton(() => {
          setShowReminderDialog(true);
        }),
        fileButton(actions.file, pickerToken, setPickerToken),
        atButton(actions.at),
      ];
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      <Grid item>
        <Grid container justify="space-between">
          <Grid item className={classes.actionsWrapper}>
            {actionButtons}
          </Grid>
          <Grid item>
            <Fab
              variant="extended"
              onClick={actions[composerType]}
              color="primary"
            >
              {' '}
              {fabContent}{' '}
            </Fab>
          </Grid>
        </Grid>
      </Grid>

      {/* <EmojiDialog
        showDialog={showEmojiDialog}
        setShowDialog={setShowEmojiDialog}
      /> */}
      <EventDialog
        showDialog={showEventDialog}
        setShowDialog={setShowEventDialog}
        conversation={conversation}
      />
      <ReminderDialog
        showDialog={showReminderDialog}
        setShowDialog={setShowReminderDialog}
        conversation={conversation}
      />
    </React.Fragment>
  );
});

export default withStyles(styles)(ComposerActions);
