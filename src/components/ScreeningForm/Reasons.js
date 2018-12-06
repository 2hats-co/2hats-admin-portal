import React, { useState } from "react";
import { withStyles } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
    root: {
    },
    textField: {
        margin: '4px 0 8px',
    },
    formGroup: {
        display: 'block',
    },
    formControlLabel: {
        display: 'flex',
    },
})

function Reasons(props) {
    const { classes, reasons, setReasons } = props;

    const [customReason, setCustomReason] = useState('');

    const handleAdd = event => {
        if (event.key === 'Enter') {
            reasons.push({ label: event.target.value, checked: true });
            setReasons(reasons);
        }
    }

    const handleChange = i => {
        reasons[i].checked = !reasons[i].checked;
        setReasons(reasons);
    }

    return <Grid container direction="column" className={classes.root}>
        <Typography variant="subheading">Why?</Typography>
        <TextField
            id="add-reason" placeholder="Add reason…"
            onKeyPress={handleAdd}
            onChange={e => { setCustomReason(e.target.value.substring(0,50)) }}
            className={classes.textField}
            value={customReason}
        />

        <FormGroup row className={classes.formGroup}>
            { reasons.map((x, i) => (
                <FormControlLabel key={i} label={x.label} className={classes.formControlLabel} control={
                    <Checkbox
                        checked={x.checked}
                        value="x.label"
                        onChange={() => { handleChange(i) }}
                    />
                } />
            )) }
        </FormGroup>
    </Grid>;
}

export default withStyles(styles)(Reasons);
