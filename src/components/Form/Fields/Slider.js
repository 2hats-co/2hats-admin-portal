import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MUISlider from '@material-ui/lab/Slider';

const styles = theme => ({
  sliderSectionWrapper: { margin: `${theme.spacing.unit}px 0` },
  sliderWrapper: {
    marginRight: theme.spacing.unit * 3,
  },
});
const Slider = props => {
  const {
    label,
    name,
    min,
    max,
    step,
    units,
    formikProps,
    classes,
    validator,
  } = props;
  const { setValues, values, errors, touched } = formikProps;
  return (
    <Grid item key={name} className={classes.sliderSectionWrapper}>
      <Typography
        variant="caption"
        className={classes.sectionTitle}
        color={errors[name] && touched[name] ? 'error' : 'textSecondary'}
      >
        {label}
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs className={classes.sliderWrapper}>
          <MUISlider
            classes={{ container: classes.slider }}
            onChange={(e, v) => {
              setValues({
                ...values,
                [name]: v,
              });
            }}
            id={name}
            value={values[name]}
            min={min}
            max={max}
            step={step}
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">
            {step < 0.999 ? values[name].toFixed(1) : values[name]} {units}
          </Typography>
        </Grid>
      </Grid>{' '}
      {validator(name)}
    </Grid>
  );
};
export default withStyles(styles)(Slider);
