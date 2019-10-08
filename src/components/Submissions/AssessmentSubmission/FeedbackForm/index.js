import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import PassIcon from '@material-ui/icons/CheckCircle';
import FailIcon from '@material-ui/icons/Error';
import DisqualifyIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/EditOutlined';
import SendIcon from '@material-ui/icons/Send';

import FeedbackItem from './FeedbackItem';
import FeedbackPreview from './FeedbackPreview';
import Friction from '../../../Friction';
import Form from '../../../Form';
import assessmentFeedbackCustomFields from '../../../../constants/forms/assessmentFeedbackCustom';

import {
  COLLECTIONS,
  STYLES,
} from '@bit/sidney2hats.2hats.global.common-constants';
import ROUTES from '../../../../constants/routes';
import { removeHtmlTags } from '../../../../utilities';
import { submitFeedback } from '../../../../utilities/submissions';
import useCollection from '../../../../hooks/useCollection';

export const passFailStyles = theme => ({
  toggleButtons: { marginLeft: -theme.spacing(1) * 1.5 },

  passButton: {
    height: 36,
    color: green[500],
    '&$toggleButtonSelected': {
      backgroundColor: green[500],
      '&:hover': { backgroundColor: green[500] },
      '& > span': { color: '#fff' },
    },
  },
  failButton: {
    height: 36,
    color: red[500],
    '&$toggleButtonSelected': {
      backgroundColor: red[500],
      '&:hover': { backgroundColor: red[500] },
      '& > span': { color: '#fff' },
    },
  },
  toggleButtonSelected: {},
  toggleButtonLabel: {
    color: 'inherit',
    '& svg': {
      marginRight: theme.spacing(0.5),
      marginLeft: -theme.spacing(1) / 4,
    },
  },
  disableSubmissionsCheckbox: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  renderedHtml: {
    ...STYLES.RENDERED_HTML(theme).renderedHtml,
    ...theme.typography.body2,

    margin: `${theme.spacing(1)}px 0`,
  },
});

const styles = theme => ({
  root: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    overflowY: 'auto',
    height: '100vh',
    boxSizing: 'border-box',
    width: 320,
    position: 'relative',

    padding: `${theme.spacing(3.5)}px ${theme.spacing(2.5)}px`,
    paddingBottom: theme.spacing(10),
  },

  ...passFailStyles(theme),

  tooltipTarget: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  generalCommentsHeader: { marginTop: theme.spacing(1) },
  generalComments: { margin: 0 },
  perCriteriaHeader: { marginTop: theme.spacing(3) },

  submitButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),

    width: 320 - theme.spacing(4),
  },
});

const FeedbackForm = props => {
  const { classes, history, submission } = props;

  const [showForm, setShowForm] = useState(false);

  const [outcome, setOutcome] = useState('');
  const [generalComments, setGeneralComments] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [disableSubmissions, setDisableSubmissions] = useState(
    !!submission.disableSubmissions
  );

  // get default feedback
  useEffect(() => {
    setOutcome(submission.outcome !== 'pending' ? submission.outcome : '');

    if (Array.isArray(submission.feedback)) {
      setFeedback(submission.feedback.filter(x => !!x.id));

      const filtered = submission.feedback.filter(x => !x.id);
      if (filtered.length > 0) {
        setGeneralComments(filtered[0].message);
      } else {
        setGeneralComments('');
      }
    } else {
      setFeedback([]);
      setGeneralComments('');
    }
  }, []);

  const updateFeedback = id => (outcome, message) => {
    const index = feedback.findIndex(x => x.id === id);
    const title = criteria.filter(x => x.id === id)[0].title;
    const output = { id, outcome, message, title };

    const newFeedback = [...feedback];
    if (index < 0) newFeedback.push(output);
    else newFeedback[index] = output;

    setFeedback(newFeedback);
  };
  const removeFeedbackItem = id => () => {
    const index = feedback.findIndex(x => x.id === id);

    const newFeedback = [...feedback];
    if (index >= 0) newFeedback.splice(index, 1);

    setFeedback(newFeedback);
  };

  const [criteriaState] = useCollection({
    path: `${COLLECTIONS.assessments}/${submission.assessmentId}/${
      COLLECTIONS.criteria
    }`,
    sort: { field: 'createdAt', direction: 'asc' },
  });
  const criteria = criteriaState.documents;

  if (criteriaState.loading || !Array.isArray(criteria))
    return (
      <Grid
        container
        className={classes.root}
        justify="center"
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    );

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Feedback
      </Typography>

      <ToggleButtonGroup
        value={outcome || ''}
        exclusive
        onChange={(e, v) => {
          setOutcome(v);
        }}
        className={classes.toggleButtons}
      >
        <ToggleButton
          classes={{
            root: classes.passButton,
            selected: classes.toggleButtonSelected,
            label: classes.toggleButtonLabel,
          }}
          value="pass"
        >
          <Tooltip
            title={`${
              submission.user.firstName
            } fulfilled most of the criteria`}
          >
            <div className={classes.tooltipTarget} />
          </Tooltip>
          <PassIcon />
          Pass
        </ToggleButton>
        <ToggleButton
          classes={{
            root: classes.failButton,
            selected: classes.toggleButtonSelected,
            label: classes.toggleButtonLabel,
          }}
          value="fail"
        >
          <Tooltip
            title={`${
              submission.user.firstName
            } made a valid attempt but did not fulfil most of the criteria`}
          >
            <div className={classes.tooltipTarget} />
          </Tooltip>
          <FailIcon />
          Fail
        </ToggleButton>
        <ToggleButton
          classes={{
            root: classes.failButton,
            selected: classes.toggleButtonSelected,
            label: classes.toggleButtonLabel,
          }}
          value="disqualify"
        >
          <Tooltip
            title={`${
              submission.user.firstName
            } did not make a valid attempt or did not try at all`}
          >
            <div className={classes.tooltipTarget} />
          </Tooltip>
          <DisqualifyIcon />
          Disqualify
        </ToggleButton>
      </ToggleButtonGroup>

      {(outcome === 'fail' || outcome === 'disqualify') && (
        <FormControlLabel
          control={
            <Checkbox
              checked={disableSubmissions}
              onChange={e => setDisableSubmissions(e.target.checked)}
              value="disableSubmissions"
            />
          }
          label={
            <>
              <strong>Disable new submissions</strong> from this user for this
              assessment for the next 6 months
            </>
          }
          className={classes.disableSubmissionsCheckbox}
        />
      )}

      <Grid
        container
        alignItems="baseline"
        className={classes.generalCommentsHeader}
      >
        {removeHtmlTags(generalComments).length > 0 && (
          <Grid item xs>
            <Typography variant="subtitle1">General comments</Typography>
          </Grid>
        )}

        <Grid item>
          <Button
            onClick={() => {
              setShowForm(true);
            }}
            className={
              removeHtmlTags(generalComments).length > 0
                ? ''
                : classes.toggleButtons
            }
          >
            {removeHtmlTags(generalComments).length > 0 ? (
              <EditIcon />
            ) : (
              <AddIcon />
            )}
            {removeHtmlTags(generalComments).length > 0
              ? 'Edit'
              : 'Add general comments'}
          </Button>
        </Grid>
      </Grid>

      {removeHtmlTags(generalComments).length > 0 && (
        <div
          className={classNames(classes.renderedHtml, classes.generalComments)}
          dangerouslySetInnerHTML={{ __html: generalComments }}
        />
      )}

      <Typography variant="h6" className={classes.perCriteriaHeader}>
        Per-criteria feedback
      </Typography>

      {criteria.length > 0 ? (
        criteria.map(x => (
          <FeedbackItem
            key={x.id}
            data={x}
            selections={feedback}
            updateFeedback={updateFeedback(x.id)}
            removeFeedbackItem={removeFeedbackItem(x.id)}
          />
        ))
      ) : (
        <Button
          onClick={() => {
            history.push(
              ROUTES.assessmentsManager +
                '?setCriteriaFor=' +
                submission.assessmentId
            );
          }}
          color="primary"
        >
          Set criteria for {submission.title}
        </Button>
      )}

      <Friction
        message={{
          title: `Are you sure you want to send this feedback to ${
            submission.user.firstName
          }?`,
          customBody: (
            <FeedbackPreview
              feedback={feedback}
              generalComments={generalComments}
              outcome={outcome}
              assessmentTitle={submission.title}
              disableSubmissions={disableSubmissions}
            />
          ),
        }}
      >
        <Fab
          variant="extended"
          color="primary"
          className={classes.submitButton}
          onClick={() => {
            submitFeedback(
              submission.id,
              submission.UID,
              submission.assessmentId,
              outcome,
              generalComments,
              feedback,
              disableSubmissions
            );
          }}
          disabled={!outcome || outcome.length <= 0}
        >
          <SendIcon />
          Submit Feedback
        </Fab>
      </Friction>

      {showForm && (
        <Form
          action="Edit"
          actions={{
            Edit: res => {
              setGeneralComments(res.message);
              setShowForm(false);
            },
            close: () => {
              setShowForm(false);
            },
          }}
          open={showForm}
          data={assessmentFeedbackCustomFields(generalComments)}
          formTitle="general feedback comments"
        />
      )}
    </div>
  );
};

FeedbackForm.propTypes = {
  classes: PropTypes.object.isRequired,
  submission: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(FeedbackForm));
