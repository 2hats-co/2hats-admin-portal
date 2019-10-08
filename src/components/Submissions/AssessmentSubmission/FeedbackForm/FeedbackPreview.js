import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import PassIcon from '@material-ui/icons/CheckCircle';
import FailIcon from '@material-ui/icons/Error';
import PaddedIcon from '../../../PaddedIcon';
import PassedIcon from '../../../../assets/icons/SkillAchieved';
import FailedIcon from '@material-ui/icons/ErrorOutline';
import DisqualifyIcon from '@material-ui/icons/CancelOutlined';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';
import { removeHtmlTags } from '../../../../utilities';

const styles = theme => ({
  root: {},
  paddedIcon: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: { marginBottom: theme.spacing(1) },
  },
  title: {
    marginTop: theme.spacing(0.25),
    marginBottom: theme.spacing(0.5),
  },

  feedback: {
    marginTop: theme.spacing(2),
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },

  feedbackItem: { marginTop: theme.spacing(2) },
  feedbackIcon: {
    display: 'inline-block',
    marginLeft: -theme.spacing(1) * 4,
    marginTop: 2,
    float: 'left',
  },
  passIcon: { color: green[500] },
  failIcon: { color: red[500] },

  renderedHtml: {
    ...STYLES.RENDERED_HTML(theme).renderedHtml,
    ...theme.typography.body2,
  },
});

const FeedbackItem = withStyles(styles)(({ classes, data }) => (
  <div className={classes.feedbackItem}>
    {data.id &&
      (data.outcome === 'pass' ? (
        <PassIcon
          className={classNames(classes.feedbackIcon, classes.passIcon)}
        />
      ) : (
        <FailIcon
          className={classNames(classes.feedbackIcon, classes.failIcon)}
        />
      ))}
    {data.id && <Typography variant="subtitle1">{data.title}</Typography>}
    <div
      className={classes.renderedHtml}
      dangerouslySetInnerHTML={{ __html: data.message }}
    />
  </div>
));

const FeedbackPreview = props => {
  const {
    classes,
    feedback,
    outcome,
    generalComments,
    assessmentTitle,
    disableSubmissions,
  } = props;

  const validGeneralComments =
    typeof generalComments === 'string' &&
    removeHtmlTags(generalComments).length > 0;

  let icon = null;
  let title = null;
  let body = null;

  switch (outcome) {
    case 'pass':
      icon = (
        <PaddedIcon className={classes.paddedIcon} color="green">
          <PassedIcon />
        </PaddedIcon>
      );
      title = 'Passed';
      body = (
        <>
          Congratulations! You’ve earned the <b>{assessmentTitle}</b> badge.
        </>
      );
      break;

    case 'fail':
      icon = (
        <PaddedIcon className={classes.paddedIcon} color="red">
          <FailedIcon />
        </PaddedIcon>
      );
      title = 'Unsuccessful';
      body = 'Your submission did not meet our standards.';
      break;

    case 'disqualify':
      icon = (
        <PaddedIcon className={classes.paddedIcon} color="red">
          <DisqualifyIcon />
        </PaddedIcon>
      );
      title = 'Disqualified';
      body = 'Your submission was disqualified.';
      break;

    default:
      break;
  }

  return (
    <Grid
      container
      className={classes.root}
      alignItems="flex-start"
      direction="row"
    >
      <Grid item className={classes.iconWrapper}>
        {icon}
      </Grid>
      <Grid item xs>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body1">{body}</Typography>

        <Divider className={classes.divider} />

        {disableSubmissions && (
          <Typography variant="body1">
            This user cannot make any further submissions for this assessment
            for the next 6 months.
          </Typography>
        )}

        <div className={classes.feedback}>
          {(feedback.length > 0 || validGeneralComments) && (
            <>
              <Divider className={classes.divider} />
              <Typography variant="h6" gutterBottom>
                Feedback
              </Typography>
              {validGeneralComments && (
                <div
                  className={classes.renderedHtml}
                  dangerouslySetInnerHTML={{ __html: generalComments }}
                />
              )}
            </>
          )}
          {feedback.map((x, i) => (
            <FeedbackItem key={i} data={x} />
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

FeedbackPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  feedback: PropTypes.array.isRequired,
  outcome: PropTypes.string.isRequired,
  generalComments: PropTypes.string.isRequired,
  assessmentTitle: PropTypes.string.isRequired,
  disableSubmissions: PropTypes.bool.isRequired,
};

export default withStyles(styles)(FeedbackPreview);
