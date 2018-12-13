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
