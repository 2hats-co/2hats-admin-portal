import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import MailIcon from '@material-ui/icons/Mail';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventIcon from '@material-ui/icons/EventOutlined';
import TimeIcon from '@material-ui/icons/AccessTime';
import DetailsIcon from '@material-ui/icons/Notes';
import LocationIcon from '@material-ui/icons/LocationOnOutlined';
import AttendeesIcon from '@material-ui/icons/PeopleOutlined';
import ReminderIcon from '@material-ui/icons/NotificationsOutlined';
import AttachmentIcon from '@material-ui/icons/Attachment';

import classNames from 'classnames';
import moment from 'moment';

const FAKE_ATTACHMENTS = [
  { fileName: 'a', url: 'google.com', contentType: 'image/png' },
  { fileName: 'b', url: 'apple.com', contentType: 'image/jpeg' },
];

const MessageBody = props => {
  const { classes, data, adminsContext } = props;

  switch (data.type) {
    case 'email':
      return (
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
            {data.attachments && (
              <div className={classes.emailAttachments}>
                {data.attachments.map(x => (
                  <Chip
                    key={x.url}
                    label={x.fileName}
                    icon={
                      <AttachmentIcon style={{ transform: 'rotate(-45deg)' }} />
                    }
                    variant="outlined"
                    component="a"
                    href={x.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    clickable
                  />
                ))}
              </div>
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    case 'activity':
      return (
        <div
          className={classes.renderedHTML}
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
      );
    case 'event':
      const startTime = moment(data.data.start.dateTime);
      const endTime = moment(data.data.end.dateTime);

      return (
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
    case 'reminder':
      return (
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
    default:
      return (
        <Typography variant="body2" className={classes.bodyText}>
          {data.body}
        </Typography>
      );
  }
};

export default MessageBody;
