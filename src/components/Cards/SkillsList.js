import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import SkillItem from '../SkillItem';

const styles = theme => ({
  skillsRequiredLabel: {
    marginLeft: theme.spacing.unit / 4,
    marginTop: theme.spacing.unit * 1.5,
  },
  skillsWrapper: { marginLeft: -theme.spacing.unit / 4 },

  extraSkills: {
    display: 'inline-block',
    verticalAlign: 'bottom',
    margin: theme.spacing.unit / 4,
    fontWeight: 500,

    borderRadius: theme.shape.borderRadius / 2,
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 1.5}px`,
    backgroundColor: theme.palette.divider,
  },
});

const SkillsList = props => {
  const { classes, values, header } = props;

  return (
    <>
      <Typography variant="subtitle2" className={classes.skillsRequiredLabel}>
        {header || 'Skills required'}
      </Typography>
      <div className={classes.skillsWrapper}>
        {values.slice(0, 3).map((x, i) => (
          <SkillItem key={`${i}-${x}`} value={x} dense />
        ))}
        {values.length > 3 && (
          <Typography variant="body1" className={classes.extraSkill}>
            +{values.length - 3} more
          </Typography>
        )}
      </div>
    </>
  );
};

export default withStyles(styles)(SkillsList);
