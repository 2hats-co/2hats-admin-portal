import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import DateIcon from '@material-ui/icons/EventOutlined';
import TimeIcon from '@material-ui/icons/AccessTime';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker, TimePicker } from 'material-ui-pickers';
import moment from 'moment';

const styles = theme => ({
    paper: {
        minWidth: 300,
    },
});

function CalendarDialog(props) {
    const { classes, showCalendarDialog, setShowCalendarDialog } = props;

    const [data, setData] = useState({
        summary: '',
        start: {
            dateTime: moment(), // needs to be converted to ISO string on output
            timeZone: 'Australia/Sydney',
        },
        end: {
            dateTime: null, // needs to be converted to ISO string on output
            duration: null, // needs to be removed on output
            timeZone: 'Australia/Sydney',
        },
        attendees: [],
    });

    const updateData = (field, value) => {
        setData({ ...data, [field]: value });
    };
    const handleClose = () => { setShowCalendarDialog(false) };

    return (
        <Dialog
            open={showCalendarDialog}
            onClose={handleClose}
            classes={{ paper: classes.root }}
        >
            <DialogTitle>Add Calendar Event</DialogTitle>

            <DialogContent>
                <TextField
                    label="Title"
                    margin="normal"
                    autoFocus
                    fullWidth
                    value={data.summary}
                    onChange={e => { updateData('summary', e.target.value) }}
                />

                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker
                        label="Starting at"
                        value={data.start.dateTime}
                        onChange={dt => { updateData('start', { ...data.start, dateTime: dt }) }}
                        leftArrowIcon={<LeftIcon />}
                        rightArrowIcon={<RightIcon />}
                        dateRangeIcon={<DateIcon />}
                        timeIcon={<TimeIcon />}
                        format="D/MM/YYYY hh:mm a"
                        showTodayButton
                    />
                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <TimePicker
                        label="Duration (hh:mm)"
                        value={data.end.duration}
                        onChange={dt => { updateData('end', {
                            ...data.end,
                            duration: dt.format(),
                            dateTime: data.start.dateTime.add({ minutes: dt.minute(), hours: dt.hour() })
                        }) }}
                        ampm={false}
                    />
                </MuiPickersUtilsProvider>

                { data.end.dateTime && data.end.dateTime.format('D/MM/YYYY hh:mm a') }

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
    )
}

export default withStyles(styles)(CalendarDialog);
