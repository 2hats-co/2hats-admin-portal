import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DatePicker, DateTimePicker } from 'material-ui-pickers';
import { MOMENT_FORMATS } from '@bit/sidney2hats.2hats.global.common-constants';
import moment from 'moment';
import FIELDS from '../../../constants/forms/fields';

const styles = theme => ({
  dateTimePicker: {
    marginRight: theme.spacing.unit,
  },
});
const DateTime = props => {
  const { label, name, formikProps, classes, validator, type, width } = props;
  const { setValues, values, errors, touched } = formikProps;
  return (
    <Grid item xs={width || 12}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {type === FIELDS.dateTime ? (
          <DateTimePicker
            label={label}
            value={
              values[name]
                ? moment(values[name], MOMENT_FORMATS.dateTime)
                : null
            }
            onChange={dt => {
              setValues({
                ...values,
                [name]: dt.format(MOMENT_FORMATS.dateTime),
              });
            }}
            format={MOMENT_FORMATS.dateTime}
            showTodayButton
            className={classes.dateTimePicker}
            variant="filled"
            margin="dense"
            fullWidth
            InputProps={{ disableUnderline: true }}
            error={!!(errors[name] && touched[name])}
          />
        ) : (
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
        )}
      </MuiPickersUtilsProvider>
      {validator(name)}
    </Grid>
  );
};
export default withStyles(styles)(DateTime);
