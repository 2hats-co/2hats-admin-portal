import React, { useState, useRef, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import DateIcon from '@material-ui/icons/EventOutlined';
import TimeIcon from '@material-ui/icons/AccessTime';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from 'material-ui-pickers';
import moment from 'moment';
import ToggleButton from '@material-ui/lab/ToggleButton';

import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const styles = theme => ({
  root: {
    minWidth: 480,
  },
  block: {
    marginTop: theme.spacing.unit * 2,
    '&:first-of-type': { marginTop: theme.spacing.unit / 2 },
  },
  suggestedLabel: {
    marginLeft: theme.spacing.unit * 1.75,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    lineHeight: `${theme.spacing.unit * 4}px`,
  },
  suggestionChip: {
    marginTop: theme.spacing.unit,
  },
  inLabel: {
    marginLeft: theme.spacing.unit * 1.75,
    marginRight: theme.spacing.unit,
  },
  toggleButtons: {
    width: '100%',
    marginLeft: theme.spacing.unit,
    display: 'flex',
  },
  customButton: {
    flex: 1.75,
    marginLeft: theme.spacing.unit * 2,

    '& svg': { marginRight: theme.spacing.unit * 0.75 },

    '&::before': {
      content: '""',
      display: 'block',
      width: 1,
      height: '100%',
      backgroundColor: theme.palette.divider,
      position: 'absolute',
      left: -theme.spacing.unit,
    },
  },
  finalBlock: {
    paddingLeft: theme.spacing.unit * 1.75,
    paddingRight: theme.spacing.unit * 1.75,
    marginTop: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3,
    position: 'relative',

    '&::before': {
      content: '""',
      display: 'block',
      width: '100%',
      height: 1,
      backgroundColor: theme.palette.divider,
      position: 'relative',
      top: -theme.spacing.unit * 3,
    },
  },
});

function ReminderDialog(props) {
  const { classes, showDialog, setShowDialog, conversation } = props;
  const displayName = conversation.displayName;

  const [title, setTitle] = useState('');
  const [dt, setDt] = useState(moment());
  const [duration, setDuration] = useState(1);
  const [units, setUnits] = useState('days');

  const picker = useRef(null);

  const handleClose = () => {
    setShowDialog(false);
  };

  useEffect(
    () => {
      if (units !== 'custom') {
        if (duration && units) {
          setDt(moment().add(duration, units));
        } else {
          setDt(moment());
        }
      }
    },
    [duration, units]
  );

  const titleSuggestions = [
    displayName,
    `Call ${displayName}`,
    `Reply to ${displayName}`,
  ];

  return (
    <Dialog
      open={showDialog}
      onClose={handleClose}
      classes={{ paper: classes.root }}
    >
      <DialogTitle>Add Reminder</DialogTitle>

      <DialogContent>
        <div className={classes.block}>
          <TextField
            label="Title"
            variant="outlined"
            autoFocus
            fullWidth
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
            className={classes.titleField}
            margin="dense"
          />
          <Grid container alignItems="flex-start">
            <Grid item>
              <Typography variant="body2" className={classes.suggestedLabel}>
                Suggested:
              </Typography>
            </Grid>
            <Grid item xs>
              {titleSuggestions.map(x => (
                <Chip
                  key={x}
                  variant="outlined"
                  label={x}
                  className={classes.suggestionChip}
                  onClick={() => {
                    setTitle(x);
                  }}
                />
              ))}
            </Grid>
          </Grid>
        </div>

        <div className={classes.block}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="body2" className={classes.inLabel}>
                in
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <TextField
                value={duration}
                className={classes.numberField}
                onChange={e => {
                  setDuration(e.target.value);
                }}
                type="number"
                disabled={units === 'custom'}
                margin="dense"
              />
            </Grid>

            <Grid item xs>
              <ToggleButtonGroup
                exclusive
                value={units}
                onChange={(e, val) => {
                  if (val) setUnits(val);
                }}
                className={classes.toggleButtons}
              >
                <ToggleButton value="minutes">minutes</ToggleButton>
                <ToggleButton value="hours">hours</ToggleButton>
                <ToggleButton value="days">days</ToggleButton>
                <ToggleButton value="weeks">weeks</ToggleButton>
                <ToggleButton value="months">months</ToggleButton>
                <ToggleButton
                  value="custom"
                  onClick={() => {
                    setUnits('custom');
                    picker.current.open();
                  }}
                  className={classes.customButton}
                >
                  <DateIcon />
                  Custom
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>

          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              ref={picker}
              value={dt}
              onChange={dt => {
                console.log(dt);
                setDt(dt);
              }}
              leftArrowIcon={<LeftIcon />}
              rightArrowIcon={<RightIcon />}
              dateRangeIcon={<DateIcon />}
              timeIcon={<TimeIcon />}
              showTodayButton
              TextFieldComponent={() => null}
            />
          </MuiPickersUtilsProvider>
        </div>

        <div className={classes.finalBlock}>
          <Typography variant="body1">
            You’ll be notified on
            <b> {dt && dt.format('D/MM/YYYY hh:mm a')}</b>
          </Typography>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(ReminderDialog);
/*

import React, { useState, useEffect, useRef } from 'react';

import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import DateIcon from '@material-ui/icons/EventOutlined';
import TimeIcon from '@material-ui/icons/AccessTime';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from 'material-ui-pickers';
import moment from 'moment';

function ReminderDialog(props) {
  const {showDialog, setShowDialog} = props;

  const [dt, setDt] = useState(moment());
  const picker = useRef(null);

  useEffect(() => {
    if (showDialog) picker.current.open();
  }, [showDialog])

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DateTimePicker
        ref={picker}
        value={dt}
        onChange={dt => { setDt(dt) }}
        onClose={() => { setShowDialog(false) }}
        leftArrowIcon={<LeftIcon />}
        rightArrowIcon={<RightIcon />}
        dateRangeIcon={<DateIcon />}
        timeIcon={<TimeIcon />}
        showTodayButton
        TextFieldComponent={() => null }
      />
    </MuiPickersUtilsProvider>
  );
}

export default ReminderDialog;
*/
