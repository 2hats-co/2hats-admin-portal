import React from 'react';
import moment from 'moment';

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

import SkillItem from '../../SkillItem';
import SuperAvatar from '../../SuperAvatar';
import Question from './Question';

import {
  STYLES,
  getAssessmentCategoryLabel,
} from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  ...STYLES.PAPER_VIEW(theme),

  meta: { marginTop: theme.spacing.unit },

  industryWrapper: { marginTop: theme.spacing.unit },
  timeWrapper: { marginTop: theme.spacing.unit / 2 },
  icon: {
    marginLeft: theme.spacing.unit * 1.5,
    marginRight: theme.spacing.unit * 2.5,
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
      <Grid container spacing={24}>
        <Grid item sm={12} md={5}>
          <div
            style={
              data.image && data.image.url
                ? { backgroundImage: `url(${data.image.url})` }
                : {}
            }
            className={classes.coverImage}
          />
        </Grid>

        <Grid item sm={12} md={7}>
          <Typography variant="h5" className={classes.title}>
            {data.title}
          </Typography>

          <div className={classes.meta}>
            <SkillItem value={data.skillAssociated} />
            <Grid
              container
              alignItems="flex-end"
              className={classes.industryWrapper}
            >
              <IndustryIcon className={classes.icon} />
              <Typography variant="body1">
                {getAssessmentCategoryLabel(data.category)}
              </Typography>
            </Grid>
            <Grid
              container
              alignItems="flex-end"
              className={classes.timeWrapper}
            >
              <TimeIcon className={classes.icon} />
              <Typography variant="body1">{data.duration}</Typography>
            </Grid>
          </div>
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
            <div>
              <Typography variant="h6">The company</Typography>
              <div
                className={classes.renderedHtml}
                dangerouslySetInnerHTML={{ __html: data.companyDescription }}
              />
            </div>

            <div className={classes.section}>
              <Typography variant="h6">Your job</Typography>
              <div
                className={classes.renderedHtml}
                dangerouslySetInnerHTML={{ __html: data.jobDescription }}
              />
            </div>

            <div className={classes.section}>
              <Typography variant="h6">Instructions</Typography>
              <div
                className={classes.renderedHtml}
                dangerouslySetInnerHTML={{ __html: data.taskInstructions }}
              />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Divider />
      </div>

      <div className={classes.section}>
        <Grid container alignItems="center">
          <Grid item>
            <SuperAvatar data={data.user} className={classes.superAvatar} />
          </Grid>
          <Grid item xs>
            <Typography variant="h5">
              {data.user.firstName} {data.user.lastName}
            </Typography>
            <Typography variant="body2">
              Submitted {moment.unix(data.createdAt.seconds).fromNow()}
            </Typography>
          </Grid>
        </Grid>
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
    </div>
  );
};

export default withStyles(styles)(AssessmentSubmission);
