import React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

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
  },

  sectionTitle: {
    marginLeft: theme.spacing.unit * 1.5,

    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest,
    }),
  },

  quillEditor: {
    ...STYLES.QUILL(theme),
  },
});

const Text = props => {
  const { classes, label, name, placeholder, formikProps, validator } = props;
  const { values, errors, touched, setValues } = formikProps;

  return (
    <Grid item xs={12} className={classes.root}>
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
