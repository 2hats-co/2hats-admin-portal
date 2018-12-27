import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

import SendIcon from '@material-ui/icons/Send';
import DoneIcon from '@material-ui/icons/Done';
import AtIcon from '@material-ui/icons/AlternateEmail';
import EmojiIcon from '@material-ui/icons/InsertEmoticon';
import GifIcon from '@material-ui/icons/Gif';
import FileIcon from '@material-ui/icons/Attachment';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import EventIcon from '@material-ui/icons/EventOutlined';
import ReminderIcon from '@material-ui/icons/NotificationsOutlined';
import EventDialog from './EventDialog';
import ReminderDialog from './ReminderDialog';

//import 'emoji-mart/css/emoji-mart.css';
//import { Picker } from 'emoji-mart';
//import Loadable from 'react-loadable';
//import LoadingHat from '../../LoadingHat';
// const { Picker } = Loadable({
//   loader: () => import('emoji-mart' /* webpackChunkName: "EmojiPicker" */),
//   loading: LoadingHat,
// });
// const EventDialog = Loadable({
//   loader: () => import('./EventDialog' /* webpackChunkName: "EventDialog" */),
//   loading: LoadingHat,
// });
// const ReminderDialog = Loadable({
//   loader: () =>
//     import('./ReminderDialog' /* webpackChunkName: "ReminderDialog" */),
//   loading: LoadingHat,
// });

const emojiButton = handleClick => (
  <Tooltip title="Emoji" key="emoji">
    <IconButton onClick={handleClick}>
      <EmojiIcon />
    </IconButton>
  </Tooltip>
);
const gifButton = handleClick => (
  <Tooltip title="GIF" key="gif">
    <IconButton onClick={handleClick} style={{ padding: 6 }}>
      <GifIcon style={{ fontSize: 36 }} />
    </IconButton>
  </Tooltip>
);
const imageButton = handleClick => (
  <Tooltip title="Image" key="image">
    <IconButton onClick={handleClick}>
      <ImageIcon />
    </IconButton>
  </Tooltip>
);
const fileButton = handleClick => (
  <Tooltip title="File" key="file">
    <IconButton onClick={handleClick}>
      <FileIcon />
    </IconButton>
  </Tooltip>
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
const atButton = handleClick => (
  <Tooltip title="At" key="at">
    <IconButton onClick={handleClick}>
      <AtIcon />
    </IconButton>
  </Tooltip>
);

const ComposerActions = React.memo(props => {
  const { composerType, actions } = props;
  const [showEmoji, setShowEmoji] = useState(false);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showReminderDialog, setShowReminderDialog] = useState(false);

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
  const EmojiButton = emojiButton(() => {
    setShowEmoji(!showEmoji);
  });
  let actionButtons;
  switch (composerType) {
    case 'email':
      actionButtons = [
        EmojiButton,
        imageButton(),
        gifButton(),
        fileButton(),
        eventButton(() => {
          setShowEventDialog(true);
        }),
      ];
      break;
    case 'linkedin':
      actionButtons = [EmojiButton];
      break;
    case 'note':
      actionButtons = [
        EmojiButton,
        imageButton(),
        gifButton(),
        fileButton(),
        reminderButton(() => {
          setShowReminderDialog(true);
        }),
        atButton(),
      ];
      break;
    default:
      break;
  }
  // const addEmoji = e => {
  //   actions.addText(e.native);
  //   // setShowEmoji(false)
  // };
  return (
    <React.Fragment>
      {/* {showEmoji && <Picker set="messenger" onSelect={addEmoji} />} */}
      <Grid item>
        <Grid container justify="space-between">
          <Grid item style={{ marginLeft: -12 }}>
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

      <EventDialog
        showDialog={showEventDialog}
        setShowDialog={setShowEventDialog}
      />
      <ReminderDialog
        showDialog={showReminderDialog}
        setShowDialog={setShowReminderDialog}
      />
    </React.Fragment>
  );
});

export default ComposerActions;
