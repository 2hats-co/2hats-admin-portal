import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import SkillOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import SkillAchievedIcon from '../assets/icons/SkillAchieved';
import green from '@material-ui/core/colors/green';

import { getSkillLabel } from '@bit/sidney2hats.2hats.global.common-constants';

import { getDoc } from '../utilities/firestore';
const styles = theme => ({
  root: {
    display: 'inline-flex',
    width: 'auto',
    position: 'relative',

    borderRadius: theme.shape.borderRadius / 2,
    padding: `${theme.spacing.unit / 2}px 0`,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 1.5,
    backgroundColor: theme.palette.divider,

    margin: theme.spacing.unit / 2,
  },
  buttonBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    borderRadius: theme.shape.borderRadius / 2,
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
  const {
    classes,
    className,
    style,
    value,
    header,
    dense,
    history,
    clickable,
  } = props;

  const [skillLabel, setSkillLabel] = useState(getSkillLabel(value));
  const [assessmentRoute, setAssessmentRoute] = useState(
    `/assessments?skill=${value}`
  );

  useEffect(
    () => {
      if (value.title) {
        setSkillLabel(value.title);
        setAssessmentRoute(`/assessments?id=${value.id}`);
      }
    },
    [value]
  );

  return (
    <Grid
      onClick={
        clickable
          ? () => {
              history.push(assessmentRoute);
            }
          : () => {}
      }
      container
      className={classNames(classes.root, dense && classes.dense, className)}
      style={style}
      alignItems="center"
      wrap="nowrap"
    >
      <Grid item className={classes.skillIcon}>
        <SkillOutlinedIcon />
      </Grid>
      <Grid item xs>
        <Typography variant="body1" className={classes.label}>
          <span className={classes.header}>{header}</span>
          {skillLabel}
        </Typography>
      </Grid>
      {clickable && <ButtonBase className={classes.buttonBase} />}
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
  clickable: PropTypes.bool,
};

export default withRouter(withStyles(styles)(SkillItem));
