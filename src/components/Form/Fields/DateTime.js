import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from 'material-ui-pickers';
import { momentFormats } from '../../../constants/momentLocales';
import moment from 'moment';

const styles = theme => ({
  dateTimePicker: {
    marginRight: theme.spacing.unit,
  },
});
const DateTime = props => {
  const { label, name, formikProps, classes, validator } = props;
  const { setValues, values, errors, touched } = formikProps;
  return (
    <Grid item key={name}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
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
      </MuiPickersUtilsProvider>
      {validator(name)}
    </Grid>
  );
};
export default withStyles(styles)(DateTime);
