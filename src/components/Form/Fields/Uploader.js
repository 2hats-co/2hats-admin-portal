import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dropzone from 'react-dropzone';
import { blobImageUploader } from '../../../utilities/imageUploader';
import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';
import FileIcon from '@material-ui/icons/AttachmentOutlined';

import FormHelperText from '@material-ui/core/FormHelperText';
import Chip from '@material-ui/core/Chip';

import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  sectionTitle: {
    marginLeft: theme.spacing.unit * 1.5,
  },
  ...STYLES.DROPZONE(theme),
});
const Uploader = props => {
  const { label, name, mimeTypes, path, formikProps, classes } = props;
  const { setValues, values, errors, touched } = formikProps;

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

  return (
    <Grid item xs={12}>
      <Typography
        variant="caption"
        className={classes.sectionTitle}
        color={errors[name] && touched[name] ? 'error' : 'textSecondary'}
      >
        {label}
      </Typography>
      <Dropzone
        onDrop={files => {
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
      {values[name] && (
        <div className={classes.fileChipWrapper}>
          <Chip
            component="a"
            href={values[name]['url']}
            target="_blank"
            rel="noopener noreferrer"
            label={values[name]['name']}
            onDelete={
              values[name].url
                ? e => {
                    e.preventDefault();
                    setValues({
                      ...values,
                      [name]: null,
                    });
                  }
                : null
            }
            className={classes.fileChip}
            icon={
              !values[name].url ? (
                <CircularProgress size={32} />
              ) : (
                <FileIcon className={classes.fileIcon} />
              )
            }
          />
        </div>
      )}
      {touched[name] && errors[name] && (
        <FormHelperText error className={classes.sectionTitle}>
          Required
        </FormHelperText>
      )}
    </Grid>
  );
};
export default withStyles(styles)(Uploader);
