import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
        marginRight: theme.spacing.unit,
    },
    customFieldWrapper: {
        width: '100%',
        padding: '0 16px 8px',
        outline: 'none',
        boxSizing: 'border-box',
    },
    customTextField: {
        width: '100%',
    },
    datePicker: {
        outline: 'none',
        width: 140,
        '&:not(:last-of-type)': { marginRight: theme.spacing.unit, },
        '& input': { fontSize: '.875rem', },
    },
});

function Filter(props) {
    const { classes, title, type, values } = props;

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const [addedValues, setAddedValues] = useState([]);

    let renderValues = [...values, ...addedValues];

    return (
    <FormControl className={classes.root}>
        <InputLabel htmlFor={`select-multiple-checkbox-${title}`}>{title}</InputLabel>
        <Select
            multiple
            value={['Pending']}
            onChange={() => {  }}
            input={<Input id={`select-multiple-checkbox-${title}`} />}
            renderValue={() => title}
        >
            { type === 'search' &&
            <div className={classes.customFieldWrapper}>
                <TextField
                    autoFocus
                    label="Add filter…"
                    onKeyPress={e => { if (e.key === 'Enter') setAddedValues([...addedValues, e.target.value]) }}
                    className={classes.customTextField}
                />
            </div>
            }
            { type === 'date' &&
            <div className={classes.customFieldWrapper}>
                <TextField
                    label="From"
                    type="date"
                    InputLabelProps={{ shrink:true }}
                    className={classes.datePicker}
                />
                <TextField
                    label="From"
                    type="date"
                    InputLabelProps={{ shrink:true }}
                    className={classes.datePicker}
                />
            </div>
            }
            {renderValues.map((name, i) => (
                <MenuItem key={i} value={name}>
                    <Checkbox checked={name === 'Pending'} disableRipple />
                    <ListItemText primary={name} />
                </MenuItem>
            ))}
        </Select>
    </FormControl>
    );
}

export default withStyles(styles)(Filter);
