import React, { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
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

import AddIcon from '@material-ui/icons/AddOutlined';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from 'material-ui-pickers';
import moment from 'moment';
import ToggleButton from '@material-ui/lab/ToggleButton';
import CustomIcon from '@material-ui/icons/BuildOutlined';

import { addEvent, updateEvent } from '../../../utilities/conversations';
import clone from 'ramda/es/clone';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
const styles = theme => ({
  root: {
    minWidth: 480,
  },
  block: {
    marginTop: theme.spacing.unit * 3,
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
  attendeeField: {
    marginRight: theme.spacing.unit,
  },
  addAttendeeButton: {
    height: theme.spacing.unit * 6,
    marginTop: theme.spacing.unit,
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.23) inset',
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

const STREET_ADDRESS = '66-68 Devonshire St, Surry Hills NSW 2010, Australia';

function EventDialog(props) {
  const {
    classes,
    showDialog,
    setShowDialog,
    conversation,
    messageData,
  } = props;
  const displayName = conversation.displayName;

  const initialData = messageData
    ? {
        ...messageData.data,
        attendees: messageData.data.attendees.map(x => x.email),
        start: {
          ...messageData.data.start,
          dateTime: moment(messageData.data.start.dateTime),
        },
        end: {
          ...messageData.data.end,
          dateTime: moment(messageData.data.end.dateTime),
          duration: moment(messageData.data.end.dateTime).diff(
            moment(messageData.data.start.dateTime),
            'minutes'
          ),
        },
      }
    : {
        summary: '',
        description: '',
        location: STREET_ADDRESS,
        start: {
          dateTime: moment(), // needs to be converted to ISO string on output
          timeZone: 'Australia/Sydney',
        },
        end: {
          dateTime: moment().add(30, 'm'), // needs to be converted to ISO string on output
          duration: 30, // needs to be removed on output
          timeZone: 'Australia/Sydney',
        },
        attendees: [conversation.channels.email],
      };

  const [customDuration, setCustomDuration] = useState(false);
  const [data, setData] = useState(initialData);
  const [attendeeField, setAttendeeField] = useState('');
  const currentUser = useContext(CurrentUserContext);
  if (!currentUser) return <div />;
  const updateData = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const resetForm = () => {
    setData(initialData);
    setCustomDuration(false);
    setAttendeeField('');
  };

  useEffect(
    () => {
      resetForm();
    },
    [conversation]
  );

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

  useEffect(
    () => {
      updateData('end', {
        ...data.end,
        dateTime: data.start.dateTime.clone().add(data.end.duration, 'm'),
      });
    },
    [data.start.dateTime]
  );
  console.log('currentUser', currentUser);
  const titleSuggestions =
    conversation.type === 'client'
      ? [
          conversation.firstName || displayName,
          `${currentUser.givenName} / ${conversation.firstName ||
            displayName} catchup`,
          `${currentUser.givenName} / ${conversation.firstName ||
            displayName} call`,
          `${currentUser.givenName} / ${conversation.firstName ||
            displayName} chat`,
        ]
      : [
          `${conversation.firstName} Assessment Centre - Marketing`,
          `${conversation.firstName} Assessment Centre - Web Development`,
          `${conversation.firstName} Assessment Centre - Business Development`,
        ];

  const addAttendee = email => {
    const emailToAdd = email || attendeeField;
    if (emailToAdd && emailToAdd.length > 0) {
      const newData = clone(data);
      newData.attendees.push(emailToAdd);
      setData(newData);
      setAttendeeField('');
    }
  };

  const removeAttendee = i => {
    const newData = clone(data);
    newData.attendees.splice(i, 1);
    setData(newData);
  };

  const disableAdd =
    data.summary.length === 0 ||
    data.attendees.length === 0 ||
    !data.start.dateTime ||
    !data.end.dateTime;

  const handleAdd = () => {
    const outData = clone(data); // needed for deep clone
    delete outData.end.duration;
    outData.attendees = outData.attendees.map(x =>
      x === conversation.channels.email
        ? { email: x, displayName: conversation.displayName }
        : { email: x }
    );
    outData.start.dateTime = data.start.dateTime.toISOString(true);
    outData.end.dateTime = data.end.dateTime.toISOString(true);

    if (messageData)
      updateEvent(currentUser.UID, conversation.id, messageData.id, outData);
    else addEvent(currentUser.UID, conversation.id, outData);
    resetForm();
    handleClose();
  };

  return (
    <Dialog
      open={showDialog}
      onClose={handleClose}
      classes={{ paper: classes.root }}
    >
      <DialogTitle>{messageData ? 'Update' : 'Add'} Calendar Event</DialogTitle>

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
                  label={x}
                  className={classes.suggestionChip}
                  onClick={() => {
                    updateData('summary', x);
                  }}
                  variant="outlined"
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
          <Grid container alignItems="flex-start">
            <Grid item xs className={classes.attendeeField}>
              <TextField
                label="Add attendees by email"
                placeholder="Press Enter or click the Add button"
                variant="outlined"
                fullWidth
                value={attendeeField}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    addAttendee();
                  }
                }}
                onChange={e => {
                  setAttendeeField(e.target.value);
                }}
                margin="dense"
              />
            </Grid>
            <Grid>
              <IconButton
                variant="contained"
                className={classes.addAttendeeButton}
                onClick={() => {
                  addAttendee(); // needs to be this call or else will pass event object
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
          {data.attendees.map((x, i) => (
            <Chip
              key={`${x}-${i}`}
              label={x}
              className={classes.suggestionChip}
              onDelete={() => {
                removeAttendee(i);
              }}
              variant="outlined"
            />
          ))}
          {conversation.channels.email &&
            data.attendees.indexOf(conversation.channels.email) === -1 && (
              <Grid container alignItems="flex-start">
                <Grid item>
                  <Typography
                    variant="body2"
                    className={classes.suggestedLabel}
                  >
                    Suggested:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Chip
                    label={conversation.channels.email}
                    className={classes.suggestionChip}
                    onClick={() => {
                      addAttendee(conversation.channels.email);
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            )}
        </div>

        <div className={classes.block}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              label="Starting at"
              value={data.start.dateTime}
              onChange={dt => {
                updateData('start', { ...data.start, dateTime: dt });
              }}
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
              <>
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
              </>
            ) : (
              <>
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
              </>
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

          {data.location !== STREET_ADDRESS && (
            <Grid container alignItems="flex-start">
              <Grid item>
                <Typography variant="body2" className={classes.suggestedLabel}>
                  Suggested:
                </Typography>
              </Grid>
              <Grid item xs>
                <Chip
                  label={STREET_ADDRESS}
                  className={classes.suggestionChip}
                  onClick={() => {
                    updateData('location', STREET_ADDRESS);
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          )}
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          color="primary"
          variant="contained"
          disabled={disableAdd}
        >
          {messageData ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(EventDialog);
