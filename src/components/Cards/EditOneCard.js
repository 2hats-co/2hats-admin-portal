import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import CopyIdIcon from '@material-ui/icons/Code';
import ApplicantsIcon from '@material-ui/icons/AssignmentIndOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
// import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import PublishedIcon from '@material-ui/icons/VisibilityOutlined';
import UnpublishedIcon from '@material-ui/icons/VisibilityOffOutlined';
import CriteriaIcon from '@material-ui/icons/AssignmentOutlined';

import Form from '../Form';
import Friction from '../Friction';
import CriteriaDialog from './CriteriaDialog';

import { updateDoc, deleteDoc } from '../../utilities/firestore';
import { copyToClipboard } from '../../utilities';
// import { assessment } from '../../constants/oneCardMappings';

const styles = theme => ({
  root: { marginTop: theme.spacing.unit },

  buttonBar: {
    marginBottom: -theme.spacing.unit,
    textAlign: 'right',
  },
});

const EditOneCard = props => {
  const { classes, children, data, fields, collection, history } = props;

  const [showForm, setShowForm] = useState(false);
  const [showCriteriaDialog, setShowCriteriaDialog] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.buttonBar}>
        {collection === 'assessments' && (
          <Tooltip title="Edit criteria">
            <IconButton
              onClick={() => {
                setShowCriteriaDialog(true);
              }}
            >
              <CriteriaIcon />
            </IconButton>
          </Tooltip>
        )}

        {(collection === 'jobs' || collection === 'assessments') && (
          <Tooltip title={collection === 'jobs' ? 'Applicants' : 'Submissions'}>
            <IconButton
              onClick={() => {
                history.push(
                  `/submissions2?${
                    collection === 'jobs' ? 'jobId=' : 'assessmentId='
                  }${data.id}`
                );
              }}
            >
              <ApplicantsIcon />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Copy ID">
          <IconButton
            onClick={() => {
              copyToClipboard(data.id);
            }}
          >
            <CopyIdIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setShowForm(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={data.published ? 'Unpublish' : 'Publish'}>
          <Friction
            message={{
              title: data.published
                ? 'Are you sure you want to unpublish this?'
                : `Are you sure you want to publish this?`,
              body: data.published
                ? `It'll be hidden on the student portal`
                : `It'll be seen on the student portal`,
            }}
          >
            <IconButton
              onClick={() => {
                updateDoc(collection, data.id, { published: !data.published });
              }}
            >
              {data.published ? <PublishedIcon /> : <UnpublishedIcon />}
            </IconButton>
          </Friction>
        </Tooltip>
        {/* <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              deleteDoc(collection, data.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip> */}
      </div>

      {children({
        onClick: () => {
          setShowForm(true);
        },
      })}

      {showForm && (
        <Form
          handleDelete={() => {
            deleteDoc(collection, data.id);
          }}
          action="edit"
          actions={{
            edit: d => {
              updateDoc(collection, data.id, d);
              setShowForm(false);
            },
            close: () => {
              setShowForm(false);
            },
          }}
          open={showForm}
          data={fields(data)}
          formTitle={data.title}
        />
      )}

      {collection === 'assessments' && showCriteriaDialog && (
        <CriteriaDialog
          showDialog={showCriteriaDialog}
          setShowDialog={setShowCriteriaDialog}
          data={data}
        />
      )}
    </div>
  );
};

export default withRouter(withStyles(styles)(EditOneCard));
