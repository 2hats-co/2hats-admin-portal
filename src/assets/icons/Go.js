import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import withStyles from '@material-ui/core/styles/withStyles';
import GoIcon from '@material-ui/icons/KeyboardArrowRight';

const styles = {
  root: {
    marginLeft: 0,
    'svg&': { marginLeft: 0 },
  },
};

const Go = ({ classes, className, style }) => {
  return (
    <GoIcon
      className={clsx(classes.root, className)}
      style={style}
      color="inherit"
    />
  );
};

Go.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default withStyles(styles)(Go);
