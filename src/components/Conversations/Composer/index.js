import React, { useState, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import InputBase from '@material-ui/core/InputBase';
import Chip from '@material-ui/core/Chip';

import FileIcon from '@material-ui/icons/Attachment';
import EventIcon from '@material-ui/icons/EventOutlined';
import ReminderIcon from '@material-ui/icons/NotificationsOutlined';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import ComposerActions from './ComposerActions';
import { useAuthedUser } from '../../../hooks/useAuthedUser';
import { removeHtmlTags } from '../../../utilities';
import { sendEmail } from '../../../utilities/email/gmail';
import { sendLinkedinMessage } from '../../../utilities/linkedin';
import { markAsRead, addNote } from '../../../utilities/conversations';
import { clear } from 'echarts/lib/util/throttle';
const styles = theme => ({
  root: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
    position: 'relative',
  },
  topBar: {
    position: 'absolute',
    right: 0,
    top: -36,
  },
  plainTextBox: {
    width: '100%',
    minHeight: 100,
  },
  quillEditor: {
    minHeight: 100,
    // border: `1px solid ${theme.palette.divider}`,

    '& .ql-editor': {
      minHeight: 100,
      padding: 0,
      fontFamily: theme.typography.fontFamily,
      fontSize: 16,
      '&.ql-blank::before': {
        fontStyle: 'normal',
        color:
          theme.palette.type === 'dark'
            ? 'rgba(255,255,255,.4)'
            : 'rgba(0,0,0,.4)',
      },
    },
  },
  chipWrapper: {
    marginLeft: -theme.spacing.unit,
  },
  chipIcon: {
    marginLeft: theme.spacing.unit,
  },
});

// const DUMMY_EVENTS = [
//   { type: 'reminder', label: '12/12/2018 3:48 pm' },
//   { type: 'file', label: 'resume.pdf', link: 'google.com' },
//   { type: 'event', label: 'Meeting at 12/12/2018 3:48 pm' },
// ];

const getChipIcon = type => {
  switch (type) {
    case 'reminder':
      return <ReminderIcon />;
    case 'file':
      return <FileIcon />;
    case 'event':
      return <EventIcon />;
    default:
      return null;
  }
};

function Composer(props) {
  const { classes, theme, conversation, composerType } = props;
  console.log('conversation', conversation);
  const currentUser = useAuthedUser();
  useEffect(
    () => {
      if (currentUser) {
        markAsRead(currentUser.UID, conversation.id);
      }
    },
    [currentUser, conversation]
  );
  const clearComposer = () => {
    //clear message box
    setMessageHtml('');
    setMessageText('');
  };
  const [messageText, setMessageText] = useState('');
  const [messageHtml, setMessageHtml] = useState('');
  const [attachments, setAttachments] = useState([]);
  const addText = addition => {
    setMessageText(messageText + addition);
  };
  const handleSendEmail = () => {
    const email = { subject: 'test', body: messageHtml };
    const recipient = { email: 'shams.mosowi@gmail.com' };
    const sender = { email: 'shams@2hats.com.au' };
    sendEmail(conversation.id, { recipient, email, sender });
    clearComposer();
  };
  const handleAddNote = () => {
    addNote(currentUser.UID, conversation.id, messageText);
    clearComposer();
  };
  const handleSendLinkedin = () => {
    sendLinkedinMessage(
      currentUser.UID,
      conversation.id,
      {
        accountEmail: conversation.channels.linkedin.account,
        threadId: conversation.channels.linkedin.threadId,
      },
      messageText
    );
    clearComposer();
  };
  return (
    <div
      className={classes.root}
      style={{
        backgroundColor:
          composerType === 'note' ? theme.palette.primary.light : 'inherit',
      }}
    >
      {composerType === 'email' ? (
        <ReactQuill
          autoFocus
          placeholder="Type your email here…"
          value={messageHtml}
          onChange={val => {
            setMessageHtml(val);
            setMessageText(removeHtmlTags(val));
          }}
          theme="bubble"
          className={classes.quillEditor}
          preserveWhiteSpace
        />
      ) : (
        <InputBase
          autoFocus
          value={messageText}
          onChange={e => {
            setMessageText(e.target.value);
            setMessageHtml(e.target.value);
          }}
          style={{ width: '100%', padding: 0 }}
          inputProps={{
            className: classes.plainTextBox,
          }}
          multiline
          placeholder={`Type your ${
            composerType === 'linkedin' ? 'message' : 'note'
          } here…`}
        />
      )}

      <div className={classes.chipWrapper}>
        {attachments.map((x, i) => (
          <Chip
            key={i}
            label={x.label}
            icon={getChipIcon(x.type)}
            onDelete={() => {
              const newAttachments = attachments;
              newAttachments.splice(i, 1);
              setAttachments(newAttachments);
            }}
            classes={{ icon: classes.chipIcon }}
          />
        ))}
      </div>

      <ComposerActions
        actions={{
          email: handleSendEmail,
          note: handleAddNote,
          linkedin: handleSendLinkedin,
          addText,
        }}
        classes={classes}
        composerType={composerType}
        conversation={conversation}
      />
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Composer);
