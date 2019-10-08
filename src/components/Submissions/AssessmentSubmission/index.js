import React from 'react';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import PersonIcon from '@material-ui/icons/PersonOutlined';
import AssessmentIcon from '@material-ui/icons/AssignmentOutlined';
import SubmittedIcon from '@material-ui/icons/SendOutlined';
import IndustryIcon from '@material-ui/icons/BusinessOutlined';
import TimeIcon from '@material-ui/icons/AccessTimeOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Question from './Question';
import DebugButton from '../../DebugButton';

import {
  STYLES,
  getAssessmentCategoryLabel,
} from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  ...STYLES.DETAIL_VIEW(theme),

  debugButtonsWrapper: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },

  meta: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(3),
  },
  metaElement: { marginBottom: theme.spacing(0.5) },
  icon: {
    marginRight: theme.spacing(1),
    opacity: 0.67,
    color: theme.palette.text.primary,
  },

  expansionPanel: { boxShadow: 'none' },
  expansionPanelSummary: { padding: 0 },
  expansionPanelSummaryExpandIcon: { right: -theme.spacing(1) * 1.5 },
  expansionPanelDetails: {
    flexDirection: 'column',
    padding: 0,
    paddingBottom: theme.spacing(2),
  },

  superAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(2),
  },
});

const AssessmentSubmission = props => {
  const { classes, data } = props;

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.debugButtonsWrapper}>
          <DebugButton title="Copy submission ID" toCopy={data.id} />
          <DebugButton title="Copy assessment ID" toCopy={data.assessmentId} />
          <DebugButton
            title="Copy user submission doc ID"
            toCopy={data.userSubmissionDocId}
          />
          <DebugButton toCopy={data.UID} />
        </div>

        <Grid container className={classes.meta} alignItems="flex-end">
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" className={classes.metaElement}>
              <PersonIcon className={classes.icon} />
              <Typography variant="h5">
                {data.user.firstName} {data.user.lastName}
              </Typography>
            </Grid>

            <Grid container alignItems="center" className={classes.metaElement}>
              <AssessmentIcon className={classes.icon} />
              <Typography variant="subtitle1">{data.title}</Typography>
            </Grid>

            <Grid
              container
              alignItems="flex-end"
              className={classes.metaElement}
            >
              <SubmittedIcon className={classes.icon} />
              <Typography variant="body1">
                Submitted {moment(data.createdAt.seconds * 1000).fromNow()}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid
              container
              alignItems="flex-end"
              className={classes.metaElement}
            >
              <IndustryIcon className={classes.icon} />
              <Typography variant="body1">
                {getAssessmentCategoryLabel(data.category)}
              </Typography>
            </Grid>

            <Grid
              container
              alignItems="flex-end"
              className={classes.metaElement}
            >
              <TimeIcon className={classes.icon} />
              <Typography variant="body1">Duration: {data.duration}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <div className={classes.section}>
          <ExpansionPanel classes={{ root: classes.expansionPanel }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              classes={{
                root: classes.expansionPanelSummary,
                content: classes.expansionPanelSummaryContent,
                expandIcon: classes.expansionPanelSummaryExpandIcon,
              }}
            >
              <Typography variant="subtitle1" color="primary">
                Details
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              classes={{ root: classes.expansionPanelDetails }}
            >
              {data.briefing && data.briefing.length > 0 ? (
                <div>
                  <div
                    className={classes.renderedHtml}
                    dangerouslySetInnerHTML={{ __html: data.briefing }}
                  />
                </div>
              ) : (
                <>
                  <div>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      className={classes.subtitle}
                    >
                      The company
                    </Typography>
                    <div
                      className={classes.renderedHtml}
                      dangerouslySetInnerHTML={{
                        __html: data.companyDescription,
                      }}
                    />
                  </div>

                  <div className={classes.section}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      className={classes.subtitle}
                    >
                      Your job
                    </Typography>
                    <div
                      className={classes.renderedHtml}
                      dangerouslySetInnerHTML={{ __html: data.jobDescription }}
                    />
                  </div>
                </>
              )}

              {data.relatedMaterial && (
                <div className={classes.section}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    className={classes.subtitle}
                  >
                    Related material
                  </Typography>
                  <div
                    className={classes.renderedHtml}
                    dangerouslySetInnerHTML={{ __html: data.relatedMaterial }}
                  />
                </div>
              )}

              <div className={classes.section}>
                <Typography variant="h6" gutterBottom>
                  Instructions
                </Typography>
                <div
                  className={classes.renderedHtml}
                  dangerouslySetInnerHTML={{ __html: data.taskInstructions }}
                />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Divider />
        </div>

        {data.mcEmail && (
          <div className={classes.section}>
            <Typography variant="body1">
              Sent to <b>{data.mcEmail}</b>
            </Typography>
          </div>
        )}

        {data.copiedQuestions &&
          data.copiedQuestions.map((x, i) => (
            <Question
              key={i}
              questionNum={i + 1}
              questionText={x}
              submissionType={data.submissionType}
              answer={data.submissionContent[i]}
              user={data.user}
              submissionDoc={data}
            />
          ))}

        {!data.copiedQuestions && (
          <Question
            questionNum={-1}
            questionText=""
            submissionType={data.submissionType}
            answer={data.submissionContent[0]}
            smartLink={data.smartLink}
            user={data.user}
            submissionDoc={data}
          />
        )}
      </main>
    </div>
  );
};

export default withStyles(styles)(AssessmentSubmission);
