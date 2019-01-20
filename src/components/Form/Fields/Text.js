import React from 'react';
import FIELDS from '../../../constants/forms/fields';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Multiline from './Multiline';
const Text = props => {
  const { label, name, type, placeholder, formikProps } = props;
  const { handleChange, values, errors, touched } = formikProps;
  return (
    <Grid item key={name}>
      {type === FIELDS.textFieldMultiline ? (
        <Multiline
          type={type}
          formikProps={formikProps}
          label={label}
          name={name}
          placeholder={placeholder}
        />
      ) : (
        <TextField
          label={label}
          id={name}
          type={
            type === FIELDS.textFieldNumber
              ? 'number'
              : type === FIELDS.textFieldPassword
              ? 'password'
              : 'text'
          }
          onChange={handleChange}
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          fullWidth
          value={values[name]}
          placeholder={placeholder}
          error={!!(errors[name] && touched[name])}
          helperText={touched[name] && errors[name]}
        />
      )}
    </Grid>
  );
};

export default Text;
