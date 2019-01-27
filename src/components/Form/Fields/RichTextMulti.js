import React, { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';

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

  item: {
    paddingLeft: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing.unit,
    width: `calc(100% - ${theme.spacing.unit * 2}px)`,
  },
  number: {
    marginRight: theme.spacing.unit,
    fontWeight: 'bold',
  },
  renderedHtml: {
    fontSize: '.875rem',
    '& p': { margin: 0 },
  },
});

const Text = props => {
  const { classes, label, name, placeholder, formikProps, validator } = props;
  const { values, errors, touched, setValues } = formikProps;

  const [textboxVal, setTextboxVal] = useState('');

  const handleAdd = () => {
    if (textboxVal.length > 0) {
      const newValues = values[name];
      newValues.push(textboxVal);
      setValues({ ...values, [name]: newValues });
      setTextboxVal('');
    }
  };
  const handleDelete = i => () => {
    const newValues = values[name];
    newValues.splice(i, 1);
    setValues({ ...values, [name]: newValues });
  };

  const textbox = (
    <>
      <ReactQuill
        placeholder={placeholder}
        value={textboxVal}
        onChange={val => {
          setTextboxVal(val);
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
      <Button color="primary" onClick={handleAdd}>
        <AddIcon />
        Add item
      </Button>
    </>
  );

  const items =
    Array.isArray(values[name]) &&
    values[name].map((x, i) => (
      <Grid container key={i} className={classes.item} alignItems="baseline">
        <Grid item>
          <Typography
            variant="body2"
            className={classes.number}
            color="primary"
          >
            {i + 1}
          </Typography>
        </Grid>
        <Grid item xs>
          <div
            className={classes.renderedHtml}
            dangerouslySetInnerHTML={{ __html: x }}
          />
        </Grid>
        <Grid item>
          <IconButton onClick={handleDelete(i)}>
            <RemoveIcon />
          </IconButton>
        </Grid>
      </Grid>
    ));

  return (
    <Grid item className={classes.root}>
      <Typography
        variant="caption"
        className={classes.sectionTitle}
        color={errors[name] && touched[name] ? 'error' : 'textSecondary'}
      >
        {label}
      </Typography>
      {textbox}
      {items}
      {validator(name)}
    </Grid>
  );
};

export default withStyles(styles)(Text);
