import React, { useState, useEffect, Suspense, lazy } from 'react';
import withNavigation from '../components/withNavigation';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

import { useSubmission } from '../hooks/useSubmission';

import LocationIndicator from '../components/LocationIndicator';
import { sendEmail } from '../utilities/email/send';
import { ROUTES } from '../constants/routes';
import LoadingHat from '../components/LoadingHat';

const Done = lazy(() =>
  import('../components/Done' /* webpackChunkName: "Done" */)
);
const Submission = lazy(() =>
  import('../components/Submission' /* webpackChunkName: "Submission" */)
);
const ScreeningForm = lazy(() =>
  import('../components/Submission/ScreeningForm' /* webpackChunkName: "ScreeningForm" */)
);
const FeedbackForm = lazy(() =>
  import('../components/Submission/FeedbackForm' /* webpackChunkName: "FeedbackForm" */)
);
const TemplateGenerator = lazy(() =>
  import('../components/TemplateGenerator' /* webpackChunkName: "TemplateGenerator" */)
);

// import Search from '../components/Search'
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: 'calc(100vh - 64px)',
  },
  locationIndicatorWrapper: {
    paddingLeft: 40 - 24,
    backgroundColor: theme.palette.background.default,
  },
  submissionWrapper: {
    overflowY: 'auto',
    padding: 40,
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
});

function SumbissionsContainer(props) {
  const { classes, location, history } = props;

  const [template, setTemplate] = useState(null);
  const [smartLink, setSmartLink] = useState(null);

  const currentRoute = location.pathname.replace('/', '');
  const [submissionState, submissionDispatch] = useSubmission(currentRoute);
  const submission = submissionState.submission;

  useEffect(
    () => {
      if (location.search.indexOf('?uid=') > -1) {
        const uid = location.search.replace('?uid=', '');
        submissionDispatch({ uid });
      }
      //return () => {};
    },
    [location.search]
  );

  const [email, setEmail] = useState(null);
  const [emailReady, setEmailReady] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);

  const locationIndicator = (
    <div className={classes.locationIndicatorWrapper}>
      <LocationIndicator
        title="Submissions"
        subRoutes={
          location.pathname === ROUTES.submissions
            ? [
                ROUTES.pending,
                ROUTES.rejected,
                ROUTES.accepted,
                { label: 'Submission', value: ROUTES.submissions },
              ]
            : [ROUTES.pending, ROUTES.rejected, ROUTES.accepted]
        }
        altBg
      />
    </div>
  );

  if (submissionState.loading) {
    return (
      <React.Fragment>
        {locationIndicator}
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <CircularProgress size={64} />
        </Grid>
      </React.Fragment>
    );
  }

  if (submission.complete) {
    return (
      <div style={{ overflow: 'hidden' }}>
        {locationIndicator} <Done />
      </div>
    );
  }

  const handleSendEmail = () => {
    sendEmail(email);
    setShowSnackbar(true);
    setTemplate(null);
    setEmailReady(false);
  };

  let rightPanel;
  switch (submission.outcome) {
    case 'pending':
    case 'disqualified':
      rightPanel = (
        <ScreeningForm
          submission={submission}
          setTemplate={setTemplate}
          setSmartLink={setSmartLink}
          submissionDispatch={submissionDispatch}
          handleSendEmail={handleSendEmail}
          emailReady={emailReady}
          setEmailReady={setEmailReady}
        />
      );
      break;
    case 'rejected':
    case 'accepted':
      rightPanel = (
        <FeedbackForm
          submission={submission}
          setTemplate={setTemplate}
          setSmartLink={setSmartLink}
          submissionDispatch={submissionDispatch}
          handleSendEmail={handleSendEmail}
          emailReady={emailReady}
          location={location}
          history={history}
        />
      );
      break;
    default:
      rightPanel = null;
  }

  return (
    <React.Fragment>
      {locationIndicator}
      <Grid container className={classes.root} wrap="nowrap">
        <Suspense fallback={<LoadingHat />}>
          <Grid item xs className={classes.card}>
            <Grid
              container
              direction="column"
              wrap="nowrap"
              style={{ height: '100%' }}
            >
              <Grid
                item
                xs={template ? 8 : 12}
                className={classes.submissionWrapper}
              >
                <Submission
                  submission={submission}
                  listType={location.pathname.split('/')[1]}
                />
              </Grid>
              {template && (
                <Grid item xs={4} style={{ maxWidth: 'none' }}>
                  <TemplateGenerator
                    template={template}
                    recipientUID={submission.UID}
                    smartLink={smartLink}
                    setEmail={setEmail}
                    setEmailReady={setEmailReady}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item style={{ width: 400, overflowY: 'auto' }}>
            {rightPanel}
          </Grid>
        </Suspense>
      </Grid>

      <Snackbar
        className={classes.successSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        autoHideDuration={1500}
        onClose={() => {
          setShowSnackbar(false);
        }}
        message={<span id="message-id">Sent email!</span>}
      />
    </React.Fragment>
  );
}

export default withNavigation(withStyles(styles)(SumbissionsContainer));
