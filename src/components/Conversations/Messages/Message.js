import React, { useContext } from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventIcon from '@material-ui/icons/EventOutlined';
import TimeIcon from '@material-ui/icons/AccessTime';
import DetailsIcon from '@material-ui/icons/Notes';
import LocationIcon from '@material-ui/icons/LocationOnOutlined';
import AttendeesIcon from '@material-ui/icons/PeopleOutlined';
import ReminderIcon from '@material-ui/icons/NotificationsOutlined';

import { isOnlyEmojis } from '../../../utilities/emoji';
import moment from 'moment';
import { momentLocales } from '../../../constants/momentLocales';
// import timestamp from 'time-stamp';

//import { getInitials } from '../../../utilities';
import { AdminsContext } from '../../../contexts/AdminsContext';

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
  emailExpansionDetails: {
    padding: `0 ${theme.spacing.unit}px ${theme.spacing.unit}px`,
  },
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
    '& p': { color: 'initial' },
    '& img': { maxWidth: '100%' },
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
  const { data, classes, firstOfType, lastOfType } = props;
  moment.updateLocale('en', momentLocales);

  const timestamp = moment(data.sentAt.seconds * 1000).format(
    'D/MM/YYYY h:mm:ss a'
  );
  const timeLabel = moment(data.sentAt.seconds * 1000).fromNow();
  const isIncoming = data.isIncoming;

  const adminsContext = useContext(AdminsContext);
  const sender = data.senderId && adminsContext.getAdmin(data.senderId);

  let bodyContent;
  switch (data.type) {
    case 'email':
      bodyContent = (
        <ExpansionPanel classes={{ root: classes.expansionRoot }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{
              root: classes.expansionSummaryRoot,
              content: classes.expansionSummaryContent,
              expandIcon: classes.expandIcon,
              expanded: classes.expansionSummaryExpanded,
            }}
          >
            <Typography variant="body1" className={classes.expansionTitle}>
              <MailIcon className={classes.expansionAdornmentIcon} />
              {data.subject || (
                <span className={classes.noSubject}>No subject</span>
              )}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            classes={{ root: classes.emailExpansionDetails }}
          >
            <div
              className={classes.renderedHTML}
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
      break;
    case 'activity':
      bodyContent = (
        <div
          className={classes.renderedHTML}
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
      );
      break;
    case 'event':
      const startTime = moment(data.data.start.dateTime);
      const endTime = moment(data.data.end.dateTime);

      bodyContent = (
        <ExpansionPanel classes={{ root: classes.expansionRoot }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{
              root: classes.expansionSummaryRoot,
              content: classes.expansionSummaryContent,
              expandIcon: classes.expandIcon,
              expanded: classes.expansionSummaryExpanded,
            }}
          >
            <Typography variant="body1" className={classes.expansionTitle}>
              <EventIcon className={classes.expansionAdornmentIcon} />
              {data.data.summary}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={classNames(
              classes.expansionDetails,
              classes.eventDetails
            )}
          >
            <Grid container className={classes.eventDetailsBlock}>
              <Grid item>
                <TimeIcon className={classes.expansionAdornmentIcon} />
              </Grid>
              <Grid item xs>
                {endTime.diff(startTime, 'days') > 0 ||
                startTime.date() !== endTime.date() ? (
                  <React.Fragment>
                    <Typography variant="body2">
                      <span className={classes.eventDetailCaption}>from</span>
                      {startTime.format('ddd, D/MM/YYYY · h:mm a')}
                    </Typography>
                    <Typography variant="body2">
                      <span className={classes.eventDetailCaption}>to</span>
                      {endTime.format('ddd, D/MM/YYYY · h:mm a')}
                    </Typography>
                  </React.Fragment>
                ) : (
                  <Typography variant="body2">
                    {startTime.format('ddd, D/MM/YYYY · h:mm a')}–
                    {endTime.format('h:mm a')}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {data.data.description && data.data.description.length > 0 && (
              <Grid container className={classes.eventDetailsBlock}>
                <Grid item>
                  <DetailsIcon className={classes.expansionAdornmentIcon} />
                </Grid>
                <Grid item xs>
                  <Typography variant="body2">
                    {data.data.description}
                  </Typography>
                </Grid>
              </Grid>
            )}

            <Grid container className={classes.eventDetailsBlock}>
              <Grid item>
                <LocationIcon className={classes.expansionAdornmentIcon} />
              </Grid>
              <Grid item xs>
                <Typography variant="body2">{data.data.location}</Typography>
              </Grid>
            </Grid>

            <Grid container className={classes.eventDetailsBlock}>
              <Grid item>
                <AttendeesIcon className={classes.expansionAdornmentIcon} />
              </Grid>
              <Grid item xs>
                {data.data.attendees.map((x, i) => (
                  <Typography key={i} variant="body2">
                    {x.email}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
      break;
    case 'reminder':
      bodyContent = (
        <Grid container>
          <Grid item>
            <ReminderIcon className={classes.reminderIcon} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{data.data.title}</Typography>
            <Typography variant="body2">
              {moment
                .unix(data.data.dateTime.seconds)
                .format('D/MM/YYYY · h:mm a')}
            </Typography>
          </Grid>

          {data.data.subscribers && (
            <Grid container className={classes.reminderSubscribers}>
              <Grid item>
                <AttendeesIcon className={classes.reminderAttendeesIcon} />
              </Grid>
              <Grid item>
                {data.data.subscribers.map(x => (
                  <Typography key={x} variant="body2">
                    {adminsContext.getAdmin(x).givenName}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      );
      break;
    default:
      bodyContent = <Typography variant="body2">{data.body}</Typography>;
      break;
  }

  return (
    <div
      className={classNames(
        classes.root,
        isIncoming ? classes.incomingMessage : classes.yourMessage,
        firstOfType &&
          (isIncoming ? classes.firstOfIncoming : classes.firstOfYour),
        lastOfType &&
          (isIncoming ? classes.lastOfIncoming : classes.lastOfYour),
        data.type === 'linkedin' && classes.linkedin,
        data.type === 'note' && classes.note,
        data.type === 'email' && classes.email,
        data.type === 'activity' && classes.activity,
        data.type === 'event' && classes.event,
        data.type === 'reminder' && classes.reminder,
        data.body && isOnlyEmojis(data.body) && classes.emojiMessage
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
          {bodyContent}
        </div>
      </Tooltip>
      {!isIncoming &&
        lastOfType &&
        (sender ? (
          <Tooltip title={sender.givenName}>
            {sender.avatarURL ? (
              <Avatar className={classes.avatar} src={sender.avatarURL} />
            ) : (
              <Avatar className={classes.avatar}>
                {sender.givenName[0]}
                {sender.familyName[0]}
              </Avatar>
            )}
          </Tooltip>
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
