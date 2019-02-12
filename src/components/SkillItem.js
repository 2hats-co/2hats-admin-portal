import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SkillOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import SkillAchievedIcon from '../assets/icons/SkillAchieved';
import green from '@material-ui/core/colors/green';

import { getSkillLabel } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  root: {
    display: 'inline-flex',
    width: 'auto',

    borderRadius: theme.shape.borderRadius / 2,
    padding: `${theme.spacing.unit / 2}px 0`,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 1.5,
    backgroundColor: theme.palette.divider,

    margin: theme.spacing.unit / 2,
  },
  dense: { margin: theme.spacing.unit / 4 },
  achieved: {
    backgroundColor: green[100],
    color: green[800],
  },

  skillIcon: {
    position: 'relative',
    marginRight: theme.spacing.unit * 0.75,
    height: 24,
  },

  label: {
    lineHeight: '1.25',
    fontWeight: 500,
    '$achieved &': { color: green[800] },
  },
  header: {
    display: 'block',
    fontWeight: 500,
  },
});

const SkillItem = props => {
  const { classes, className, style, value, header, dense } = props;

  const achieved = false;

  return (
    <Grid
      container
      className={classNames(
        classes.root,
        dense && classes.dense,
        achieved && classes.achieved,
        className
      )}
      style={style}
      alignItems="center"
      wrap="nowrap"
    >
      <Grid item className={classes.skillIcon}>
        {achieved ? <SkillAchievedIcon /> : <SkillOutlinedIcon />}
      </Grid>
      <Grid item xs>
        <Typography variant="body1" className={classes.label}>
          <span className={classes.header}>{header}</span>
          {getSkillLabel(value)}
        </Typography>
      </Grid>
    </Grid>
  );
};

SkillItem.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  header: PropTypes.node,
  dense: PropTypes.bool,
};

export default withStyles(styles)(SkillItem);
