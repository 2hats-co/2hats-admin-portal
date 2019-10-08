import React from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TimeIcon from '@material-ui/icons/AccessTimeOutlined';

import IndustryLabel from './IndustryLabel';
import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  ...STYLES.RENDERED_HTML(theme),

  timeWrapper: {
    marginTop: -theme.spacing(1),
    marginBottom: theme.spacing(1.5),
    width: 'auto',
  },
  timeIcon: {
    marginRight: theme.spacing(0.5),
    color: theme.palette.text.secondary,
  },

  description: {
    ...theme.typography.body2,

    lineClamp: 4,
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',

    // color: theme.palette.text.secondary,
  },
});

export const AssessmentMeta = withStyles(styles)(({ classes, data }) => (
  <>
    <IndustryLabel value={data.category} />

    <Grid container alignItems="flex-end" className={classes.timeWrapper}>
      <TimeIcon className={classes.timeIcon} />
      <Typography variant="body1" color="textSecondary">
        {data.duration}
      </Typography>
    </Grid>
  </>
));

const AssessmentDetail = ({ classes, data }) => (
  <div
    className={classNames(classes.renderedHtml, classes.description)}
    dangerouslySetInnerHTML={{
      __html: data.briefing
        ? `${data.briefing.substr(0, 180)}${
            data.briefing.length > 180 ? '…' : ''
          }`
        : `${data.jobDescription.substr(0, 180)}${
            data.jobDescription.length > 180 ? '…' : ''
          }`,
    }}
  />
);

export default withStyles(styles)(AssessmentDetail);
