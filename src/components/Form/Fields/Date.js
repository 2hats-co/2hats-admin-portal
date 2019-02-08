import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DatePicker } from 'material-ui-pickers';
import { MOMENT_FORMATS } from '@bit/sidney2hats.2hats.global.common-constants';
import moment from 'moment';

const styles = theme => ({
  dateTimePicker: {
    marginRight: theme.spacing.unit,
  },
});
const Date = props => {
  const { label, name, formikProps, classes, validator, width } = props;
  const { setValues, values, errors, touched } = formikProps;
  return (
    <Grid item xs={width || 12} key={name}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          label={label}
          value={
            values[name] ? moment(values[name], MOMENT_FORMATS.date) : null
          }
          onChange={dt => {
            setValues({
              ...values,
              [name]: dt.format(MOMENT_FORMATS.date),
            });
          }}
          format={MOMENT_FORMATS.date}
          showTodayButton
          className={classes.dateTimePicker}
          variant="filled"
          margin="dense"
          fullWidth
          InputProps={{ disableUnderline: true }}
          error={!!(errors[name] && touched[name])}
        />
      </MuiPickersUtilsProvider>
      {validator(name)}
    </Grid>
  );
};
export default withStyles(styles)(Date);
