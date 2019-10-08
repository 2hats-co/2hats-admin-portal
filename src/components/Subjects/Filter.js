import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    margin: 0,
    marginLeft: theme.spacing(1),
    minWidth: 200,
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
    '&:not(:last-of-type)': { marginRight: theme.spacing(1) },
    '& input': { fontSize: '.875rem' },
  },
});

function Filter(props) {
  const { classes, title, type, values } = props;

  // const [searchTerm, setSearchTerm] = useState('');
  // const [selectedOption, setSelectedOption] = useState('');

  const [addedValues, setAddedValues] = useState([]);

  let renderValues = [...values, ...addedValues];

  return (
    <TextField
      select
      label={title}
      onChange={() => {}}
      variant="filled"
      margin="dense"
      className={classes.root}
      InputProps={{
        disableUnderline: true,
      }}
    >
      {type === 'search' && (
        <div className={classes.customFieldWrapper}>
          <TextField
            autoFocus
            label="Add filter…"
            onKeyPress={e => {
              if (e.key === 'Enter')
                setAddedValues([...addedValues, e.target.value]);
            }}
            className={classes.customTextField}
          />
        </div>
      )}
      {type === 'date' && (
        <div className={classes.customFieldWrapper}>
          <TextField
            label="From"
            type="date"
            InputLabelProps={{ shrink: true }}
            className={classes.datePicker}
          />
          <TextField
            label="From"
            type="date"
            InputLabelProps={{ shrink: true }}
            className={classes.datePicker}
          />
        </div>
      )}
      {renderValues.map((name, i) => (
        <MenuItem key={i} value={name}>
          <Checkbox checked={name === 'Pending'} disableRipple />
          <ListItemText primary={name} />
        </MenuItem>
      ))}
    </TextField>
  );
}

export default withStyles(styles)(Filter);
