import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Fab from '@material-ui/core/Fab';
import FeedbackIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

import AssessmentSubmission from './AssessmentSubmission';
import JobSubmission from './JobSubmission';

const styles = theme => ({
  scrollWrapper: { overflowY: 'auto' },

  feedbackButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const SubmissionView = props => {
  const { classes, submission } = props;

  const [showFeedback, setShowFeedback] = useState(false);

  if (!submission || !submission.type) return null;

  switch (submission.type) {
    case 'assessment':
      return (
        <>
          <div className={classes.scrollWrapper}>
            <AssessmentSubmission data={submission} />
          </div>
          {showFeedback ? (
            <div>feedback here</div>
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
              Send Feedback
            </Fab>
          )}
        </>
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
