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

const Bullhorn = props => (
  <svg
    className={classNames(props.classes.root, props.className)}
    focusable="false"
    viewBox="-1 1 24 24"
  >
    <path d="M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z" />
    <path fill="none" d="M-1 1h24v24H0z" />
  </svg>
);

export default withStyles(styles)(Bullhorn);
