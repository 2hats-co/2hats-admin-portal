import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
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
import CustomIcon from '@material-ui/icons/Build';

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
  durationLabel: {
    marginLeft: theme.spacing.unit * 1.75,
  },
  dateTimePicker: {
    marginRight: theme.spacing.unit,
  },
  durationWrapper: {
    minHeight: 44,
  },
  sliderWrapper: {
    marginRight: theme.spacing.unit * 3,
  },
});

function EventDialog(props) {
  const { classes, showDialog, setShowDialog, conversation } = props;
  const displayName = conversation.displayName;

  const [customDuration, setCustomDuration] = useState(false);
  const [data, setData] = useState({
    summary: '',
    description: '',
    location: '66-68 Devonshire St, Surry Hills NSW 2010',
    start: {
      dateTime: moment(), // needs to be converted to ISO string on output
      timeZone: 'Australia/Sydney',
    },
    end: {
      dateTime: moment().add(30, 'm'), // needs to be converted to ISO string on output
      duration: 30, // needs to be removed on output
      timeZone: 'Australia/Sydney',
    },
    attendees: [],
  });

  const updateData = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleClose = () => {
    setShowDialog(false);
    if (
      data.end.duration === 30 ||
      data.end.duration === 60 ||
      data.end.duration === 120
    )
      setCustomDuration(false);
  };

  const handleDuration = (e, val) => {
    updateData('end', {
      ...data.end,
      duration: val,
      dateTime: data.start.dateTime.clone().add(val, 'm'),
    });
  };

  const titleSuggestions = [
    displayName,
    `Meeting with ${displayName}`,
    `Call ${displayName}`,
    `Chat with ${displayName}`,
  ];

  return (
    <Dialog
      open={showDialog}
      onClose={handleClose}
      classes={{ paper: classes.root }}
    >
      <DialogTitle>Add Calendar Event</DialogTitle>

      <DialogContent>
        <div className={classes.block}>
          <TextField
            label="Title"
            variant="outlined"
            autoFocus
            fullWidth
            value={data.summary}
            onChange={e => {
              updateData('summary', e.target.value);
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
                    updateData('summary', x);
                  }}
                />
              ))}
            </Grid>
          </Grid>
        </div>

        <div className={classes.block}>
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={data.description}
            onChange={e => {
              updateData('description', e.target.value);
            }}
            className={classes.titleField}
            margin="dense"
          />
        </div>

        <div className={classes.block}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              label="Starting at"
              value={data.start.dateTime}
              onChange={dt => {
                updateData('start', { ...data.start, dateTime: dt });
              }}
              leftArrowIcon={<LeftIcon />}
              rightArrowIcon={<RightIcon />}
              dateRangeIcon={<DateIcon />}
              timeIcon={<TimeIcon />}
              format="D/MM/YYYY hh:mm a"
              showTodayButton
              className={classes.dateTimePicker}
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </div>

        <div className={classes.block}>
          <Typography variant="caption" className={classes.durationLabel}>
            Duration
          </Typography>
          <Grid
            container
            alignItems="center"
            className={classes.durationWrapper}
          >
            {customDuration ? (
              <React.Fragment>
                <Grid item xs className={classes.sliderWrapper}>
                  <Slider
                    classes={{ container: classes.slider }}
                    onChange={handleDuration}
                    value={data.end.duration}
                    min={5}
                    max={180}
                    step={5}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {data.end.duration} min
                  </Typography>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <ToggleButtonGroup
                  exclusive
                  value={data.end.duration}
                  onChange={handleDuration}
                >
                  <ToggleButton value={30}>30 min</ToggleButton>
                  <ToggleButton value={60}>1 h</ToggleButton>
                  <ToggleButton value={120}>2 h</ToggleButton>
                </ToggleButtonGroup>{' '}
                <Tooltip title="Custom">
                  <IconButton onClick={() => setCustomDuration(true)}>
                    <CustomIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </React.Fragment>
            )}
          </Grid>
          <Typography variant="body1" className={classes.durationLabel}>
            Ends at{' '}
            <b>
              {data.end.dateTime &&
                data.end.dateTime.format('D/MM/YYYY hh:mm a')}
            </b>
          </Typography>
        </div>

        <div className={classes.block}>
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={data.location}
            onChange={e => {
              updateData('location', e.target.value);
            }}
            className={classes.locationField}
            margin="dense"
            autoComplete="street-address"
          />
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

export default withStyles(styles)(EventDialog);
