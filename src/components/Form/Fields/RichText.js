import React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: { margin: `${theme.spacing.unit}px 0` },

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

            //[{ color: [] }, { background: [] }],
            ['link'],
          ],
        }}
      />
      {validator(name)}
    </Grid>
  );
};

export default withStyles(styles)(Text);
