import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiCheckbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: { paddingLeft: theme.spacing.unit },
  validatorWrapper: {
    marginTop: -theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 1.5,
    marginLeft: theme.spacing.unit * 2.75,
  },
});

const Checkbox = props => {
  const { classes, label, name, formikProps, validator, width } = props;
  const { handleChange, values } = formikProps;

  return (
    <Grid item xs={width || 12}>
      <FormGroup className={classes.root}>
        <FormControlLabel
          control={
            <MuiCheckbox
              checked={values[name]}
              onChange={handleChange}
              name={name}
            />
          }
          label={label}
        />
        <div className={classes.validatorWrapper}>{validator(name)}</div>
      </FormGroup>
    </Grid>
  );
};

export default withStyles(styles)(Checkbox);
