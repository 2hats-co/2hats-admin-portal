import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MUISlider from '@material-ui/core/Slider';

const styles = theme => ({
  sliderSectionWrapper: { margin: `${theme.spacing(1)}px 0` },
  sliderGrid: { paddingRight: theme.spacing(1) },
  sliderWrapper: { marginRight: theme.spacing(2) },
  slider: { marginLeft: theme.spacing(1) },
  sectionTitle: { marginLeft: theme.spacing(1.5) },

  thumb: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
  },
  thumbLabel: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    transform: 'scale(0)',
    transformOrigin: '0 100%',

    position: 'absolute',
    top: -theme.spacing(1) * 5,
    left: theme.spacing(0.75),
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,

    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.spacing(1.5),
    borderBottomLeftRadius: 2,

    fontWeight: 500,
    fontFamily: theme.typography.fontFamily,

    '$thumb:active &, $thumb:focus &': { transform: 'scale(1)' },
  },
});
const Slider = props => {
  const {
    label,
    name,
    min,
    max,
    calcValueLabel,
    sliderThumbLabel,
    step,
    units,
    formikProps,
    classes,
    validator,
  } = props;
  const { setValues, values, errors, touched } = formikProps;

  let valueLabel = `${
    step < 0.999 ? values[name].toFixed(1) : values[name]
  } ${units || ''}`;
  if (calcValueLabel) valueLabel = calcValueLabel(values[name]);

  return (
    <Grid item xs={12} className={classes.sliderSectionWrapper}>
      <Typography
        variant="caption"
        className={classes.sectionTitle}
        color={errors[name] && touched[name] ? 'error' : 'textSecondary'}
      >
        {label}
      </Typography>
      <Grid container alignItems="center" className={classes.sliderGrid}>
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
            thumb={
              <div className={classes.thumb}>
                <Typography variant="body1" className={classes.thumbLabel}>
                  {values[name]}
                  {sliderThumbLabel}
                </Typography>
              </div>
            }
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{valueLabel}</Typography>
        </Grid>
      </Grid>{' '}
      {validator(name)}
    </Grid>
  );
};
export default withStyles(styles)(Slider);
