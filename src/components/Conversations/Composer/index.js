import React, { useState, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

import FileIcon from '@material-ui/icons/Attachment';
import EventIcon from '@material-ui/icons/EventOutlined';
import ReminderIcon from '@material-ui/icons/NotificationsOutlined';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import classNames from 'classnames';
import clone from 'ramda/es/clone';

import ComposerActions from './ComposerActions';
import { useAuthedUser } from '../../../hooks/useAuthedUser';
import { removeHtmlTags } from '../../../utilities';
import { sendEmail } from '../../../utilities/email/gmail';
import { sendLinkedinMessage } from '../../../utilities/linkedin';
import { markAsRead, addNote } from '../../../utilities/conversations';
import templatesObject from '../../../constants/emails/templates';
import { THEME1 } from '../../../constants/emails/themes';
import {
  makeEmail,
  personaliseElements,
} from '../../../utilities/email/templateGenerator';
// import { generateSmartKey } from '../../../utilities/firestore';

const styles = theme => ({
  root: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
    position: 'relative',
  },
  tabs: {
    position: 'relative',
    top: -theme.spacing.unit * 2,
    left: -theme.spacing.unit * 2,
  },
  tabRoot: {
    minHeight: theme.spacing.unit * 4.5,
  },
  tabLabelContainer: {
    padding: '6px 16px',
  },
  topBar: {
    position: 'absolute',
    right: theme.spacing.unit * 2,
    top: 0,
  },
  templateDropdown: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit - 1,
    paddingRight: theme.spacing.unit * 3,
    fontSize: '.875rem',
    minWidth: 100,
  },
  emailBar: {
    marginTop: -theme.spacing.unit * 3,
    marginBottom: 0,
  },
  scrollableBox: {
    maxHeight: 400,
    overflowY: 'auto',
  },
  plainTextBox: {
    width: '100%',
    minHeight: 133,
  },
  quillEditor: {
    minHeight: 100,

    '& .ql-container': {
      top: -2,
    },
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

const CANDIDATE_TEMPLATES = [
  templatesObject.outsideDemographic,
  templatesObject.outsideIndusty,
  templatesObject.interviewAccepted,
  templatesObject.interviewRejected,
  templatesObject.acInfo,
  templatesObject.psychSales,
  templatesObject.psychMarketing,
  templatesObject.ACAccepted,
  templatesObject.ACRejected,
  templatesObject.ACNeedsImprovement,
  templatesObject.resumeAccepted,
];

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
  const { classes, theme, conversation, channels } = props;

  const [composerType, setComposerType] = useState(
    channels.email ? 'email' : 'linkedin'
  );
  useEffect(
    () => {
      if (channels.email) setComposerType('email');
      else if (channels.linkedin) setComposerType('linkedin');
    },
    [channels]
  );

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
    setMessageHtml('');
    setMessageText('');
    setEmailSubject('');
    setTemplateIndex(-1);
    setCc('');
  };

  const [emailSubject, setEmailSubject] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageHtml, setMessageHtml] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [cc, setCc] = useState('');
  const [templateIndex, setTemplateIndex] = useState(-1);

  const addText = addition => {
    setMessageText(messageText + addition);
  };

  const templates =
    conversation.type === 'candidate' ? CANDIDATE_TEMPLATES : [];

  const setTemplate = index => {
    setTemplateIndex(index);

    if (index > -1) {
      const templateClone = clone(templates[index]);
      const theme = clone(THEME1);

      const personalisables = [
        {
          firstName: conversation.firstName || conversation.displayName,
          senderTitle: currentUser.title,
          senderName: `${currentUser.givenName} ${currentUser.familyName}`,
          // smartLink: generateSmartKey(conversation.UID, '/introduction'),
        },
      ];

      const personalisedElements = personaliseElements(
        templateClone.elements,
        personalisables
      );

      setMessageHtml(makeEmail(theme, personalisedElements));
      setEmailSubject(templateClone.subject);
    } else {
      clearComposer();
    }
  };

  const handleSendEmail = () => {
    const email = { subject: emailSubject, body: messageHtml };
    const recipient = {
      email: conversation.channels.email,
      cc: cc.split(','),
    };
    const sender = { email: currentUser.email, id: currentUser.UID };
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
      <Tabs
        className={classes.tabs}
        classes={{ root: classes.tabRoot }}
        value={composerType}
        onChange={(e, val) => {
          setComposerType(val);
        }}
        indicatorColor="primary"
        textColor="primary"
      >
        {channels.linkedin && (
          <Tab
            value="linkedin"
            label="LinkedIn"
            classes={{
              root: classes.tabRoot,
              labelContainer: classes.tabLabelContainer,
            }}
          />
        )}
        {channels.email && (
          <Tab
            value="email"
            label="Email"
            classes={{
              root: classes.tabRoot,
              labelContainer: classes.tabLabelContainer,
            }}
          />
        )}
        <Tab
          value="note"
          label="Note"
          classes={{
            root: classes.tabRoot,
            labelContainer: classes.tabLabelContainer,
          }}
        />
      </Tabs>
      {composerType === 'email' ? (
        <React.Fragment>
          <div className={classes.topBar}>
            <TextField
              select
              InputProps={{
                disableUnderline: true,
                classes: { inputMarginDense: classes.templateDropdown },
              }}
              InputLabelProps={{
                classes: { root: classes.label, shrink: classes.shrinkedLabel },
              }}
              margin="dense"
              variant="filled"
              value={templateIndex}
              onChange={e => {
                setTemplate(e.target.value);
              }}
            >
              <MenuItem value={-1}>No template</MenuItem>
              {templates.map((x, i) => (
                <MenuItem value={i}>{x.templateName}</MenuItem>
              ))}
            </TextField>
          </div>
          <Grid container className={classes.emailBar} spacing={16}>
            <Grid item xs={6}>
              <TextField
                value={emailSubject}
                onChange={e => {
                  setEmailSubject(e.target.value);
                }}
                margin="dense"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Subject</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={cc}
                onChange={e => {
                  setCc(e.target.value);
                }}
                margin="dense"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">CC</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          {templateIndex > -1 ? (
            <div
              className={classes.scrollableBox}
              style={{ width: '100%', height: '100%' }}
              dangerouslySetInnerHTML={{ __html: messageHtml }}
            />
          ) : (
            <ReactQuill
              autoFocus
              placeholder="Type your email here…"
              value={messageHtml}
              onChange={val => {
                setMessageHtml(val);
                setMessageText(removeHtmlTags(val));
              }}
              theme="bubble"
              className={classNames(classes.quillEditor, classes.scrollableBox)}
              preserveWhiteSpace
            />
          )}
        </React.Fragment>
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
            className: classNames(classes.plainTextBox, classes.scrollableBox),
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
