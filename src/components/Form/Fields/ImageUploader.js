import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';

import { blobImageUploader } from '../../../utilities/imageUploader';
import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  sectionTitle: {
    marginLeft: theme.spacing(1.5),
  },
  ...STYLES.DROPZONE(theme),
});

const ImageUploader = props => {
  const { label, name, mimeTypes, path, formikProps, classes } = props;
  const { setValues, values, errors, touched } = formikProps;

  const [showPreview, setShowPreview] = useState(
    values[name] ? !!values[name].url : false
  );

  const [uploadUrl, setUploadUrl] = useState(null);
  useEffect(
    () => {
      if (uploadUrl) {
        setValues({
          ...values,
          [name]: { name: values[name].name, url: uploadUrl },
        });
      }
    },
    [uploadUrl]
  );

  const dropZone = (
    <Dropzone
      onDrop={files => {
        setShowPreview(true);
        setValues({
          ...values,
          [name]: { name: files[0].name },
        });
        blobImageUploader(files[0], path, (url, fileName) => {
          setUploadUrl(url);
        });
      }}
      accept={mimeTypes || ''}
      className={classes.dropzone}
    >
      <CloudUploadIcon className={classes.uploadIcon} />
      <Typography variant="body1">Drag a file here or</Typography>
      <Button
        color="primary"
        variant="outlined"
        className={classes.dropzoneButton}
        size="small"
      >
        Click to upload a {label.toLowerCase()}
      </Button>
    </Dropzone>
  );

  const preview = (
    <div className={classes.previewWrapper}>
      <a
        href={values[name] && values[name].url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={values[name] && values[name].url}
          className={classes.previewImg}
          alt="If you read this text something’s gone wrong"
        />
      </a>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          setValues({
            ...values,
            [name]: null,
          });
          setShowPreview(false);
        }}
        className={classes.changeButton}
        size="small"
      >
        Change {label.toLowerCase()}
      </Button>
    </div>
  );

  const loading = (
    <div className={classes.loadingWrapper}>
      <LinearProgress />
    </div>
  );

  let content = dropZone;
  if (showPreview) {
    if (values[name] && values[name].url) content = preview;
    else content = loading;
  }

  return (
    <Grid item xs={12}>
      <Typography
        variant="caption"
        className={classes.sectionTitle}
        color={errors[name] && touched[name] ? 'error' : 'textSecondary'}
      >
        {label}
      </Typography>

      {content}

      {touched[name] && errors[name] && (
        <FormHelperText error className={classes.sectionTitle}>
          Required
        </FormHelperText>
      )}
    </Grid>
  );
};
export default withStyles(styles)(ImageUploader);
