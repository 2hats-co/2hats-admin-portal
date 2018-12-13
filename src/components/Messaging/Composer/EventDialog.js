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

import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import DateIcon from '@material-ui/icons/EventOutlined';
import TimeIcon from '@material-ui/icons/AccessTime';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from 'material-ui-pickers';
import moment from 'moment';

const styles = theme => ({
    root: {
        minWidth: 480,
    },
    block: {
        '& + &': { marginTop: theme.spacing.unit * 4 },
    },
    dateTimePicker: {
        marginRight: theme.spacing.unit,
    },
    sliderWrapper: {
        marginRight: theme.spacing.unit * 3,
    },
    slider: {

    },
});

function EventDialog(props) {
    const { classes, showDialog, setShowDialog } = props;

    const [data, setData] = useState({
        summary: '',
        location: '66-68 Devonshire St, Surry Hills NSW 2010',
        start: {
            dateTime: moment(), // needs to be converted to ISO string on output
            timeZone: 'Australia/Sydney',
        },
        end: {
            dateTime: moment().add(5, 'm'), // needs to be converted to ISO string on output
            duration: 5, // needs to be removed on output
            timeZone: 'Australia/Sydney',
        },
        attendees: [],
    });

    const updateData = (field, value) => {
        setData({ ...data, [field]: value });
    };
    const handleClose = () => { setShowDialog(false) };

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
                        autoFocus
                        fullWidth
                        value={data.summary}
                        onChange={e => { updateData('summary', e.target.value) }}
                        className={classes.titleField}
                    />
                </div>

                <div className={classes.block}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DateTimePicker
                            label="Starting at"
                            value={data.start.dateTime}
                            onChange={dt => { updateData('start', { ...data.start, dateTime: dt, }) }}
                            leftArrowIcon={<LeftIcon />}
                            rightArrowIcon={<RightIcon />}
                            dateRangeIcon={<DateIcon />}
                            timeIcon={<TimeIcon />}
                            format="D/MM/YYYY hh:mm a"
                            showTodayButton
                            className={classes.dateTimePicker}
                        />
                    </MuiPickersUtilsProvider>
                </div>

                <div className={classes.block}>
                    <Typography variant="caption">Duration</Typography>
                    <Grid container alignItems="center">
                        <Grid item xs className={classes.sliderWrapper}>
                            <Slider
                                classes={{ container: classes.slider }}
                                onChange={(e, val) => { updateData('end', { ...data.end, duration: val, dateTime: data.start.dateTime.clone().add(val, 'm') }) }}
                                value={data.end.duration}
                                min={5}
                                max={180}
                                step={5}
                            />
                        </Grid>
                        <Grid item><Typography variant="body1">{data.end.duration} min</Typography></Grid>
                    </Grid>
                    <Typography variant="body1">Ends at { data.end.dateTime && data.end.dateTime.format('D/MM/YYYY hh:mm a') }</Typography>
                </div>

                <div className={classes.block}>
                    <TextField
                        label="Location"
                        autoFocus
                        fullWidth
                        value={data.location}
                        onChange={e => { updateData('location', e.target.value) }}
                        className={classes.locationField}
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
    )
}

export default withStyles(styles)(EventDialog);
