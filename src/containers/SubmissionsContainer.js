import React, {
  useState,
  // useEffect,
  Suspense,
  // lazy
} from 'react';
import withNavigation from '../components/withNavigation';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Snackbar from '@material-ui/core/Snackbar';

// import useCollection from '../hooks/useCollection';

import LocationIndicator from '../components/LocationIndicator';
// import { sendEmail } from '../utilities/email/send';
import { ROUTES } from '../constants/routes';
// import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import LoadingHat from '../components/LoadingHat';
import DebugButton from '../components/DebugButton';

import SubmissionsList from '../components/Submissions/SubmissionsList';
import AssessmentSubmission from '../components/Submissions/AssessmentSubmission';
import JobSubmission from '../components/Submissions/JobSubmission';
import MonkeyButtons from '../components/Submissions/MonkeyButtons';

// const Done = lazy(() =>
//   import('../components/Done' /* webpackChunkName: "Done" */)
// );

// const ScreeningForm = lazy(() =>
//   import('../components/Submissions/ScreeningForm' /* webpackChunkName: "ScreeningForm" */)
// );
// const FeedbackForm = lazy(() =>
//   import('../components/Submissions/FeedbackForm' /* webpackChunkName: "FeedbackForm" */)
// );
// const TemplateGenerator = lazy(() =>
//   import('../components/TemplateGenerator' /* webpackChunkName: "TemplateGenerator" */)
// );

// import Search from '../components/Search'
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: 'calc(100vh)',
  },
  locationIndicatorWrapper: {
    backgroundColor: theme.palette.background.default,
  },
  submissionWrapper: {
    overflowY: 'auto',
    padding: 24,
    maxWidth: 'none',
    position: 'relative',
  },
  card: {
    height: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[16],
    borderRadius: '0 10px 0 0',
    zIndex: 2,
  },
  successSnackbar: {
    '& > div': {
      backgroundColor: green[600],
    },
  },

  debugButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

function SumbissionsContainer(props) {
  const { classes, location } = props;
  const [selectedSubmission, setSelectedSubmission] = useState();

  let submission = selectedSubmission;
  let submissionView = null;
  let rightPanel = null;
  if (submission) {
    switch (submission.type) {
      case 'assessment':
        submissionView = <AssessmentSubmission data={submission} />;
        break;

      case 'job':
        submissionView = <JobSubmission data={submission} />;
        break;

      default:
        // submissionView = (
        //   <Submission
        //     submission={submission}
        //     listType={location.pathname.split('/')[1]}
        //   />
        // );
        break;
    }
    switch (submission.type) {
      case 'assessment':
      case 'job':
        rightPanel = (
          <MonkeyButtons
            submission={submission}
            //submissionDispatch={submissionDispatch}
          />
        );
        break;

      default:
        rightPanel = <div />;
    }
  } else {
    submissionView = (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.noConvs}
      >
        <Grid item>
          <Typography variant="subtitle1" color="textSecondary">
            No open submission
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Grid container className={classes.root} wrap="nowrap">
        <Suspense fallback={<LoadingHat />}>
          <Grid item xs className={classes.card}>
            <Grid
              container
              direction="column"
              wrap="nowrap"
              style={{ height: '100%' }}
            >
              <Grid item xs={12} className={classes.submissionWrapper}>
                {submission && (
                  <DebugButton
                    title="Copy submission ID"
                    toCopy={submission.id}
                    className={classes.debugButton}
                  />
                )}
                {submissionView}
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: 400, overflowY: 'auto' }}>
            <SubmissionsList
              selectedSubmission={selectedSubmission}
              setSelectedSubmission={setSelectedSubmission}
            />
            {rightPanel}
          </Grid>
        </Suspense>
      </Grid>
    </>
  );
}

export default withNavigation(withStyles(styles)(SumbissionsContainer));
