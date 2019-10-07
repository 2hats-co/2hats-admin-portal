import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import FeedbackIcon from '@material-ui/icons/AssignmentTurnedIn';

import AssessmentSubmission from './AssessmentSubmission';
import FeedbackForm from './AssessmentSubmission/FeedbackForm';
import JobSubmission from './JobSubmission';

const styles = theme => ({
  scrollWrapper: {
    overflowY: 'auto',
    height: '100vh',
    position: 'relative',
  },

  feedbackButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const SubmissionView = props => {
  const { classes, submission } = props;

  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(
    () => {
      setShowFeedback(false);
    },
    [submission.id]
  );

  if (!submission || !submission.type) return null;

  switch (submission.type) {
    case 'assessment':
      return (
        <Grid container>
          <Grid item xs className={classes.scrollWrapper}>
            <AssessmentSubmission data={submission} />
          </Grid>
          {showFeedback ? (
            <FeedbackForm submission={submission} />
          ) : (
            <Fab
              variant="extended"
              color="primary"
              className={classes.feedbackButton}
              onClick={() => {
                setShowFeedback(true);
              }}
            >
              <FeedbackIcon />
              Feedback
            </Fab>
          )}
        </Grid>
      );
    case 'job':
      return (
        <div className={classes.scrollWrapper}>
          <JobSubmission data={submission} />
        </div>
      );
    default:
      return null;
  }
};

export default withStyles(styles)(SubmissionView);
