import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  root: {
    width: 48,
    height: 48,
    borderRadius: '50%',

    backgroundColor: theme.palette.divider,
    color: theme.palette.text.primary,

    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& svg': { fontSize: 32 },
  },
  green: {
    backgroundColor: green[100],
    color: green[700],
  },
  red: {
    backgroundColor: red[100],
    color: red[600],
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
});

const PaddedIcon = props => {
  const { classes, className, children, color } = props;

  return (
    <span
      className={classNames(classes.root, color && classes[color], className)}
    >
      {children}
    </span>
  );
};

PaddedIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default withStyles(styles)(PaddedIcon);
