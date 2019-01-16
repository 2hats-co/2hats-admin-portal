import React, { useContext } from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';

import { isOnlyEmojis } from '../../../utilities/emoji';
import moment from 'moment';
import { momentLocales } from '../../../constants/momentLocales';

import { AdminsContext } from '../../../contexts/AdminsContext';
import MessageBody from './MessageBody';
import SuperAvatar from '../../SuperAvatar';

const styles = theme => ({
  root: {
    '& p, & h6': { textAlign: 'left' },
    '& .msg-caption': { display: 'none' },
  },
  linkedin: {},
  incomingMessage: {
    textAlign: 'left',

    '& .msg-body': {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'dark' ? 700 : 200],
      borderTopRightRadius: theme.shape.roundBorderRadius,
      borderBottomRightRadius: theme.shape.roundBorderRadius,
    },
  },
  yourMessage: {
    textAlign: 'right',

    '& .msg-body': {
      backgroundColor: theme.palette.primary.light,
      borderTopLeftRadius: theme.shape.roundBorderRadius,
      borderBottomLeftRadius: theme.shape.roundBorderRadius,
      marginRight: theme.spacing.unit * 6,
    },
    '& p, & h6': { color: theme.palette.primary.darkText },
    '& .msg-caption': { marginRight: theme.spacing.unit * 8 },
  },
  emojiMessage: {
    '& .msg-body': {
      backgroundColor: 'transparent',
      boxShadow: 'none !important',
      borderRadius: 0,
      padding: 0,
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
    },
    '& p': {
      fontSize: 48,
      lineHeight: 1,
    },
    '& $avatar': { top: -6 },
  },
  bodyText: {
    overflowWrap: 'break-word',
  },

  firstOfIncoming: {
    '& .msg-body': { borderTopLeftRadius: theme.shape.roundBorderRadius },
  },
  lastOfIncoming: {
    '& .msg-body': { borderBottomLeftRadius: theme.shape.roundBorderRadius },
    '& .msg-caption': { display: 'block' },
  },

  firstOfYour: {
    '& .msg-body': { borderTopRightRadius: theme.shape.roundBorderRadius },
  },
  lastOfYour: {
    '& .msg-body': {
      borderBottomRightRadius: theme.shape.roundBorderRadius,
      marginRight: theme.spacing.unit,
    },
    '& .msg-caption': { display: 'block' },
  },

  body: {
    display: 'inline-block',
    maxWidth: 500,
    borderRadius: theme.shape.smallBorderRadius,
    padding: '10px 16px',
    margin: `${theme.spacing.unit / 2}px 0 0`,
  },
  caption: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 2}px 0`,
  },
  typeLabel: {
    textTransform: 'capitalize',
    display: 'inline !important',
    '&::before': { content: '" • "' },
  },
  avatar: {
    display: 'inline-flex',
    verticalAlign: 'bottom',
  },

  note: {
    textAlign: 'center',
    '& .msg-body': {
      boxShadow: `0 0 0 1px ${theme.palette.primary.darkText} inset`,
      borderRadius: `${theme.shape.roundBorderRadius}px !important`,
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.background.default
          : theme.palette.background.paper,
    },
  },

  email: {
    '& .msg-body': {
      padding: 0,
      maxWidth: 800,
      position: 'relative',
      top: 3,
    },
  },
  noSubject: { opacity: 0.54 },
  expansionAdornmentIcon: {
    verticalAlign: 'top',
    marginRight: theme.spacing.unit,
    opacity: 0.87,
  },
  expansionRoot: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  expansionSummaryRoot: {
    minHeight: `${theme.spacing.unit * 5}px !important`,
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  expansionTitle: {
    fontWeight: 500,
    paddingRight: `${theme.spacing.unit * 3}px !important`,
  },
  expandIcon: {
    right: 0,
    '$yourMessage &': { color: theme.palette.primary.darkText },
  },
  editButton: {
    position: 'absolute',
    top: -theme.spacing.unit / 2,
    right: theme.spacing.unit * 4,
    paddingRight: `${theme.spacing.unit * 1.5}px !important`,
    '$yourMessage &': { color: theme.palette.primary.darkText },
  },
  emailExpansionDetails: {
    padding: `0 ${theme.spacing.unit}px ${theme.spacing.unit}px`,
    flexDirection: 'column',
  },
  expansionExpanded: { marginBottom: 0 },
  expansionSummaryExpanded: {},
  expansionSummaryContent: {
    margin: `${theme.spacing.unit}px 0`,
    '&$expansionSummaryExpanded': {
      margin: `${theme.spacing.unit * 1.5}px 0 !important`,
    },
  },
  expansionDetails: {
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`,
    flexDirection: 'column',
  },
  renderedHTML: {
    backgroundColor: '#fff',
    width: '100%',
    textAlign: 'left',
    padding: `0 ${theme.spacing.unit * 2}px`,
    borderRadius: theme.shape.roundBorderRadius * 0.8,
    overflowWrap: 'break-word',
    boxSizing: 'border-box',

    '& p': { color: 'initial' },
    '& img': { maxWidth: '100%' },
  },
  emailAttachments: {
    '& > *': { marginTop: theme.spacing.unit },
  },
  attachmentIcon: {
    marginLeft: theme.spacing.unit,
  },

  activity: {
    textAlign: 'center',
    '& .msg-body': {
      boxShadow: `0 0 0 1px ${theme.palette.divider} inset`,
      borderRadius: `${theme.shape.roundBorderRadius}px !important`,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing.unit * 2,
      maxWidth: 800,
    },
  },

  event: {
    textAlign: 'center',

    '& .msg-body': {
      boxShadow: `0 0 0 1px ${theme.palette.primary.darkText} inset`,
      borderRadius: `${theme.shape.roundBorderRadius}px !important`,
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.background.default
          : theme.palette.background.paper,

      padding: 0,
      maxWidth: 800,
      position: 'relative',
      top: 3,
    },
  },
  eventDetails: {
    '& p, & svg': { color: theme.palette.text.primary },
    '& svg': {
      position: 'relative',
      top: -2,
    },
  },
  eventDetailsBlock: {
    marginTop: theme.spacing.unit / 2,
    '& + &': { marginTop: theme.spacing.unit * 2 },
  },
  eventDetailCaption: {
    color: theme.palette.text.secondary,
    width: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 0.75,
    display: 'inline-block',
    textAlign: 'right',
  },

  reminder: {
    textAlign: 'center',

    '& .msg-body': {
      boxShadow: `0 0 0 1px ${theme.palette.primary.darkText} inset`,
      borderRadius: `${theme.shape.roundBorderRadius}px !important`,
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.background.default
          : theme.palette.background.paper,
    },
  },
  reminderIcon: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit / 4,
    marginLeft: -theme.spacing.unit / 2,
    color: theme.palette.primary.darkText,
  },
  reminderAttendeesIcon: {
    marginRight: theme.spacing.unit,
    marginTop: -theme.spacing.unit / 4,
    marginLeft: -theme.spacing.unit / 2,
    opacity: 0.87,
    color: theme.palette.text.primary,
  },
  reminderSubscribers: {
    '& p': { color: theme.palette.text.primary },
    marginTop: theme.spacing.unit,
  },
});

function Message(props) {
  const { data, classes, firstOfType, lastOfType, editEvent } = props;
  moment.updateLocale('en', momentLocales);

  const timestamp = moment(data.sentAt.seconds * 1000).format(
    'D/MM/YYYY h:mm:ss a'
  );
  const timeLabel = moment(data.sentAt.seconds * 1000).fromNow();
  const isIncoming = data.isIncoming;

  const adminsContext = useContext(AdminsContext);
  const sender = data.senderId && adminsContext.getAdmin(data.senderId);

  return (
    <div
      className={classNames(
        classes.root,
        isIncoming ? classes.incomingMessage : classes.yourMessage,
        firstOfType &&
          (isIncoming ? classes.firstOfIncoming : classes.firstOfYour),
        lastOfType &&
          (isIncoming ? classes.lastOfIncoming : classes.lastOfYour),
        (data.type === 'linkedin' ||
          data.type === 'note' ||
          data.type === 'activity') &&
          data.body &&
          isOnlyEmojis(data.body) &&
          classes.emojiMessage,
        data.type === 'linkedin' && classes.linkedin,
        data.type === 'note' && classes.note,
        data.type === 'email' && classes.email,
        data.type === 'activity' && classes.activity,
        data.type === 'event' && classes.event,
        data.type === 'reminder' && classes.reminder
      )}
    >
      <Tooltip
        title={
          <React.Fragment>
            {timestamp}
            <br />
            {sender && sender.givenName} {sender && sender.familyName}
          </React.Fragment>
        }
        placement={isIncoming ? 'right' : 'left'}
        enterDelay={1000}
      >
        <div className={classNames(classes.body, 'msg-body')}>
          <MessageBody
            classes={classes}
            adminsContext={adminsContext}
            data={data}
          />
          {data.type === 'event' && (
            <IconButton
              className={classes.editButton}
              onClick={() => {
                editEvent(data);
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
      </Tooltip>
      {!isIncoming &&
        lastOfType &&
        (sender ? (
          <SuperAvatar data={sender} className={classes.avatar} tooltip />
        ) : (
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
        ))}

      <Typography
        variant="caption"
        className={classNames(classes.caption, 'msg-caption')}
      >
        {timeLabel}
        {data.type && (
          <span className={classes.typeLabel}>
            {data.type.replace('linkedin', 'LinkedIn')}
          </span>
        )}
      </Typography>
    </div>
  );
}
export default withStyles(styles)(Message);
