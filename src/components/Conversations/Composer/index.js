import React, { useState, useEffect, useContext } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import classNames from 'classnames';
import clone from 'ramda/es/clone';

import ComposerActions from './ComposerActions';
import { AdminsContext } from '../../../contexts/AdminsContext';
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

const styles = theme => ({
  root: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
    paddingTop: 0,
    position: 'relative',
  },
  noteComposer: {
    backgroundColor:
      theme.palette.type !== 'dark'
        ? theme.palette.background.default
        : theme.palette.background.paper,
  },

  topBar: {
    marginLeft: -theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    width: `calc(100% + ${theme.spacing.unit * 3}px)`,
    height: theme.spacing.unit * 4.5,
  },
  tabsScroller: { width: 'auto' },
  tabsFlexContainer: { display: 'inline-flex' },
  tabRoot: { minHeight: theme.spacing.unit * 4.5 },
  tabLabelContainer: { padding: '6px 16px' },
  emailFields: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  templateDropdownWrapper: {
    position: 'relative',
    top: theme.spacing.unit / 2,
  },
  templateDropdown: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit - 1,
    paddingRight: theme.spacing.unit * 3,
    fontSize: '.875rem',
    minWidth: 100,
  },

  scrollableBox: {
    maxHeight: 400,
    overflowY: 'auto',
  },
  plainTextBox: {
    width: '100%',
    minHeight: 100,
  },
  quillEditor: {
    minHeight: 100,
    position: 'relative',
    top: -2,

    '& .ql-container': { position: 'static' },
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
    '& .ql-bubble .ql-tooltip': {
      transform: 'translateY(95px) translateX(15px)',
      zIndex: 1,
    },
  },
  chipWrapper: {
    marginLeft: -theme.spacing.unit,
  },
  // chipIcon: {
  //   marginLeft: theme.spacing.unit,
  // },
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

function Composer(props) {
  const { classes, conversation, channels } = props;

  const adminsContext = useContext(AdminsContext);

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
    setNotifyList('');
  };

  useEffect(clearComposer, [conversation.id]);

  const [emailSubject, setEmailSubject] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageHtml, setMessageHtml] = useState('');
  // const [attachments, setAttachments] = useState([]);
  const [cc, setCc] = useState('');
  const [templateIndex, setTemplateIndex] = useState(-1);
  const [notifyList, setNotifyList] = useState([]);

  const addText = addition => {
    setMessageText(messageText + addition);
  };

  const handleAt = uid => {
    if (!uid) return;
    if (uid === 'all') {
      setNotifyList([
        ...notifyList,
        ...conversation.subscribedAdmins.filter(
          x => notifyList.indexOf(x) === -1
        ),
      ]);

      const newText = '@all ' + messageText;
      setMessageText(newText);
      setMessageHtml(newText);
    } else if (notifyList.indexOf(uid) === -1) {
      setNotifyList([...notifyList, uid]);
      const newText =
        '@' + adminsContext.getAdmin(uid).givenName + ' ' + messageText;
      setMessageText(newText);
      setMessageHtml(newText);
    }
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
    addNote(currentUser.UID, conversation.id, messageText, notifyList);
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
      className={classNames(
        classes.root,
        composerType === 'note' && classes.noteComposer
      )}
    >
      <Grid container className={classes.topBar} alignItems="center">
        <Grid item>
          <Tabs
            classes={{
              root: classes.tabRoot,
              scroller: classes.tabsScroller,
              flexContainer: classes.tabsFlexContainer,
            }}
            value={composerType}
            onChange={(e, val) => {
              setComposerType(val);
            }}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              value="linkedin"
              label="LinkedIn"
              classes={{
                root: classes.tabRoot,
                labelContainer: classes.tabLabelContainer,
              }}
              disabled={!channels.linkedin}
            />
            <Tab
              value="email"
              label="Email"
              classes={{
                root: classes.tabRoot,
                labelContainer: classes.tabLabelContainer,
              }}
              disabled={!channels.email}
            />
            <Tab
              value="note"
              label="Note"
              classes={{
                root: classes.tabRoot,
                labelContainer: classes.tabLabelContainer,
              }}
            />
          </Tabs>
        </Grid>
        {composerType === 'email' && (
          <React.Fragment>
            <Grid item xs className={classes.emailFields}>
              <Grid container spacing={8}>
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
                        <InputAdornment position="start">
                          Subject
                        </InputAdornment>
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
            </Grid>
            <Grid item className={classes.templateDropdownWrapper}>
              <TextField
                select
                InputProps={{
                  disableUnderline: true,
                  classes: { inputMarginDense: classes.templateDropdown },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                    shrink: classes.shrinkedLabel,
                  },
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
                  <MenuItem key={`${x}-${i}`} value={i}>
                    {x.templateName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
      {composerType === 'email' ? (
        templateIndex > -1 ? (
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
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline'],

                [{ header: 1 }, { header: 2 }],
                [{ list: 'bullet' }],

                [{ color: [] }, { background: [] }],
                ['link', 'image'],
              ],
            }}
          />
        )
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

      {/* <div className={classes.chipWrapper}>
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
      </div> */}

      {composerType === 'note' && (
        <div className={classes.chipWrapper}>
          {notifyList &&
            notifyList.map((x, i) => {
              const admin = adminsContext.getAdmin(x);
              return (
                <Chip
                  key={x}
                  label={admin.givenName}
                  avatar={<Avatar src={admin.avatarURL} />}
                  onDelete={() => {
                    const newNotifyList = notifyList;
                    newNotifyList.splice(i, 1);
                    setNotifyList(newNotifyList);
                  }}
                />
              );
            })}
        </div>
      )}

      <ComposerActions
        actions={{
          email: handleSendEmail,
          note: handleAddNote,
          linkedin: handleSendLinkedin,
          addText,
          at: handleAt,
        }}
        composerType={composerType}
        conversation={conversation}
      />
    </div>
  );
}

export default withStyles(styles)(Composer);
