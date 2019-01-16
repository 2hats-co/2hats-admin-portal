import React, { useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { Formik } from 'formik';
import * as yup from 'yup';
import remove from 'ramda/es/remove';
import map from 'ramda/es/map';
import IntegrationReactSelect from '../IntegrationReactSelect';
import FIELDS from '../../constants/forms/fields';
import { blobImageUploader } from '../../utilities/imageUploader';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DatePicker, DateTimePicker } from 'material-ui-pickers';
import { momentFormats } from '../../constants/momentLocales';
import moment from 'moment';
import Dropzone from 'react-dropzone';

const styles = theme => ({
  paperRoot: {
    width: `calc(100% - ${theme.spacing.unit * 4}px)`,
    maxWidth: 600,
    margin: theme.spacing.unit * 2,
    maxHeight: `calc(100% - ${theme.spacing.unit * 4}px)`,
  },

  dialogTitle: {
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 2,
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      height: 1,
      position: 'absolute',
      background: theme.palette.divider,
      bottom: 0,
      left: theme.spacing.unit * 3,
      right: theme.spacing.unit * 3,
    },
  },
  wrapperGrid: { marginTop: theme.spacing.unit * 2 },

  capitalise: {
    '&::first-letter': { textTransform: 'uppercase' },
  },
  textFieldWithAdornment: {
    paddingRight: 0,
  },
  chip: {
    marginTop: theme.spacing.unit,
  },

  sliderSectionWrapper: { margin: `${theme.spacing.unit}px 0` },
  sliderWrapper: {
    marginRight: theme.spacing.unit * 3,
  },

  sectionTitle: {
    marginLeft: theme.spacing.unit,
  },

  dropzone: {
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.divider,
    borderStyle: 'dashed',
    borderWidth: theme.spacing.unit / 2,
    padding: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3,
    textAlign: 'center',
    minHeight: theme.spacing.unit * 12,
    cursor: 'pointer',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  uploadIcon: {
    fontSize: theme.spacing.unit * 8,
    color: theme.palette.text.primary,
  },
  dropzoneButton: { marginTop: theme.spacing.unit / 2 },
  fileChipWrapper: { textAlign: 'center' },
  fileChip: {
    marginTop: theme.spacing.unit / 2,
    cursor: 'pointer',
  },

  dialogActions: {
    position: 'relative',
    '&::before': {
      content: '""',
      display: 'block',
      height: 1,
      position: 'absolute',
      background: theme.palette.divider,
      top: -theme.spacing.unit,
      left: theme.spacing.unit * 2.5,
      right: theme.spacing.unit * 2.5,
    },
  },
});

const reactSelectValueFormatter = x => {
  if (Array.isArray(x)) {
    if (x[0] && x[0].label && x[0].value) return x.map(y => y.value);
    else return x;
  } else if (x.label && x.value) {
    return x.value;
  } else {
    return x;
  }
};
const uploadedFilesFormatter = x => {
  if (x && x.name && x.url) {
    return x.url;
  } else {
    return x;
  }
};
const youtubeUrlFormatter = x => {
  if (typeof x === 'string' && x.includes('youtube.com')) {
    return x.replace('watch?v=', 'embed/').split('&')[0];
  } else {
    return x;
  }
};

/* eslint-disable no-sequences */
const initialValuesReducer = (obj, item) => (
  (obj[item.name] =
    item.value || (item.type === FIELDS.slider ? item.min : '')),
  obj
);
const validationReducer = (obj, item) => (
  item.validation ? (obj[item.name] = item.validation) : null, obj
);

function Form(props) {
  const { classes, action, actions, open, data, formTitle } = props;

  let initialValues = data.reduce(initialValuesReducer, {});
  let hasNewData = true;
  useEffect(
    () => {
      if (data) {
        initialValues = data.reduce(initialValuesReducer, {});
      } else {
        initialValues = {};
      }
      hasNewData = true;
    },
    [data]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        const outputValues = Object.keys(values)
          .filter(k => k.indexOf('-temp') === -1)
          .map(k => Object.assign({}, { [k]: values[k] }))
          .reduce((res, o) => Object.assign(res, o), {});

        const reactSelectFormattedValues = map(
          reactSelectValueFormatter,
          outputValues
        );
        const uploadedFilesFormattedValues = map(
          uploadedFilesFormatter,
          reactSelectFormattedValues
        );
        const youtubeUrlFormatted = map(
          youtubeUrlFormatter,
          uploadedFilesFormattedValues
        );

        actions[action](youtubeUrlFormatted);
      }}
      validationSchema={yup.object().shape(data.reduce(validationReducer, {}))}
    >
      {formikProps => {
        const {
          values,
          handleChange,
          handleSubmit,
          setValues,
          errors,
          touched,
        } = formikProps;
        if (hasNewData) {
          setValues({ ...values, ...initialValues });
          hasNewData = false;
        }
        const handleDeleteFromList = (list, index) => {
          const newList = remove(index, 1, values[list]);
          setValues({ ...values, [list]: newList });
        };
        const handleAddToList = (list, item) => {
          if (!values[item]) return;
          const currentList = Array.isArray(values[list]) ? values[list] : [];
          const newItem = values[item].toLowerCase().trim();

          if (newItem.length > 0 && !currentList.includes(newItem)) {
            const newList = currentList.concat([newItem]);
            setValues({ ...values, [list]: newList, [item]: '' });
          } else {
            setValues({ ...values, [item]: '' });
          }
        };

        const validator = name =>
          errors[name] &&
          touched[name] && (
            <FormHelperText error className={classes.sectionTitle}>
              {typeof errors[name] === 'object'
                ? JSON.stringify(errors[name])
                : errors[name]}
            </FormHelperText>
          );

        return (
          <form onSubmit={handleSubmit}>
            <Dialog
              open={open}
              onClose={actions.close}
              classes={{ paper: classes.paperRoot }}
            >
              <DialogTitle
                className={classes.capitalise}
                classes={{ root: classes.dialogTitle }}
              >
                {action} {formTitle}
              </DialogTitle>

              <DialogContent>
                <Grid
                  container
                  direction="column"
                  spacing={8}
                  className={classes.wrapperGrid}
                >
                  {data.map((x, i) => {
                    switch (x.type) {
                      case FIELDS.textField:
                      case FIELDS.textFieldNumber:
                        return (
                          <Grid item key={x.name}>
                            <TextField
                              label={x.label}
                              id={x.name}
                              type={
                                x.type === FIELDS.textFieldNumber
                                  ? 'number'
                                  : 'text'
                              }
                              onChange={handleChange}
                              variant="filled"
                              margin="dense"
                              InputProps={{ disableUnderline: true }}
                              fullWidth
                              value={values[x.name]}
                              placeholder={x.placeholder}
                              error={!!(errors[x.name] && touched[x.name])}
                              helperText={touched[x.name] && errors[x.name]}
                            />
                          </Grid>
                        );

                      case FIELDS.textFieldPassword:
                        return (
                          <Grid item key={x.name}>
                            <TextField
                              label={x.label}
                              id={x.name}
                              type="password"
                              onChange={handleChange}
                              variant="filled"
                              margin="dense"
                              InputProps={{ disableUnderline: true }}
                              fullWidth
                              value={values[x.name]}
                              placeholder={x.placeholder}
                              error={!!(errors[x.name] && touched[x.name])}
                              helperText={touched[x.name] && errors[x.name]}
                            />
                          </Grid>
                        );

                      case FIELDS.textFieldMultiline:
                        return (
                          <Grid item key={x.name}>
                            <TextField
                              multiline
                              fullWidth
                              rows={5}
                              label={x.label}
                              id={x.name}
                              onChange={handleChange}
                              value={values[x.name]}
                              variant="filled"
                              margin="dense"
                              InputProps={{ disableUnderline: true }}
                              error={!!(errors[x.name] && touched[x.name])}
                              helperText={touched[x.name] && errors[x.name]}
                            />
                          </Grid>
                        );

                      case FIELDS.chipFreeText:
                        return (
                          <Grid item key={x.name}>
                            <TextField
                              id={`${x.name}-temp`}
                              type="text"
                              onChange={handleChange}
                              variant="filled"
                              margin="dense"
                              fullWidth
                              value={values[`${x.name}-temp`] || ''}
                              label={x.label}
                              onKeyPress={e => {
                                if (e.key === 'Enter') {
                                  handleAddToList(x.name, `${x.name}-temp`);
                                }
                              }}
                              error={!!(errors[x.name] && touched[x.name])}
                              helperText={touched[x.name] && errors[x.name]}
                              InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() => {
                                        handleAddToList(
                                          x.name,
                                          `${x.name}-temp`
                                        );
                                      }}
                                    >
                                      <AddIcon fontSize="small" />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                                classes: {
                                  adornedEnd: classes.textFieldWithAdornment,
                                },
                              }}
                            />
                            {values[x.name] &&
                              values[x.name].map((y, i) => (
                                <Chip
                                  key={i}
                                  label={y}
                                  className={classes.chip}
                                  onDelete={() => {
                                    handleDeleteFromList(x.name, i);
                                  }}
                                />
                              ))}
                          </Grid>
                        );

                      case FIELDS.slider:
                        return (
                          <Grid
                            item
                            key={x.name}
                            className={classes.sliderSectionWrapper}
                          >
                            <Typography
                              variant="caption"
                              className={classes.sectionTitle}
                              color={
                                errors[x.name] && touched[x.name]
                                  ? 'error'
                                  : 'textSecondary'
                              }
                            >
                              {x.label}
                            </Typography>
                            <Grid container alignItems="center">
                              <Grid item xs className={classes.sliderWrapper}>
                                <Slider
                                  classes={{ container: classes.slider }}
                                  onChange={(e, v) => {
                                    setValues({
                                      ...values,
                                      [x.name]: v,
                                    });
                                  }}
                                  id={x.name}
                                  value={values[x.name]}
                                  min={x.min}
                                  max={x.max}
                                  step={x.step}
                                />
                              </Grid>
                              <Grid item>
                                <Typography variant="subtitle2">
                                  {x.step < 0.999
                                    ? values[x.name].toFixed(1)
                                    : values[x.name]}{' '}
                                  {x.units}
                                </Typography>
                              </Grid>
                            </Grid>
                            {validator(x.name)}
                          </Grid>
                        );

                      case FIELDS.autocomplete:
                      case FIELDS.autocompleteMulti:
                      case FIELDS.autocompleteFreeText:
                      case FIELDS.autocompleteMultiFreeText:
                        return (
                          <Grid item key={x.name}>
                            <IntegrationReactSelect
                              placeholder={
                                x.placeholder || x.type.indexOf('MULTI') > -1
                                  ? 'Select multiple items…'
                                  : 'Select item…'
                              }
                              suggestions={x.suggestions}
                              changeHandler={data => {
                                setValues({
                                  ...values,
                                  [x.name]: data,
                                });
                              }}
                              value={values[x.name]}
                              label={x.label}
                              isMulti={x.type.indexOf('MULTI') > -1}
                              creatable={x.type.indexOf('FREE_TEXT') > -1}
                              error={errors[x.name] && touched[x.name]}
                              helperText={touched[x.name] && errors[x.name]}
                            />
                          </Grid>
                        );

                      case FIELDS.date:
                        return (
                          <Grid item key={x.name}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                              <DatePicker
                                label={x.label}
                                value={
                                  values[x.name]
                                    ? moment(values[x.name], momentFormats.date)
                                    : null
                                }
                                onChange={dt => {
                                  setValues({
                                    ...values,
                                    [x.name]: dt.format(momentFormats.date),
                                  });
                                }}
                                format={momentFormats.date}
                                showTodayButton
                                className={classes.dateTimePicker}
                                variant="filled"
                                margin="dense"
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                                error={!!(errors[x.name] && touched[x.name])}
                              />
                            </MuiPickersUtilsProvider>
                            {validator(x.name)}
                          </Grid>
                        );

                      case FIELDS.dateTime:
                        return (
                          <Grid item key={x.name}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                              <DateTimePicker
                                label={x.label}
                                value={
                                  values[x.name]
                                    ? moment(
                                        values[x.name],
                                        momentFormats.dateTime
                                      )
                                    : null
                                }
                                onChange={dt => {
                                  setValues({
                                    ...values,
                                    [x.name]: dt.format(momentFormats.dateTime),
                                  });
                                }}
                                format={momentFormats.dateTime}
                                showTodayButton
                                className={classes.dateTimePicker}
                                variant="filled"
                                margin="dense"
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                                error={!!(errors[x.name] && touched[x.name])}
                              />
                            </MuiPickersUtilsProvider>
                            {validator(x.name)}
                          </Grid>
                        );

                      case FIELDS.dropzone:
                        return (
                          <Grid item key={x.name}>
                            <Typography
                              variant="caption"
                              className={classes.sectionTitle}
                              color={
                                errors[x.name] && touched[x.name]
                                  ? 'error'
                                  : 'textSecondary'
                              }
                            >
                              {x.label}
                            </Typography>
                            <Dropzone
                              onDrop={files => {
                                setValues({
                                  ...values,
                                  [x.name]: { name: files[0].name },
                                });
                                blobImageUploader(
                                  files[0],
                                  x.path,
                                  (url, name) => {
                                    setValues({
                                      ...values,
                                      [x.name]: { name, url },
                                    });
                                  }
                                );
                              }}
                              accept={x.mimeTypes || ''}
                              className={classes.dropzone}
                            >
                              <CloudUploadIcon className={classes.uploadIcon} />
                              <Typography variant="body1">
                                Drag a file here or
                              </Typography>
                              <Button
                                color="primary"
                                variant="outlined"
                                className={classes.dropzoneButton}
                                size="small"
                              >
                                Click to upload a {x.label.toLowerCase()}
                              </Button>
                            </Dropzone>
                            {values[x.name] && (
                              <div className={classes.fileChipWrapper}>
                                <Chip
                                  component="a"
                                  href={values[x.name]['url']}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  label={values[x.name]['name']}
                                  onDelete={() =>
                                    setValues({
                                      ...values,
                                      [x.name]: null,
                                    })
                                  }
                                  className={classes.fileChip}
                                  icon={
                                    !values[x.name].url ? (
                                      <CircularProgress size={32} />
                                    ) : null
                                  }
                                />
                              </div>
                            )}
                            {validator(x.name)}
                          </Grid>
                        );

                      default:
                        return null;
                    }
                  })}
                </Grid>
              </DialogContent>

              <DialogActions classes={{ root: classes.dialogActions }}>
                <Button onClick={actions.close} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                  type="submit"
                  classes={{ label: classes.capitalise }}
                >
                  {action[0].toUpperCase()}
                  {action.substr(1)}
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
}

export default withStyles(styles)(Form);
