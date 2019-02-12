import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import IndustryIcon from '@material-ui/icons/BusinessOutlined';
import TimeIcon from '@material-ui/icons/AccessTimeOutlined';

import SkillsList from './SkillsList';

import {
  STYLES,
  getAssessmentCategoryLabel,
} from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  ...STYLES.RENDERED_HTML(theme),

  description: { whiteSpace: 'pre-wrap' },

  categoryWrapper: { marginTop: theme.spacing.unit * 1.5 },
  timeWrapper: { marginTop: theme.spacing.unit / 2 },
  timeIcon: {
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
});

const CourseDetail = ({ classes, data }) => (
  <>
    <Typography
      component="p"
      className={classes.description}
      color="textSecondary"
    >
      {data.description}
    </Typography>

    <SkillsList values={data.skillsAssociated} header="Skills taught" />

    <Grid container alignItems="flex-end" className={classes.categoryWrapper}>
      <IndustryIcon className={classes.timeIcon} />
      <Typography variant="body1">
        {getAssessmentCategoryLabel(data.category)}
      </Typography>
    </Grid>

    <Grid container alignItems="flex-end" className={classes.timeWrapper}>
      <TimeIcon className={classes.timeIcon} />
      <Typography variant="body1">{data.duration}</Typography>
    </Grid>
  </>
);

export default withStyles(styles)(CourseDetail);
