import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dropzone from 'react-dropzone';
import { blobImageUploader } from '../../../utilities/imageUploader';
import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
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
    color: theme.palette.text.secondary,
  },
  dropzoneButton: { marginTop: theme.spacing.unit / 2 },
  fileChipWrapper: { textAlign: 'center' },
  fileChip: {
    marginTop: theme.spacing.unit / 2,
    cursor: 'pointer',
  },
});
const Uploader = props => {
  const {
    label,
    name,
    mimeTypes,
    path,
    validator,
    formikProps,
    classes,
  } = props;
  const { setValues, values, errors, touched } = formikProps;

  return (
    <Grid item key={name}>
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
            setValues({
              ...values,
              [name]: { name: fileName, url },
            });
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
            onDelete={() =>
              setValues({
                ...values,
                [name]: null,
              })
            }
            className={classes.fileChip}
            icon={!values[name].url ? <CircularProgress size={32} /> : null}
          />
        </div>
      )}
      {validator(name)}
    </Grid>
  );
};
export default withStyles(styles)(Uploader);
