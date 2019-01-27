import React, { useState, useEffect } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Fade from '@material-ui/core/Fade';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';

import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PendingIcon from '@material-ui/icons/Schedule';

import EduExpCard from './EduExpCard';
import DebugButton from '../DebugButton';
import useDocument from '../../hooks/useDocument';

const styles = theme => ({
  debugButtons: {
    position: 'absolute',
    top: theme.spacing.unit,
    right: theme.spacing.unit,
  },

  avatar: {
    width: 56,
    height: 56,
    marginRight: 16,
  },
  personIcon: {
    fontSize: 32,
  },
  outcome: {
    textTransform: 'capitalize',
    textAlign: 'right',
    marginRight: theme.spacing.unit,
    fontWeight: 500,
  },
  outcomeIcon: {
    backgroundColor: '#000',
    borderRadius: '50%',
    color: '#fff',
    fontSize: 20,
    padding: 2,
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit,
    width: 20,
    height: 20,
    display: 'inline-block',
  },
  bio: {
    maxWidth: 720,
    marginTop: theme.spacing.unit,
  },
  block: {
    marginTop: theme.spacing.unit * 3,
  },
  skillsHeading: {
    width: 56,
    marginRight: theme.spacing.unit / 2,
  },
  chip: {
    marginBottom: theme.spacing.unit,
  },
  iframe: {
    width: '100%',
    border: 'none',
    height: 960,
    maxHeight: 'calc(100vh - 100px)',
  },
});

function Submission(props) {
  const { classes, submission } = props;

  const timeString = moment.unix(submission.createdAt.seconds).fromNow();
  const timestamp = moment.unix(submission.createdAt.seconds).format('LLLL');

  const [candidateState, candidateDispatch] = useDocument();
  useEffect(
    () => {
      candidateDispatch({ path: `candidates/${submission.UID}` });
    },
    [submission]
  );
  const candidate = candidateState.doc;
  let interests = '';
  if (submission.submissionContent.careerInterests.value) {
    for (
      let i = 0;
      i < submission.submissionContent.careerInterests.value.length;
      i++
    ) {
      interests += submission.submissionContent.careerInterests.value[i];
      if (i < submission.submissionContent.careerInterests.value.length - 1)
        interests += ', ';
    }
  }

  let outcomeIcon;
  switch (submission.outcome) {
    case 'disqualified':
    case 'rejected':
      outcomeIcon = (
        <CloseIcon
          className={classes.outcomeIcon}
          style={{ backgroundColor: red[500] }}
        />
      );
      break;
    case 'accepted':
      outcomeIcon = (
        <CheckIcon
          className={classes.outcomeIcon}
          style={{ backgroundColor: green[500] }}
        />
      );
      break;
    case 'pending':
      outcomeIcon = (
        <PendingIcon
          className={classes.outcomeIcon}
          style={{ backgroundColor: amber[500] }}
        />
      );
      break;
    default:
      outcomeIcon = (
        <div
          className={classes.outcomeIcon}
          style={{ backgroundColor: grey[500] }}
        />
      );
      break;
  }

  const [showPDF, setShowPDF] = useState(false);

  useEffect(
    () => {
      setShowPDF(false);
    },
    [submission.submissionContent.resumeFile.downloadURL]
  );

  return (
    <>
      <div className={classes.debugButtons}>
        <DebugButton title="Copy submission ID" toCopy={submission.id} />
        <DebugButton toCopy={submission.UID} />
      </div>
      <Grid container>
        <Grid item>
          {candidate && candidate.avatarURL ? (
            <Fade in>
              <Avatar className={classes.avatar} src={candidate.avatarURL} />
            </Fade>
          ) : (
            <Avatar className={classes.avatar}>
              <PersonIcon className={classes.personIcon} />
            </Avatar>
          )}
        </Grid>

        <Grid item xs>
          <Grid container alignItems="baseline" spacing={16}>
            <Grid item xs>
              <Typography variant="h5">{submission.displayName}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" className={classes.outcome}>
                {submission.outcome}
                {outcomeIcon}
              </Typography>
            </Grid>

            <Grid item>
              <Tooltip title={timestamp}>
                <Typography variant="body2">{timeString}</Typography>
              </Tooltip>
            </Grid>
          </Grid>

          <Typography variant="body2" className={classes.bio}>
            {submission.submissionContent.bio.length > 0
              ? submission.submissionContent.bio
              : 'No bio'}
          </Typography>
        </Grid>
      </Grid>

      <Grid container alignItems="baseline" className={classes.block}>
        <Grid item className={classes.skillsHeading}>
          <Typography className={classes.subtitle1} variant="subtitle1">
            Skills:
          </Typography>
        </Grid>
        <Grid item xs style={{ maxWidth: 720 }}>
          {submission.submissionContent.skills.map(x => (
            <Chip color="primary" label={x} key={x} className={classes.chip} />
          ))}
        </Grid>
      </Grid>

      <Grid
        container
        alignItems="baseline"
        className={classes.block}
        spacing={8}
      >
        <Grid item>
          <Typography variant="subtitle1">Available:</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {submission.submissionContent.availableDays}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" style={{ marginLeft: 8 }}>
            Interests:
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{interests}</Typography>
        </Grid>
      </Grid>

      {submission.submissionContent.process === 'upload' && (
        <>
          <Typography
            className={classNames(classes.subtitle1, classes.block)}
            variant="subtitle1"
          >
            Resume:
          </Typography>

          <iframe
            title="Submission Resume"
            src={submission.submissionContent.resumeFile.downloadURL}
            className={classes.iframe}
            onLoad={() => {
              setShowPDF(true);
            }}
            style={{ display: showPDF ? 'block' : 'none' }}
          />
          {!showPDF && <LinearProgress />}
        </>
      )}

      {submission.submissionContent.process === 'build' && (
        <>
          <Typography
            className={classNames(classes.subtitle1, classes.block)}
            variant="subtitle1"
          >
            Education:
          </Typography>
          {submission.submissionContent.education.map((x, i) => (
            <EduExpCard
              key={i}
              title={x.degree}
              label={x.major}
              description={x.description}
              startDate={x.startDate}
              endDate={x.endDate}
            />
          ))}

          <Typography
            className={classNames(classes.subtitle1, classes.block)}
            variant="subtitle1"
          >
            Experience:
          </Typography>
          {submission.submissionContent.experience.map((x, i) => (
            <EduExpCard
              key={i}
              title={`${x.title} - ${x.type}`}
              label={x.organisation}
              description={x.description}
              startDate={x.startDate}
              endDate={x.endDate}
            />
          ))}
        </>
      )}
    </>
  );
}

export default withStyles(styles)(Submission);
