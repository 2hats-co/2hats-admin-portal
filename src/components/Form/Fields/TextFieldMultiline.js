import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
const TextFieldMultiLine = props => {
  const { name, label, handleChange, values, errors, touched } = props;
  return (
    <Grid item key={name}>
      <TextField
        multiline
        fullWidth
        rows={5}
        label={label}
        id={name}
        onChange={handleChange}
        value={values[name]}
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        error={errors[name] && touched[name]}
        helperText={touched[name] && errors[name]}
      />
    </Grid>
  );
};
export default TextFieldMultiLine;
