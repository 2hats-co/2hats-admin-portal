import React from 'react';
import TextField from '@material-ui/core/TextField';
const Multiline = props => {
  const { label, name, placeholder, formikProps } = props;
  const { handleChange, values, errors, touched } = formikProps;
  return (
    <TextField
      placeholder={placeholder}
      multiline
      rows={5}
      fullWidth
      label={label}
      id={name}
      onChange={handleChange}
      value={values[name]}
      variant="filled"
      margin="dense"
      InputProps={{ disableUnderline: true }}
      error={!!(errors[name] && touched[name])}
      helperText={touched[name] && errors[name]}
    />
  );
};

export default Multiline;
