import React from 'react';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SubmissionTypeIcon from './SubmissionTypeIcon';
import DebugButton from '../DebugButton';

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
});

function SubmissionHeader(props) {
  const { classes, submission } = props;

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
          <DebugButton
            title="Copy assessment ID"
            toCopy={submission.assessmentId}
          />
          <DebugButton
            title="Copy user submission doc ID"
            toCopy={submission.userSubmissionDocId}
          />
          <DebugButton toCopy={submission.UID} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(SubmissionHeader);
