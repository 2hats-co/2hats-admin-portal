import React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit}px 0`,
    '&:focus-within $sectionTitle': {
      color:
        theme.palette.type === 'dark'
          ? theme.palette.primary.darkText
          : theme.palette.primary.main,
    },
    '&:focus-within .ql-toolbar.ql-snow, &:focus-within .ql-container.ql-snow': {
      borderColor: theme.palette.primary.main,
    },
  },

  sectionTitle: { marginLeft: theme.spacing.unit * 1.5 },

  quillEditor: {
    minHeight: 100,

    '& .ql-toolbar': {
      borderRadius: `${theme.shape.borderRadius}px ${
        theme.shape.borderRadius
      }px 0 0`,
    },
    '& .ql-container': {
      borderRadius: `0 0 ${theme.shape.borderRadius}px ${
        theme.shape.borderRadius
      }px`,
    },
    '& .ql-editor': {
      minHeight: 100,
      fontFamily: theme.typography.fontFamily,
      fontSize: '.875rem',
      color: theme.palette.text.primary,
      '&.ql-blank::before': {
        fontStyle: 'normal',
        color: theme.palette.text.disabled,
      },
    },

    '& .ql-snow .ql-stroke, & button:hover .ql-stroke': {
      stroke: theme.palette.text.primary,
    },
    '& .ql-active .ql-stroke': {
      stroke: `${theme.palette.primary.main} !important`,
    },
    '& .ql-snow .ql-fill': {
      fill: theme.palette.text.primary,
    },
    '& .ql-active .ql-fill, & button:hover .ql-fill': {
      fill: `${theme.palette.primary.main} !important`,
    },

    '& .ql-snow.ql-toolbar button': { borderRadius: theme.shape.borderRadius },
    '& .ql-snow.ql-toolbar button:hover': {
      backgroundColor: theme.palette.primary.light,
      '& .ql-stroke': {
        stroke: `${theme.palette.primary.darkText} !important`,
      },
      '& .ql-fill': {
        fill: `${theme.palette.primary.darkText} !important`,
      },
    },
  },
});

const Text = props => {
  const { classes, label, name, placeholder, formikProps, validator } = props;
  const { values, errors, touched, setValues } = formikProps;

  return (
    <Grid item className={classes.root}>
      <Typography
        variant="caption"
        className={classes.sectionTitle}
        color={errors[name] && touched[name] ? 'error' : 'textSecondary'}
      >
        {label}
      </Typography>
      <ReactQuill
        placeholder={placeholder}
        value={values[name]}
        onChange={val => {
          setValues({ ...values, [name]: val });
        }}
        theme="snow"
        className={classes.quillEditor}
        preserveWhiteSpace
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline'],

            [{ header: 1 }, { header: 2 }],
            [{ list: 'bullet' }, { list: 'ordered' }],
            [{ indent: '-1' }, { indent: '+1' }],

            ['link'],
          ],
        }}
      />
      {validator(name)}
    </Grid>
  );
};

export default withStyles(styles)(Text);
