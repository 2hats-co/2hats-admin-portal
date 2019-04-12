import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import EmailIcon from '@material-ui/icons/EmailOutlined';
import green from '@material-ui/core/colors/green';

import Form from '../../Form';
import subjectMultiEmailFields from '../../../constants/forms/subjectMultiEmail';

import useDocument from '../../../hooks/useDocument';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

import {
  cloudFunction,
  CLOUD_FUNCTIONS,
} from '../../../utilities/CloudFunctions';

const styles = theme => ({
  dialogContent: { minHeight: 300 },
  wrapperGrid: { overflow: 'visible' },

  snackbar: { transition: theme.transitions.create('background-color') },
  'snackbar-success': { backgroundColor: green[600] },
  'snackbar-error': { backgroundColor: theme.palette.error.dark },
});

const TemplatePreview = ({ template }) => {
  const [templateState, templateDispatch] = useDocument();
  const templateDoc = templateState.doc;

  useEffect(
    () => {
      if (template && template.value)
        templateDispatch({
          path: `${COLLECTIONS.emailTemplates}/${template.value}`,
        });
    },
    [template]
  );

  return templateDoc ? (
    <div dangerouslySetInnerHTML={{ __html: templateDoc.html }} />
  ) : (
    <Typography variant="body1">No template selected</Typography>
  );
};

const MultiEmail = props => {
  const { classes, className, selected } = props;

  const [showForm, setShowForm] = useState(false);
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: '',
    variant: 'normal',
  });

  const sendEmail = data => {
    const targets = selected.map(x => x.objectID);
    setSnackbar({ show: true, message: 'Sending…', variant: 'normal' });
    cloudFunction(
      CLOUD_FUNCTIONS.CAMPAIGN_SEND_TARGETED_BY_ID,
      { targets, templateId: data.templateId },
      o => {
        setSnackbar({
          show: true,
          message: `${selected.length} email${
            selected.length === 1 ? '' : 's'
          } sent!`,
          variant: 'success',
        });
      },
      o => {
        setSnackbar({
          show: true,
          message: 'ERROR: ' + o.code,
          variant: 'error',
        });
      }
    );
    setShowForm(false);
  };

  return (
    <>
      <Button
        className={className}
        variant="contained"
        disabled={selected.length === 0}
        onClick={() => {
          setShowForm(true);
        }}
      >
        <EmailIcon />
        Send email
      </Button>

      <Form
        action="Send"
        actions={{
          Send: sendEmail,
          close: () => {
            setShowForm(false);
          },
        }}
        classes={{
          dialogContent: classes.dialogContent,
          wrapperGrid: classes.wrapperGrid,
        }}
        data={subjectMultiEmailFields()}
        open={showForm}
        formFooter={values => <TemplatePreview template={values.templateId} />}
        formTitle="email"
      />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbar.show}
        autoHideDuration={snackbar.variant === 'normal' ? null : 3000}
        onClose={() => {
          setSnackbar(false);
        }}
      >
        <SnackbarContent
          className={classNames(
            classes.snackbar,
            classes['snackbar-' + snackbar.variant]
          )}
          message={snackbar.message}
        />
      </Snackbar>
    </>
  );
};

export default withStyles(styles)(MultiEmail);
