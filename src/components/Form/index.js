import React, { useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import Friction from '../Friction';
import { Formik } from 'formik';
import * as yup from 'yup';
import remove from 'ramda/es/remove';
import map from 'ramda/es/map';

import FIELDS from '../../constants/forms/fields';

import Text from './Fields/Text';
import RichText from './Fields/RichText';
import RichTextMulti from './Fields/RichTextMulti';
import TextItems from './Fields/TextItems';
import Slider from './Fields/Slider';
import DateTime from './Fields/DateTime';
import Uploader from './Fields/Uploader';
import Select from './Fields/Select';
import Checkbox from './Fields/Checkbox';
import RadioButtons from './Fields/RadioButtons';
import DocumentSelect from './Fields/DocumentSelect';

export const styles = theme => ({
  mobile: {},
  paperRoot: {
    width: `calc(100% - ${theme.spacing.unit * 4}px)`,
    maxWidth: 600,
    margin: theme.spacing.unit * 2,
    maxHeight: `calc(100% - ${theme.spacing.unit * 4}px)`,
  },

  dialogTitle: {
    paddingTop: theme.spacing.unit * 2.5,

    '& > *': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },

    '$mobile &': {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2.5}px`,
    },
  },

  deleteButton: { marginRight: theme.spacing.unit },

  wrapperGrid: {
    overflowX: 'hidden',
    paddingBottom: theme.spacing.unit,
  },

  dialogContent: {
    paddingBottom: 0,
    position: 'relative',
    zIndex: 1,

    background: `${theme.palette.background.paper} no-repeat`,
    backgroundImage:
      theme.palette.type === 'dark'
        ? 'linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,0)), linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,0))'
        : 'linear-gradient(to bottom, rgba(0,0,0,.1), rgba(0,0,0,0)), linear-gradient(to top, rgba(0,0,0,.1), rgba(0,0,0,0))',
    backgroundPosition: `-${theme.spacing.unit * 3}px 0, -${theme.spacing.unit *
      3}px 100%`,
    backgroundSize: `calc(100% + ${theme.spacing.unit * 3}px) ${theme.spacing
      .unit * 2}px`,

    '&::before, &::after': {
      content: '""',
      position: 'relative',
      zIndex: -1,
      display: 'block',
      height: theme.spacing.unit * 4,
      margin: `0 -${theme.spacing.unit * 3}px -${theme.spacing.unit * 4}px`,
      background: `linear-gradient(to bottom, ${
        theme.palette.background.paper
      }, ${theme.palette.background.paper} 30%, rgba(255, 255, 255, 0))`,
    },

    '&::after': {
      marginTop: -theme.spacing.unit * 4,
      marginBottom: 0,
      background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), ${
        theme.palette.background.paper
      } 70%, ${theme.palette.background.paper})`,
    },

    '$mobile &': {
      padding: `0 ${theme.spacing.unit * 2}px`,

      '&::before, &::after': {
        marginLeft: -theme.spacing.unit * 2,
        marginRight: -theme.spacing.unit * 2,
      },
    },
  },

  capitalise: {
    '&::first-letter': { textTransform: 'uppercase' },
  },

  sectionTitle: {
    marginLeft: theme.spacing.unit * 1.5,
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
// const youtubeUrlFormatter = x => {
//   if (typeof x === 'string' && x.includes('youtube.com')) {
//     return x.replace('watch?v=', 'embed/').split('&')[0];
//   } else {
//     return x;
//   }
// };

/* eslint-disable no-sequences */
const initialValuesReducer = (obj, item) => (
  (obj[item.name] =
    item.value ||
    (item.type === FIELDS.slider && item.min) ||
    (item.type === FIELDS.checkbox ? false : '')) || '',
  obj
);
const validationReducer = (obj, item) => (
  item.validation ? (obj[item.name] = item.validation) : null, obj
);

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function Form(props) {
  const {
    classes,
    theme,
    action,
    actions,
    open,
    data,
    formTitle,
    justForm,
    formHeader,
    formFooter,
    handleDelete,
  } = props;

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

  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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
        /* const youtubeUrlFormatted = map(
          youtubeUrlFormatter,
          reactSelectFormattedValues
        ); */

        actions[action](reactSelectFormattedValues);
      }}
      validationSchema={yup.object().shape(data.reduce(validationReducer, {}))}
    >
      {formikProps => {
        const {
          values,
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
          const newItem = values[item].trim();

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
        const Fields = (
          <Grid
            container
            direction="row"
            spacing={16}
            className={classes.wrapperGrid}
            alignContent="flex-start"
          >
            {data.map(x => {
              if (
                typeof x.displayCondition === 'function' &&
                !x.displayCondition(values)
              )
                return null;

              switch (x.type) {
                case FIELDS.textField:
                case FIELDS.textFieldNumber:
                case FIELDS.textFieldPassword:
                case FIELDS.textFieldMultiline:
                  return (
                    <Text
                      key={x.name}
                      type={x.type}
                      formikProps={formikProps}
                      label={x.label}
                      name={x.name}
                      placeholder={x.placeholder}
                      width={x.width}
                      autoFocus={x.autoFocus}
                    />
                  );

                case FIELDS.richText:
                  return (
                    <RichText
                      key={x.name}
                      formikProps={formikProps}
                      label={x.label}
                      name={x.name}
                      placeholder={x.placeholder}
                      validator={validator}
                    />
                  );

                case FIELDS.richTextMulti:
                  return (
                    <RichTextMulti
                      key={x.name}
                      formikProps={formikProps}
                      label={x.label}
                      name={x.name}
                      placeholder={x.placeholder}
                      validator={validator}
                    />
                  );

                case FIELDS.chipFreeText:
                  return (
                    <TextItems
                      key={x.name}
                      label={x.label}
                      name={x.name}
                      formikProps={formikProps}
                      handleAddToList={handleAddToList}
                      handleDeleteFromList={handleDeleteFromList}
                      placeholder={x.placeholder}
                    />
                  );

                case FIELDS.slider:
                  return (
                    <Slider
                      key={x.name}
                      name={x.name}
                      label={x.label}
                      calcValueLabel={x.calcValueLabel}
                      sliderThumbLabel={x.sliderThumbLabel}
                      min={x.min}
                      max={x.max}
                      step={x.step}
                      units={x.units}
                      formikProps={formikProps}
                      validator={validator}
                    />
                  );

                case FIELDS.autocomplete:
                case FIELDS.autocompleteMulti:
                case FIELDS.autocompleteFreeText:
                case FIELDS.autocompleteMultiFreeText:
                  return (
                    <Select
                      key={x.name}
                      placeholder={x.placeholder}
                      suggestions={x.suggestions}
                      name={x.name}
                      label={x.label}
                      type={x.type}
                      formikProps={formikProps}
                      width={x.width}
                    />
                  );
                case FIELDS.docAutocomplete:
                case FIELDS.docAutocompleteMulti:
                  return (
                    <DocumentSelect
                      collection={x.collection}
                      filters={x.filters}
                      mappings={x.mappings}
                      key={x.name}
                      placeholder={x.placeholder}
                      name={x.name}
                      label={x.label}
                      type={x.type}
                      formikProps={formikProps}
                      width={x.width}
                    />
                  );

                case FIELDS.date:
                case FIELDS.dateTime:
                  return (
                    <DateTime
                      key={x.name}
                      name={x.name}
                      label={x.label}
                      type={x.type}
                      formikProps={formikProps}
                      validator={validator}
                      width={x.width}
                    />
                  );

                case FIELDS.dropzone:
                  return (
                    <Uploader
                      key={x.name}
                      formikProps={formikProps}
                      thisBind={this}
                      label={x.label}
                      name={x.name}
                      path={x.path}
                      mimeTypes={x.mimeTypes}
                      validator={validator}
                      aspectRatio={x.aspectRatio}
                    />
                  );

                case FIELDS.checkbox:
                  return (
                    <Checkbox
                      key={x.name}
                      formikProps={formikProps}
                      label={x.label}
                      name={x.name}
                      validator={validator}
                      width={x.width}
                    />
                  );

                case FIELDS.radio:
                  return (
                    <RadioButtons
                      key={x.name}
                      formikProps={formikProps}
                      label={x.label}
                      name={x.name}
                      validator={validator}
                      options={x.options}
                      horiz={x.horiz}
                    />
                  );

                default:
                  return null;
              }
            })}
          </Grid>
        );
        const PrimaryButton = (
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            type="submit"
            id="submit"
            classes={{ label: classes.capitalise }}
          >
            {Object.keys(errors).length > 0 && 'Can’t '}
            {action[0].toUpperCase()}
            {action.substr(1)}
            {Object.keys(errors).length > 0 && ' – Fix Errors'}
          </Button>
        );
        return (
          <form onSubmit={handleSubmit}>
            {justForm ? (
              <Grid
                container
                direction="column"
                wrap="nowrap"
                className={classes.justFormWrapper}
              >
                <Grid item>{formHeader}</Grid>
                <Grid item xs>
                  {Fields}
                </Grid>
                <Grid item>
                  {typeof formFooter === 'function'
                    ? formFooter(values)
                    : formFooter}
                </Grid>
                <Grid item>{PrimaryButton}</Grid>
              </Grid>
            ) : (
              <Dialog
                open={open}
                //onClose={actions.close}
                classes={{
                  paper: isMobile ? classes.mobilePaperRoot : classes.paperRoot,
                }}
                fullScreen={isMobile}
                className={isMobile ? classes.mobile : ''}
                TransitionComponent={Transition}
              >
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs>
                    <DialogTitle
                      className={classes.capitalise}
                      classes={{ root: classes.dialogTitle }}
                    >
                      {action} {formTitle}
                    </DialogTitle>
                  </Grid>
                  {handleDelete && (
                    <Grid item>
                      <Friction
                        dryCommand="DELETE ME"
                        message={{
                          title: `Are you sure you want to delete this?`,
                          body: 'You won’t be able to recover it',
                        }}
                      >
                        <IconButton
                          onClick={handleDelete}
                          className={classes.deleteButton}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Friction>
                    </Grid>
                  )}
                </Grid>

                <DialogContent classes={{ root: classes.dialogContent }}>
                  {formHeader}
                  {Fields}
                  {typeof formFooter === 'function'
                    ? formFooter(values)
                    : formFooter}
                </DialogContent>

                <DialogActions>
                  <Button onClick={actions.close} color="primary" id="cancel">
                    Cancel
                  </Button>
                  {PrimaryButton}
                </DialogActions>
              </Dialog>
            )}
          </form>
        );
      }}
    </Formik>
  );
}

export default withStyles(styles, { withTheme: true })(Form);
