import React, { useState, useEffect } from 'react';
import withNavigation from '../components/withNavigation';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

import { useSubmission } from '../hooks/useSubmission';

import LocationIndicator from '../components/LocationIndicator';
//import Done from '../components/Done';
import Submission from '../components/Submission';
//import ScreeningForm from '../components/ScreeningForm';
//import FeedbackForm from '../components/FeedbackForm';
//import TemplateGenerator from '../components/TemplateGenerator';
import { sendEmail } from '../utilities/email/send';
import { ROUTES } from '../constants/routes';
import Loadable from 'react-loadable';
//import LoadingHat from '../components/LoadingHat';
//import { useWindowSize } from '../hooks/useWindowSize';
const TemplateGenerator = Loadable({
  loader: () =>
    import('../components/TemplateGenerator' /* webpackChunkName: "TemplateGenerator" */),
  loading: CircularProgress,
});
const FeedbackForm = Loadable({
  loader: () =>
    import('../components/FeedbackForm' /* webpackChunkName: "FeedbackForm" */),
  loading: CircularProgress,
});
const ScreeningForm = Loadable({
  loader: () =>
    import('../components/ScreeningForm' /* webpackChunkName: "ScreeningForm" */),
  loading: CircularProgress,
});
const Done = Loadable({
  loader: () =>
    import('../components/Done' /* webpackChunkName: "Submissions-Done" */),
  loading: CircularProgress,
});
// const Submission = Loadable({
//   loader: () =>
//     import('../components/Submission' /* webpackChunkName: "Submission" */),
//   loading: LoadingHat,
// });

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
      if (!submission && location.search.indexOf('?uid=') > -1) {
        const uid = location.search.replace('?uid=', '');
        submissionDispatch({ uid });
      }
    },
    [submission, location.search]
  );

  const [email, setEmail] = useState(null);
  const [emailReady, setEmailReady] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);

  const locationIndicator = (
    <div className={classes.locationIndicatorWrapper}>
      <LocationIndicator
        title="Submissions"
        subRoutes={[ROUTES.pending, ROUTES.rejected, ROUTES.accepted]}
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
    console.log(submission);
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
              style={{ overflowY: 'auto', padding: 40, maxWidth: 'none' }}
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
