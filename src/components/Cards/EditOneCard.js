import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import ApplicantsIcon from '@material-ui/icons/AssignmentIndOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import PublishedIcon from '@material-ui/icons/VisibilityOutlined';
import UnpublishedIcon from '@material-ui/icons/VisibilityOff';
import CriteriaIcon from '@material-ui/icons/AssignmentOutlined';
import PreviewIcon from '@material-ui/icons/PageviewOutlined';

import Form from '../Form';
import Friction from '../Friction';
import CriteriaDialog from './CriteriaDialog';
import DebugButton from '../DebugButton';

import { updateDoc, deleteDoc } from '../../utilities/firestore';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    width: 'auto',
  },

  buttonBar: {
    marginBottom: -theme.spacing.unit,
    textAlign: 'right',
  },
});

const EditOneCard = props => {
  const { classes, children, data, fields, collection, history } = props;

  const [showForm, setShowForm] = useState(false);
  const [showCriteriaDialog, setShowCriteriaDialog] = useState(false);

  let url = 'https://students.2hats.com/';
  switch (collection) {
    case 'courses':
      url += 'courses';
      break;

    case 'assessments':
    case 'jobs':
      url += `${collection.slice(0, -1)}?id=${data.id}`;
      break;

    default:
      break;
  }

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item className={classes.buttonBar}>
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

        <DebugButton toCopy={data.id} title="Copy ID" />

        {url && (
          <Tooltip title="View on Student Portal">
            <IconButton
              component="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PreviewIcon />
            </IconButton>
          </Tooltip>
        )}

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
              color={data.published ? 'default' : 'primary'}
            >
              {data.published ? <PublishedIcon /> : <UnpublishedIcon />}
            </IconButton>
          </Friction>
        </Tooltip>
      </Grid>

      <Grid item xs>
        {children({
          onClick: () => {
            setShowForm(true);
          },
          published: data.published,
          fullHeight: true,
        })}
      </Grid>

      {showForm && (
        <Form
          handleDelete={() => {
            deleteDoc(collection, data.id);
          }}
          action="edit"
          actions={{
            edit: d => {
              console.log(d);
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
    </Grid>
  );
};

export default withRouter(withStyles(styles)(EditOneCard));
