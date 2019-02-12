import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  sliderSectionWrapper: { margin: `${theme.spacing.unit}px 0` },
  sliderWrapper: {
    marginRight: theme.spacing.unit * 3,
  },
  textFieldWithAdornment: {
    paddingRight: 0,
  },
  chipsWrapper: { marginTop: -theme.spacing.unit / 2 },
  chip: {
    marginTop: theme.spacing.unit / 2,
  },
});
const TextItems = props => {
  const {
    label,
    name,
    handleDeleteFromList,
    formikProps,
    classes,
    handleAddToList,
  } = props;
  const { values, errors, touched, handleChange } = formikProps;
  return (
    <Grid item xs={12} className={classes.sliderSectionWrapper}>
      <TextField
        id={`${name}-temp`}
        type="text"
        onChange={handleChange}
        variant="filled"
        margin="dense"
        fullWidth
        value={values[`${name}-temp`] || ''}
        label={label}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            handleAddToList(name, `${name}-temp`);
          }
        }}
        error={!!(errors[name] && touched[name])}
        helperText={touched[name] && errors[name]}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  handleAddToList(name, `${name}-temp`);
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
          classes: {
            adornedEnd: classes.textFieldWithAdornment,
          },
        }}
      />
      <div className={classes.chipsWrapper}>
        {values[name] &&
          values[name].map((y, i) => (
            <Chip
              key={i}
              label={y}
              className={classes.chip}
              onDelete={() => {
                handleDeleteFromList(name, i);
              }}
            />
          ))}
      </div>
    </Grid>
  );
};
export default withStyles(styles)(TextItems);
