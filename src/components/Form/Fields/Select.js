import React from 'react';
import Grid from '@material-ui/core/Grid';
import IntegrationReactSelect from '../../IntegrationReactSelect';
const Select = props => {
  const {
    name,
    label,
    placeholder,
    suggestions,
    type,
    values,
    setValues,
    validator,
  } = props;
  return (
    <Grid item key={name}>
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
      />
      {validator(name)}
    </Grid>
  );
};
export default Select;
