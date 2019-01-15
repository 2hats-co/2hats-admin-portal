import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import DropdownIcon from '@material-ui/icons/KeyboardArrowDown';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    // padding: 0,
    paddingLeft: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit * 0.75,
  },
  collapseInput: {
    paddingTop: theme.spacing.unit * 0.75,
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
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    userSelect: 'none',
    fontSize: 16,
    position: 'absolute',
    left: theme.spacing.unit * 1.5,
  },
  paper: {
    position: 'absolute',
    zIndex: 9,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    top: theme.spacing.unit * 5,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  dropdownIndicator: {
    opacity: 0.33,
    padding: 0,
    paddingLeft: theme.spacing.unit / 2,
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
      variant="filled"
      margin="dense"
      InputProps={{
        disableUnderline: true,
        inputComponent,
        inputProps: {
          className: classNames(
            props.selectProps.classes.input,
            !props.selectProps.textFieldProps.label &&
              props.selectProps.classes.collapseInput
          ),
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
      {props.data.avatarURL && <Avatar scr={props.data.avatarURL}> </Avatar>}
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
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
      variant="outlined"
    />
  );
}

function Menu(props) {
  return (
    <Paper className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

function DropdownIndicator(props) {
  return (
    <DropdownIcon className={props.selectProps.classes.dropdownIndicator} />
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
  DropdownIndicator,
};

function IntegrationReactSelect(props) {
  const {
    classes,
    theme,
    placeholder,
    label,
    autoFocus,
    changeHandler,
    suggestions,
    value,
    //intialValue,
    isMulti,
    creatable,
  } = props;

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  if (creatable)
    return (
      <div className={classes.root}>
        <NoSsr>
          <CreatableSelect
            classes={classes}
            styles={selectStyles}
            options={suggestions}
            components={components}
            onChange={changeHandler}
            placeholder={placeholder}
            textFieldProps={{
              label,
              InputLabelProps: { shrink: true },
              autoFocus,
            }}
            value={value}
            isMulti={isMulti}
          />
        </NoSsr>
      </div>
    );

  return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          classes={classes}
          styles={selectStyles}
          options={suggestions}
          components={components}
          onChange={changeHandler}
          placeholder={placeholder}
          textFieldProps={{
            label,
            InputLabelProps: { shrink: true },
            autoFocus,
          }}
          value={value}
          isMulti={isMulti}
        />
      </NoSsr>
    </div>
  );
}

/*
<div className={classes.divider} />
          <Select
            classes={classes}
            styles={selectStyles}
            textFieldProps={{
              label: 'Label',
              InputLabelProps: {
                shrink: true,
              },
            }}
            options={suggestions}
            components={components}
            value={this.state.multi}
            onChange={this.handleChange('multi')}
            placeholder="Select multiple countries"
            isMulti
          />
          */

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  changeHandler: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
};

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
