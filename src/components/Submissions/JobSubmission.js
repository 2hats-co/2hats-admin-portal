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

import IndustryIcon from '@material-ui/icons/Business';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SkillItem from '../SkillItem';
import SuperAvatar from '../SuperAvatar';

import {
  WORK_CULTURE_SLIDER_LABELS,
  WORK_CULTURE_SLIDER_MIN,
  WORK_CULTURE_SLIDER_MAX,
} from '@bit/twohats.common.constants';
import Slider from '@material-ui/lab/Slider';

import {
  STYLES,
  MOMENT_FORMATS,
} from '@bit/sidney2hats.2hats.global.common-constants';

export const MIN_VALUE = WORK_CULTURE_SLIDER_MIN;
export const MAX_VALUE = WORK_CULTURE_SLIDER_MAX;
export const STEP = (MAX_VALUE - MIN_VALUE) / 3;

const styles = theme => ({
  ...STYLES.DETAIL_VIEW(theme),

  skillsWrapper: {
    marginTop: theme.spacing.unit / 2,
  },
  skillWrapper: {
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

  subtitle: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: theme.palette.text.primary,

    marginTop: theme.spacing.unit,
    marginBottom: `${theme.spacing.unit * 3}px !important`,
    display: 'block',

    '& $adornmentIcon': {
      verticalAlign: 'baseline',
      color: theme.palette.text.primary,
      marginBottom: -4,
    },
  },

  grid: {
    textAlign: 'center',
    marginTop: theme.spacing.unit,
  },
  gridItem: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
  },

  meta: {
    fontWeight: 500,
    marginBottom: 0,

    '& small': {
      verticalAlign: 'text-top',
      fontSize: '.75em',
    },
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

  preserveWhiteSpace: { whiteSpace: 'pre-line' },
});

const JobSubmission = props => {
  const { classes, data } = props;

  const [showPDF, setShowPDF] = useState(false);

  console.log('job data', data);

  const matchedNumber = data.payRate.match(/\d+/);
  const minPayRate = Number(matchedNumber ? matchedNumber[0] : 0);
  console.log(data.payRate, matchedNumber, minPayRate);

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        {data.image && data.image.url ? (
          <div
            style={{ backgroundImage: `url(${data.image.url})` }}
            className={classes.coverImage}
          />
        ) : (
          <div style={{ height: 24 }} />
        )}

        <Typography variant="h4" className={classes.title}>
          {data.title}
        </Typography>

        <Typography variant="h6" className={classes.subtitle}>
          <IndustryIcon className={classes.adornmentIcon} />
          {data.industry}
        </Typography>

        <Grid container className={classes.grid} spacing={16} justify="center">
          <Grid item xs={4} className={classes.gridItem}>
            <Typography variant="h5" className={classes.meta}>
              {data.commitment}
            </Typography>
            <Typography variant="body1">{data.commitmentUnits}</Typography>
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
            <Typography variant="h5" className={classes.meta}>
              <small>$</small>
              {data.payRate}
            </Typography>
            <Typography variant="body1">{data.payUnits}</Typography>
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
            <Typography variant="h5" className={classes.meta}>
              {moment
                .unix(data.closingDate.seconds)
                .format(MOMENT_FORMATS.date)}
            </Typography>
            <Typography variant="body1">Closing date</Typography>
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
                <Typography variant="subtitle1">Skills required</Typography>
                <Grid container className={classes.skillsWrapper}>
                  {data.skillsRequired.map((x, i) => (
                    <Grid
                      key={`${i}-${x}`}
                      item
                      xs={12}
                      sm={4}
                      className={classes.skillWrapper}
                    >
                      <SkillItem value={x} achieved />
                    </Grid>
                  ))}
                </Grid>
              </div>

              <div className={classes.section}>
                <Typography variant="subtitle1" gutterBottom>
                  About the company
                </Typography>
                <Typography variant="body1">
                  {data.companyDescription}
                </Typography>
              </div>

              <div className={classes.section}>
                <Typography variant="subtitle1" gutterBottom>
                  Job description
                </Typography>
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
                Submitted {moment(data.createdAt.toDate()).fromNow()}
              </Typography>
            </Grid>
          </Grid>
        </div>

        <div className={classes.section}>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="body2">Available to start</Typography>
              <Typography variant="h6">
                {moment(
                  data.submissionContent.jobAvailabilityStartDate.toDate()
                )
                  .startOf('month')
                  .format('MMMM YYYY')}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body2">Preferred pay</Typography>
              <Typography variant="h6">
                ${(minPayRate * (data.submissionContent.pay / 100)).toFixed(2)}{' '}
                <small>
                  {data.payUnits} ({data.submissionContent.pay}%)
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
          <Typography variant="body1" className={classes.preserveWhiteSpace}>
            {data.submissionContent.coverLetter}
          </Typography>
        </div>

        <div className={classes.section}>
          <Typography variant="h6">Work culture</Typography>
          {Object.keys(WORK_CULTURE_SLIDER_LABELS).map((label, i) => (
            <div>
              <Grid container justify="space-between">
                {WORK_CULTURE_SLIDER_LABELS[label].map(x => (
                  <Typography key={x} variant="overline">
                    {x}
                  </Typography>
                ))}
              </Grid>
              <Slider
                key={label}
                value={data.submissionContent.workCultureSliders[label]}
                min={MIN_VALUE}
                max={MAX_VALUE}
                step={STEP}
              />
            </div>
          ))}
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

        <div className={classes.section}>
          <Typography variant="h6">Portfolio</Typography>
          {data.submissionContent.portfolioFile && (
            <iframe
              title="Portfolio PDF"
              src={data.submissionContent.portfolioFile.url}
              className={classes.iframe}
              onLoad={() => {
                setShowPDF(true);
              }}
              style={{ display: showPDF ? 'block' : 'none' }}
            />
          )}
          {!showPDF && <LinearProgress />}

          <Typography paragraph>
            <a
              href={data.submissionContent.portfolioExternal}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.submissionContent.portfolioExternal}
            </a>
          </Typography>
        </div>
      </main>
    </div>
  );
};

JobSubmission.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobSubmission);
