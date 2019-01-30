import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import IndustryIcon from '@material-ui/icons/BusinessRounded';
import TimeIcon from '@material-ui/icons/AccessTimeRounded';
import PayIcon from '@material-ui/icons/AttachMoneyRounded';
import EventIcon from '@material-ui/icons/EventRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';

import SkillItem from '../SkillItem';
import SuperAvatar from '../SuperAvatar';

import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  ...STYLES.PAPER_VIEW(theme),

  skillsWrapper: {
    marginTop: theme.spacing.unit / 2,
  },
  skillWrapper: {
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

  subtitle: {
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 1.5,

    '& $adornmentIcon': {
      verticalAlign: 'sub',
      color: theme.palette.primary.main,
    },
  },
  meta: {
    marginBottom: theme.spacing.unit,
    display: 'flex',
  },
  adornmentIcon: {
    verticalAlign: 'bottom',
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary,
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

  capitalize: { textTransform: 'capitalize' },

  iframe: {
    width: '100%',
    border: 'none',
    height: 960,
    maxHeight: 'calc(100vh - 100px)',
  },
});

const JobSubmission = props => {
  const { classes, data } = props;

  const [showPDF, setShowPDF] = useState(false);

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item sm={12} md={5}>
          <div
            style={{ backgroundImage: `url(${data.image.url})` }}
            className={classes.coverImage}
          />
        </Grid>

        <Grid item sm={12} md={7}>
          <Typography variant="h5" className={classes.title}>
            {data.title}
          </Typography>

          <Typography variant="subtitle1" className={classes.subtitle}>
            <IndustryIcon className={classes.adornmentIcon} />
            {data.industry}
          </Typography>

          <Typography variant="body1" className={classes.meta}>
            <TimeIcon className={classes.adornmentIcon} />
            {data.commitment}
          </Typography>
          <Typography variant="body1" className={classes.meta}>
            <PayIcon className={classes.adornmentIcon} />
            {data.payRate}/{data.payUnits}
          </Typography>
          <Typography variant="body1" className={classes.meta}>
            <EventIcon className={classes.adornmentIcon} />
            Closing {data.closingDate}
          </Typography>
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
              <Typography variant="h6">Skills required</Typography>
              <Grid container className={classes.skillsWrapper}>
                {data.skillsRequired.map((x, i) => (
                  <Grid
                    key={`${i}-${x}`}
                    item
                    xs={12}
                    sm={4}
                    className={classes.skillWrapper}
                  >
                    <SkillItem value={x} />
                  </Grid>
                ))}
              </Grid>
            </div>

            <div className={classes.section}>
              <Typography variant="h6">About the company</Typography>
              <Typography variant="body1">{data.companyDescription}</Typography>
            </div>

            <div className={classes.section}>
              <Typography variant="h6">The role</Typography>
              <Typography variant="body1">{data.roleDescription}</Typography>
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

      <div className={classes.section}>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body2">Can start in</Typography>
            <Typography variant="h6">
              {data.submissionContent.startWeek} week
              {data.submissionContent.startWeek !== 1 && 's'}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2">Preferred pay</Typography>
            <Typography variant="h6">
              ${((data.submissionContent.pay / 100) * data.payRate).toFixed(2)}
              <small>
                /{data.payUnits} ({data.submissionContent.pay}%)
              </small>
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2">Work restriction</Typography>
            <Typography variant="h6" className={classes.capitalize}>
              {data.submissionContent.workRestriction}
            </Typography>
          </Grid>
        </Grid>
      </div>

      <div className={classes.section}>
        <Typography variant="h6">Cover letter</Typography>
        <Typography variant="body1">{data.roleDescription}</Typography>
      </div>

      <div className={classes.section}>
        <Typography variant="h6">Resume</Typography>
        <iframe
          title="Submission Resume"
          src={data.submissionContent.resume.url}
          className={classes.iframe}
          onLoad={() => {
            setShowPDF(true);
          }}
          style={{ display: showPDF ? 'block' : 'none' }}
        />
        {!showPDF && <LinearProgress />}
      </div>
    </div>
  );
};

JobSubmission.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobSubmission);
