import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PassIcon from '@material-ui/icons/CheckCircle';
import FailIcon from '@material-ui/icons/Error';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import SubmissionTypeIcon from './SubmissionTypeIcon';
import DebugButton from '../DebugButton';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { updateDoc, getDoc } from '../../utilities/firestore';

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 1.5}px ${
      theme.spacing.unit
    }px ${theme.spacing.unit * 2.25}px`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    cursor: 'default',
  },
  typeIcon: {
    marginRight: theme.spacing.unit * 2,
    opacity: 0.87,
    color: theme.palette.text.primary,
  },

  outcomeButton: {
    padding: `${theme.spacing.unit * 0.75}px ${theme.spacing.unit * 1.5}px`,
    marginLeft: theme.spacing.unit,
  },
  selected: { boxShadow: 'none' },
  pass: {
    color: green[500],
    '&$selected': {
      backgroundColor: green[500],
      color: '#fff',
    },
  },
  fail: {
    color: red[500],
    '&$selected': {
      backgroundColor: red[500],
      color: '#fff',
    },
  },
});

function SubmissionHeader(props) {
  const { classes, submission } = props;

  const handleFail = async () => {
    updateDoc(COLLECTIONS.submissions, submission.id, {
      outcome: 'fail',
      screened: true,
    });

    if (submission.type === 'assessment') {
      const user = await getDoc(COLLECTIONS.users, submission.UID);

      if (user.skills && user.skills.includes(submission.skillAssociated)) {
        const newSkills = user.skills;
        newSkills.splice(newSkills.indexOf(submission.skillAssociated), 1);
        updateDoc(COLLECTIONS.users, submission.UID, {
          skills: newSkills,
        });
      }
    }
  };

  const handlePass = async () => {
    updateDoc(COLLECTIONS.submissions, submission.id, {
      outcome: 'pass',
      screened: true,
    });

    if (submission.type === 'assessment') {
      const user = await getDoc(COLLECTIONS.users, submission.UID);

      if (user.skills) {
        if (!user.skills.includes(submission.skillAssociated))
          updateDoc(COLLECTIONS.users, submission.UID, {
            skills: [...user.skills, submission.skillAssociated],
          });
      } else {
        updateDoc(COLLECTIONS.users, submission.UID, {
          skills: [submission.skillAssociated],
        });
      }
    }
  };

  return (
    <Grid item className={classes.root}>
      <Grid container alignItems="center">
        <Grid item>
          <SubmissionTypeIcon
            type={submission.type}
            className={classes.typeIcon}
          />
        </Grid>

        <Grid item xs>
          <Grid container direction="column">
            <Typography variant="h6">
              {submission.user.firstName} {submission.user.lastName}
            </Typography>
            <Typography variant="body2">
              {submission.title} ·{' '}
              {moment(submission.createdAt.seconds * 1000).fromNow()}
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <DebugButton title="Copy submission ID" toCopy={submission.id} />
          <DebugButton toCopy={submission.UID} />

          <Button
            className={classNames(
              classes.outcomeButton,
              classes.fail,
              submission.outcome === 'fail' && classes.selected
            )}
            onClick={handleFail}
            variant={submission.outcome === 'fail' ? 'contained' : 'text'}
          >
            <FailIcon className={classes.icon} /> Fail
          </Button>
          <Button
            className={classNames(
              classes.outcomeButton,
              classes.pass,
              submission.outcome === 'pass' && classes.selected
            )}
            onClick={handlePass}
            variant={submission.outcome === 'pass' ? 'contained' : 'text'}
          >
            <PassIcon className={classes.icon} /> Pass
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(SubmissionHeader);
