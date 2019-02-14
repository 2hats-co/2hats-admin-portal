import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import IndustryIcon from '@material-ui/icons/BusinessOutlined';
import TimeIcon from '@material-ui/icons/AccessTimeOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';

import Question from './Question';

import {
  STYLES,
  getAssessmentCategoryLabel,
} from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  ...STYLES.DETAIL_VIEW(theme),

  meta: {
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 3,
    textAlign: 'center',
  },
  metaWrapper: {
    display: 'inline-flex',
    width: 'auto',
    '& + &': { marginLeft: theme.spacing.unit * 2 },
  },
  icon: {
    marginRight: theme.spacing.unit,
    opacity: 0.67,
  },

  expansionPanel: { boxShadow: 'none' },
  expansionPanelSummary: { padding: 0 },
  expansionPanelSummaryExpandIcon: { right: -theme.spacing.unit * 1.5 },
  expansionPanelDetails: {
    flexDirection: 'column',
    padding: 0,
    paddingBottom: theme.spacing.unit * 2,
  },

  superAvatar: {
    width: theme.spacing.unit * 8,
    height: theme.spacing.unit * 8,
    marginRight: theme.spacing.unit * 2,
  },
});

const AssessmentSubmission = props => {
  const { classes, data } = props;

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div
          style={
            data.image && data.image.url
              ? { backgroundImage: `url(${data.image.url})` }
              : {}
          }
          className={classes.coverImage}
        />

        <Typography variant="h4" className={classes.title}>
          {data.title}
        </Typography>

        <div className={classes.meta}>
          <Grid container alignItems="flex-end" className={classes.metaWrapper}>
            <IndustryIcon className={classes.icon} />
            <Typography variant="body1">
              {getAssessmentCategoryLabel(data.category)}
            </Typography>
          </Grid>

          <Grid container alignItems="flex-end" className={classes.metaWrapper}>
            <TimeIcon className={classes.icon} />
            <Typography variant="body1">{data.duration}</Typography>
          </Grid>
        </div>

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
                  dangerouslySetInnerHTML={{ __html: data.companyDescription }}
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
            />
          ))}

        {!data.copiedQuestions && (
          <Question
            questionNum={-1}
            questionText=""
            submissionType={data.submissionType}
            answer={data.submissionContent[0]}
            user={data.user}
          />
        )}
      </main>
    </div>
  );
};

export default withStyles(styles)(AssessmentSubmission);
