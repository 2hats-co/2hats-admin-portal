import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit / 2,
    marginBottom: -theme.spacing.unit,
  },

  sectionTitle: {
    marginLeft: theme.spacing.unit * 1.5,
    marginBottom: -theme.spacing.unit,
  },

  group: { marginLeft: theme.spacing.unit * 1.25 },

  radioItem: { marginRight: theme.spacing.unit * 4 },
  radio: { marginRight: -2 },
});

const RadioButtons = props => {
  const {
    classes,
    label,
    name,
    options,
    horiz,
    formikProps,
    validator,
  } = props;
  const { handleChange, values, errors, touched } = formikProps;

  return (
    <Grid item xs={12} className={classes.root}>
      <FormControl
        component="fieldset"
        className={classes.formControl}
        error={!!(errors[name] && touched[name])}
      >
        <Typography
          variant="caption"
          className={classes.sectionTitle}
          color={errors[name] && touched[name] ? 'error' : 'textSecondary'}
        >
          {label}
        </Typography>
        <RadioGroup
          name={name}
          className={classes.group}
          value={values[name]}
          onChange={handleChange}
          style={{ flexDirection: horiz ? 'row' : 'column' }}
        >
          {options.map(x => (
            <FormControlLabel
              key={x.value}
              value={x.value}
              control={<Radio className={classes.radio} id={x.value} />}
              label={x.label}
              className={classes.radioItem}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <div className={classes.validatorWrapper}>{validator(name)}</div>
    </Grid>
  );
};

export default withStyles(styles)(RadioButtons);
