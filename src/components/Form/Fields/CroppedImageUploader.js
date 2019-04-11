import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';

import { uploader } from '../../../utilities/firebaseStorage';
import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  sectionTitle: {
    marginLeft: theme.spacing.unit * 1.5,
  },
  ...STYLES.DROPZONE(theme),
});

const CroppedImageUploader = props => {
  const { label, name, mimeTypes, path, formikProps, classes } = props;
  const { setValues, values, errors, touched } = formikProps;

  const [fileBlob, setFileBlob] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [crop, setCrop] = useState(props.crop);
  const [pixelCrop, setPixelCrop] = useState(null);

  const [showPreview, setShowPreview] = useState(
    values[name] ? !!values[name].url : false
  );

  const [uploadUrl, setUploadUrl] = useState(null);
  useEffect(
    () => {
      if (uploadUrl) {
        setValues({
          ...values,
          [name]: { name: values[name].name || fileBlob.name, url: uploadUrl },
        });
      }
    },
    [uploadUrl]
  );

  const finishCrop = async () => {
    setShowPreview(true);
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      imageRef,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    canvas.toBlob(blob => {
      if (!blob) {
        console.error('Canvas is empty');
        return;
      }
      blob.name = values[name].name;
      const ref = `${path}/${fileBlob.name || new Date()}`;
      uploader(ref, blob, fileBlob.name, (url, fileName) => {
        setUploadUrl(url);
      });
    }, fileBlob.type);
  };

  const dropZone = (
    <Dropzone
      onDrop={files => {
        setValues({
          ...values,
          [name]: { name: files[0].name },
        });
        setFileBlob(files[0]);
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

  const cropper = fileBlob ? (
    <div className={classes.previewWrapper}>
      <ReactCrop
        src={fileBlob.preview}
        crop={crop}
        onImageLoaded={image => setImageRef(image)}
        onChange={(crop, pixelCrop) => {
          setCrop(crop);
          setPixelCrop(pixelCrop);
        }}
        keepSelection
        className={classes.previewImg}
      />
      <Button
        onClick={finishCrop}
        color="primary"
        variant="contained"
        className={classes.changeButton}
        size="small"
      >
        Finish
      </Button>
    </div>
  ) : null;

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

  let content = !!fileBlob ? cropper : dropZone;
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

export default withStyles(styles)(CroppedImageUploader);
