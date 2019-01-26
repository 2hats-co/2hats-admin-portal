import React, { useState, useEffect, useContext } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import classNames from 'classnames';

import ComposerActions from './ComposerActions';
import TemplateDropdown from './TemplateDropdown';
import TextTemplateDropdown from './TextTemplateDropdown';
import { AdminsContext } from '../../../contexts/AdminsContext';
import { useAuthedUser } from '../../../hooks/useAuthedUser';
import { removeHtmlTags, globalReplace } from '../../../utilities';
import { sendEmail } from '../../../utilities/email/gmail';
import { sendLinkedinMessage } from '../../../utilities/linkedin';
import { markAsRead, addNote } from '../../../utilities/conversations';
import { CLOUD_FUNCTIONS, callable } from '../../../firebase/functions';

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
    right: theme.spacing.unit / 2,
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
    minHeight: 102,
    marginTop: -2,

    '& .ql-container': { position: 'static' },
    '& .ql-editor': {
      minHeight: 100,
      padding: 0,
      fontFamily: theme.typography.fontFamily,
      fontSize: 16,
      color: theme.palette.text.primary,
      '&.ql-blank::before': {
        fontStyle: 'normal',
        color: theme.palette.text.disabled,
      },
    },
    '& .ql-bubble .ql-tooltip': {
      transform: 'translateY(60px) translateX(16px)',
      zIndex: 1,
    },
  },
  chipWrapper: {
    marginLeft: -theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  chipIcon: {
    marginLeft: theme.spacing.unit * 1.5,
    marginRight: -theme.spacing.unit / 2,
  },
});

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
    setHasTemplate(false);
    setCc('');
    setNotifyList('');
    setAttachments([]);
  };

  useEffect(clearComposer, [conversation.id]);

  const [emailSubject, setEmailSubject] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageHtml, setMessageHtml] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [cc, setCc] = useState('');
  const [hasTemplate, setHasTemplate] = useState(false);
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

  const handleFile = data => {
    if (data.action === 'picked' && data.docs) {
      setAttachments([...attachments, ...data.docs]);
    }
  };

  const setTemplate = data => {
    setHasTemplate(true);

    if (data.html && data.subject) {
      const replaceables = [
        { tag: '{{firstName}}', value: conversation.firstName },
        { tag: '{{lastName}}', value: conversation.lastName },
        {
          tag: '{{senderName}}',
          value: `${currentUser.givenName} ${currentUser.familyName}`,
        },
        { tag: '{{senderTitle}}', value: currentUser.title },
      ];

      let html = data.html;
      let subject = data.subject;
      replaceables.forEach(x => {
        html = globalReplace(html, x.tag, x.value);
        subject = globalReplace(subject, x.tag, x.value);
      });

      setMessageHtml(html);
      setMessageText(' ');
      setEmailSubject(subject);
    } else {
      clearComposer();
    }
  };

  const handleSendEmail = () => {
    const email = {
      subject: emailSubject,
      body: messageHtml,
    };
    const recipient = {
      email: conversation.channels.email,
      cc: cc.split(','),
    };
    const sender = { email: currentUser.email, id: currentUser.UID };
    if (attachments.length === 0) {
      sendEmail(conversation.id, { recipient, email, sender, attachments });
    } else {
      const attachmentIds = attachments.map(x => x.id);
      callable(
        CLOUD_FUNCTIONS.grantDrivePermissions,
        { attachmentIds, UID: currentUser.UID },
        () => {
          console.log('Set permissions for ', attachmentIds);
          sendEmail(conversation.id, { recipient, email, sender, attachments });
        },
        () => {
          console.log('Failed to set permissions for ', attachmentIds);
        }
      );
    }
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
                    autoFocus
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
              <TemplateDropdown classes={classes} setTemplate={setTemplate} />
            </Grid>
          </React.Fragment>
        )}
        {composerType === 'linkedin' && (
          <Grid item className={classes.templateDropdownWrapper}>
            <TextTemplateDropdown classes={classes} setText={setMessageText} />
          </Grid>
        )}
      </Grid>
      {composerType === 'email' ? (
        hasTemplate ? (
          <div
            className={classes.scrollableBox}
            style={{ width: '100%', height: '100%' }}
            dangerouslySetInnerHTML={{ __html: messageHtml }}
          />
        ) : (
          <ReactQuill
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
                ['link'],
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

      <div className={classes.chipWrapper}>
        {attachments.map((x, i) => (
          <Chip
            key={x.id}
            label={x.name}
            icon={<img src={x.iconUrl} alt={x.mimeType} />}
            onDelete={() => {
              const newAttachments = attachments;
              newAttachments.splice(i, 1);
              setAttachments(newAttachments);
            }}
            classes={{ icon: classes.chipIcon }}
          />
        ))}
      </div>

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
          file: handleFile,
        }}
        composerType={composerType}
        conversation={conversation}
        emailValid={composerType === 'email' && emailSubject.length > 0}
        disableFab={messageText.length <= 0}
      />
    </div>
  );
}

export default withStyles(styles)(Composer);
