import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

import withStyles from '@material-ui/core/styles/withStyles';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';

import CancelIcon from '@material-ui/icons/CancelOutlined';
import DropdownIcon from '@material-ui/icons/KeyboardArrowDown';

import { emphasize } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    paddingLeft: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit * 0.75,
    alignItems: 'center',
  },
  collapseInput: {
    paddingTop: theme.spacing.unit * 0.75,
  },
  chip: {
    margin: `${theme.spacing.unit / 4}px !important`,
    height: theme.spacing.unit * 3.5,
    '& svg': { marginRight: theme.spacing.unit / 4 },
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },

  menuWrapper: { position: 'relative' },
  paper: {
    position: 'absolute',
    zIndex: 9,
    left: 0,
    right: 0,
    '& > div': { borderRadius: theme.shape.borderRadius },
  },

  indicatorButton: {
    marginLeft: theme.spacing.unit / 2,
    padding: 0,
  },
});

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      variant="filled"
      margin="none"
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
        position: 'static',
      }}
      {...props.innerProps}
    >
      {props.data.avatarURL && <Avatar scr={props.data.avatarURL}> </Avatar>}
      {props.children}
    </MenuItem>
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
    <div className={props.selectProps.classes.menuWrapper}>
      <Grow in style={{ transformOrigin: '50% 0' }}>
        <Paper
          className={props.selectProps.classes.paper}
          elevation={2}
          {...props.innerProps}
        >
          {props.children}
        </Paper>
      </Grow>
    </div>
  );
}

function DropdownIndicator(props) {
  return (
    <IconButton className={props.selectProps.classes.indicatorButton}>
      <DropdownIcon />
    </IconButton>
  );
}

function ClearIndicator(props) {
  return (
    <IconButton
      onClick={props.clearValue}
      className={props.selectProps.classes.indicatorButton}
    >
      <CancelIcon />
    </IconButton>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  Option,
  DropdownIndicator,
  ClearIndicator,
  IndicatorSeparator: null,
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
    error,
    helperText,
    inputProps,
  } = props;

  const selectStyles = {
    input: base => ({
      ...base,

      height: '1.1875rem',
      margin: 0,
      padding: 0,

      alignItems: 'center',

      color: theme.palette.text.primary,
      '& input': { font: 'inherit' },
    }),

    valueContainer: base => ({
      ...base,
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
      minHeight: '1.1875rem',
      padding: 0,
    }),
    singleValue: base => ({
      ...base,
      ...theme.typography.body1,
      padding: 0,
      margin: 0,

      // fontSize: 16,
      lineHeight: '1.1875rem',
    }),

    indicatorsContainer: base => ({
      ...base,
      height: '1.1875rem',
      alignSelf: 'auto',
    }),

    noOptionsMessage: base => ({
      ...base,
      color: theme.palette.text.secondary,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      textAlign: 'left',
      userSelect: 'none',
    }),

    placeholder: base => ({
      ...base,
      color: theme.palette.text.secondary,
      userSelect: 'none',
    }),
  };

  const getOptionValue = x => x.label + x.value.toString();

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
              error,
              helperText,
              ...inputProps,
            }}
            value={value}
            isMulti={isMulti}
            getOptionValue={getOptionValue}
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
            error,
            helperText,
            ...inputProps,
          }}
          value={value}
          isMulti={isMulti}
          getOptionValue={getOptionValue}
        />
      </NoSsr>
    </div>
  );
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  changeHandler: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.node,
};

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
