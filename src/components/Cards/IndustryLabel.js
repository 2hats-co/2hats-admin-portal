import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import IndustryIcon from '@material-ui/icons/BusinessOutlined';

import { getAssessmentCategoryLabel } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  industryWrapper: {
    width: 'auto',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit / 2,
  },
  industryIcon: {
    marginRight: theme.spacing.unit / 2,
    marginLeft: -theme.spacing.unit / 4,
    color: theme.palette.text.primary,
  },
  industryText: { fontWeight: 500 },
});

const IndustryLabel = props => {
  const { classes, value } = props;

  return (
    <Grid container alignItems="center" className={classes.industryWrapper}>
      <Grid item>
        <IndustryIcon className={classes.industryIcon} />
      </Grid>
      <Grid item xs>
        <Typography variant="subtitle1" className={classes.industryText}>
          {getAssessmentCategoryLabel(value)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(IndustryLabel);
