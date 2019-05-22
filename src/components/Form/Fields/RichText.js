import React, { useRef, useState, useEffect } from 'react';

import ReactQuill from 'react-quill';
import Delta from 'quill-delta';
import 'react-quill/dist/quill.snow.css';
import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { asyncUploader } from '../../../utilities/firebaseStorage';
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

const imageHandler = quillRef => () => {
  const now = new Date();

  const quill = quillRef.current.getEditor();
  let fileInput = document.body.querySelector('input.ql-image[type=file]');
  if (fileInput == null) {
    fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute(
      'accept',
      'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
    );
    fileInput.classList.add('ql-image');
    fileInput.addEventListener('change', async () => {
      if (fileInput.files != null && fileInput.files[0] != null) {
        const ref = `quill-images/${now.getTime()}/${fileInput.files[0].name}`;
        const downloadUrl = await asyncUploader(ref, fileInput.files[0]);
        let range = quill.getSelection(true);
        quill.updateContents(
          new Delta()
            .retain(range.index)
            .delete(range.length)
            .insert({ image: downloadUrl }),
          'user'
        );

        fileInput.value = '';
        document.body.removeChild(fileInput);
      }
    });
    document.body.appendChild(fileInput);
  }
  fileInput.click();
};

const RichText = props => {
  const { classes, label, name, placeholder, formikProps, validator } = props;
  const { values, errors, touched, setValues } = formikProps;
  const [
    isUploading,
    //setIsUploading
  ] = useState(false);
  const quillRef = useRef(null);

  useEffect(
    () => {
      if (quillRef.current)
        quillRef.current
          .getEditor()
          .getModule('toolbar')
          .addHandler('image', imageHandler(quillRef));
    },
    [quillRef]
  );

  return (
    <Grid item xs={12} className={classes.root}>
      <Typography
        variant="caption"
        className={classes.sectionTitle}
        color={errors[name] && touched[name] ? 'error' : 'textSecondary'}
      >
        {label}{' '}
        {isUploading ? '    (please wait while we upload your image)' : ''}
      </Typography>
      <ReactQuill
        placeholder={placeholder}
        value={values[name]}
        ref={quillRef}
        onChange={val => {
          // const dataURLregEx = /"data:.*?"/;
          // let matches = val.match(dataURLregEx);
          // delete matches.index;
          // delete matches.input;
          // delete matches.groups;
          // console.log(matches);
          setValues({ ...values, [name]: val });
        }}
        theme="snow"
        className={classes.quillEditor}
        preserveWhiteSpace
        modules={{
          toolbar: {
            container: [
              ['bold', 'italic', 'underline'],
              [{ header: [1, 2, 3, 4, false] }],

              [{ list: 'bullet' }, { list: 'ordered' }],
              [{ indent: '-1' }, { indent: '+1' }],
              ['blockquote', 'code-block', 'image', 'video'],
              ['link'],
            ],
          },
          clipboard: {
            matchVisual: false,
          },
        }}
      />
      {validator(name)}
    </Grid>
  );
};

export default withStyles(styles)(RichText);
