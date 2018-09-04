import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import withQuery from '../../containers/withQuery';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

function AnalyticsButton({ classes, total }) {
    return (
      <div>
        <Button variant="contained" color="primary" className={classes.button}>
            <Typography variant="body1" gutterBottom align="left">
              	{total}
            </Typography>
        </Button>
      </div>
    );
  }
  
  AnalyticsButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withQuery(withStyles(styles)(AnalyticsButton));