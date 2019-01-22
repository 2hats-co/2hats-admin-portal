import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DatePicker, DateTimePicker } from 'material-ui-pickers';
import { momentFormats } from '../../../constants/momentLocales';
import moment from 'moment';
import FIELDS from '../../../constants/forms/fields';

const styles = theme => ({
  dateTimePicker: {
    marginRight: theme.spacing.unit,
  },
});
const DateTime = props => {
  const { label, name, formikProps, classes, validator, type } = props;
  const { setValues, values, errors, touched } = formikProps;
  return (
    <Grid item key={name}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {type === FIELDS.dateTime ? (
          <DateTimePicker
            label={label}
            value={
              values[name] ? moment(values[name], momentFormats.dateTime) : null
            }
            onChange={dt => {
              setValues({
                ...values,
                [name]: dt.format(momentFormats.dateTime),
              });
            }}
            format={momentFormats.dateTime}
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
              values[name] ? moment(values[name], momentFormats.date) : null
            }
            onChange={dt => {
              setValues({
                ...values,
                [name]: dt.format(momentFormats.date),
              });
            }}
            format={momentFormats.date}
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
