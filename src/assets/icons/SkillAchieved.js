import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentColor',
    flexShrink: 0,
    fontSize: 24,
    transition: theme.transitions.create('fill', {
      duration: theme.transitions.duration.shorter,
    }),
  },
});

const SkillAchieved = props => (
  <svg
    className={classNames(props.classes.root, props.className)}
    focusable="false"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M23,12 L20.56,9.22 L20.9,5.54 L17.29,4.72 L15.4,1.54 L12,3 L8.6,1.54 L6.71,4.72 L3.1,5.53 L3.44,9.21 L1,12 L3.44,14.78 L3.1,18.47 L6.71,19.29 L8.6,22.47 L12,21 L15.4,22.46 L17.29,19.28 L20.9,18.46 L20.56,14.78 L23,12 Z M18.49,14.11 L18.75,16.9 L16.01,17.52 L14.58,19.93 L12,18.82 L9.42,19.93 L7.99,17.52 L5.25,16.9 L5.51,14.1 L3.66,12 L5.51,9.88 L5.25,7.1 L7.99,6.49 L9.42,4.08 L12,5.18 L14.58,4.07 L16.01,6.48 L18.75,7.1 L18.49,9.89 L20.34,12 L18.49,14.11 Z M17.3446445,9.955 L15.9296445,8.54 L10.75,13.7196445 L8.16,11.1396445 L6.75,12.5496445 L10.75,16.5496445 L17.3446445,9.955 Z" />
  </svg>
);

export default withStyles(styles)(SkillAchieved);
