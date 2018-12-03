import React, { useState } from 'react';

import Select from 'react-select';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

import CancelIcon from '@material-ui/icons/Cancel';

const styles = theme => ({
    root: {
      flexGrow: 1,
      height: 250,
    },
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
  });
  
  function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }
  
  function Control(props) {
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  }
  
  function Option(props) {
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
  
  function Placeholder(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function SingleValue(props) {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }
  
  function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  
  function MultiValue(props) {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={props.selectProps.classes.chip}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  }
  
  function Menu(props) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }
  
  const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
  };

function AutoSelect(props) {
    const { classes, theme, label, values } = props;

    const [value, setValue] = useState(null);

    const selectStyles = {
        input: base => ({
          ...base,
          color: theme.palette.text.primary,
          '& input': {
            font: 'inherit',
          },
        }),
    };

    return (
        <Select
            classes={classes}
            options={values}
            components={components}
            textFieldProps={{
                label,
                InputLabelProps: { shrink: true }
            }}
            value={value}
            onChange={(val) => { setValue(val) }}
            placeholder="Select companies…"
            isMulti
        />
    );
}

export default withStyles(styles, { withTheme: true })(AutoSelect);
