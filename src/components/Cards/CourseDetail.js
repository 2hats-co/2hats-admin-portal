import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TimeIcon from '@material-ui/icons/AccessTimeOutlined';

import IndustryLabel from './IndustryLabel';
import SkillsList from './SkillsList';

import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  ...STYLES.RENDERED_HTML(theme),

  description: {
    whiteSpace: 'pre-wrap',
    marginTop: theme.spacing(1.5),
  },

  timeWrapper: { marginTop: -theme.spacing(1) },
  timeIcon: {
    marginRight: theme.spacing(0.5),
    color: theme.palette.text.secondary,
  },
});

const CourseDetail = ({ classes, data }) => (
  <>
    <IndustryLabel value={data.category} />

    <Grid container alignItems="flex-end" className={classes.timeWrapper}>
      <TimeIcon className={classes.timeIcon} />
      <Typography variant="body1" color="textSecondary">
        {data.duration}
      </Typography>
    </Grid>

    <Typography component="p" className={classes.description}>
      {data.description}
    </Typography>

    {data.skillsAssociated && data.skillsAssociated.length !== 0 && (
      <SkillsList values={data.skillsAssociated} header="Skills covered" />
    )}
  </>
);

export default withStyles(styles)(CourseDetail);
