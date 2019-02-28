import React from 'react';
import Grid from '@material-ui/core/Grid';
import IntegrationReactSelect from '../../IntegrationReactSelect';
const Select = props => {
  const {
    label,
    name,
    type,
    placeholder,
    suggestions,
    formikProps,
    width,
  } = props;
  const { setValues, values, errors, touched } = formikProps;

  return (
    <Grid item xs={width || 12}>
      <IntegrationReactSelect
        placeholder={
          placeholder || type.indexOf('MULTI') > -1
            ? 'Select multiple items…'
            : 'Select item…'
        }
        suggestions={suggestions}
        changeHandler={data => {
          setValues({
            ...values,
            [name]: data,
          });
        }}
        value={values[name]}
        label={label}
        isMulti={type.indexOf('MULTI') > -1}
        creatable={type.indexOf('FREE_TEXT') > -1}
        error={!!(errors[name] && touched[name])}
        helperText={
          touched[name] &&
          (typeof errors[name] === 'object' ? errors[name].value : errors[name])
        }
      />
    </Grid>
  );
};
export default Select;
