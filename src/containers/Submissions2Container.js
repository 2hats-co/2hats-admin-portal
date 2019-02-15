import React, { useEffect } from 'react';
import withNavigation from '../components/withNavigation';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';

import Submissions2Icon from '@material-ui/icons/RateReviewOutlined';

import LocationIndicator from '../components/LocationIndicator';
import LoadingHat from '../components/LoadingHat';
import SubmissionsList from '../components/Submissions/SubmissionsList';
import SubmissionHeader from '../components/Submissions/SubmissionHeader';
import AssessmentSubmission from '../components/Submissions/AssessmentSubmission';
import JobSubmission from '../components/Submissions/JobSubmission';

import useDocument from '../hooks/useDocument';
import { ROUTES } from '../constants/routes';

const styles = theme => ({
  messagesContainer: {
    height: '100vh',
    // marginTop: -64,

    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.background.paper,
    borderLeft: `1px solid ${theme.palette.divider}`,
  },

  messagesWrapper: {
    overflowY: 'auto',
  },

  nothingSelected: {
    height: '100vh',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    cursor: 'default',
    userSelect: 'none',
    '& svg': {
      fontSize: 48,
      color: theme.palette.text.disabled,
    },
  },
});

function SubmissionView(props) {
  const { submission } = props;

  if (!submission || !submission.type) return null;

  switch (submission.type) {
    case 'assessment':
      return <AssessmentSubmission data={submission} />;
    case 'job':
      return <JobSubmission data={submission} />;
    default:
      return null;
  }
}

function Submissions2Container(props) {
  const { classes, location, history } = props;

  const [submissionState, submissionDispatch] = useDocument();
  let selectedSubmission = submissionState.doc;

  // const handleCloseSubmission = () => {
  //   submissionDispatch({ path: null });
  // };

  const setSubmissionWithURL = async () => {
    if (location.search.indexOf('?id=') > -1) {
      const submissionId = location.search.replace('?id=', '');
      submissionDispatch({ path: `submissions/${submissionId}` });
    }
  };

  useEffect(
    () => {
      selectedSubmission = null;
      setSubmissionWithURL();
    },
    [location.search]
  );

  return (
    <Fade in>
      <Grid container direction="row">
        <LocationIndicator title="Submissions2" />
        <Grid
          item
          style={{
            width: 320,
            height: 'calc(100vh - 64px)',
          }}
        >
          <SubmissionsList
            selectedSubmission={selectedSubmission}
            setSelectedSubmission={sub => {
              submissionDispatch({
                path: `${ROUTES.submissions2}/${sub.id}`,
              });
              history.push(`${ROUTES.submissions2}?id=${sub.id}`);
            }}
          />
        </Grid>
        <Grid
          item
          xs
          className={classes.messagesContainer}
          style={{ marginTop: '-64px' }}
        >
          {selectedSubmission ? (
            <Grid
              container
              direction="column"
              wrap="nowrap"
              style={{ height: '100vh' }}
            >
              <SubmissionHeader submission={selectedSubmission} />

              <Grid item xs className={classes.messagesWrapper}>
                <SubmissionView submission={selectedSubmission} />
              </Grid>
            </Grid>
          ) : location.search.indexOf('?id=') > -1 ? (
            <LoadingHat altBg message="Finding and/or creating conversation…" />
          ) : (
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.nothingSelected}
            >
              <Grid item>
                <Submissions2Icon />
                <Typography variant="subtitle1" color="textSecondary">
                  Nothing selected
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Fade>
  );
}
export default withNavigation(withStyles(styles)(Submissions2Container));
