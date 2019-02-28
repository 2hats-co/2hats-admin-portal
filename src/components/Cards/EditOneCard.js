import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
// import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import PublishedIcon from '@material-ui/icons/VisibilityOutlined';
import UnpublishedIcon from '@material-ui/icons/VisibilityOffOutlined';

import Form from '../Form';

import { updateDoc } from '../../utilities/firestore';
import { copyToClipboard } from '../../utilities';

const styles = theme => ({
  root: { marginTop: theme.spacing.unit },

  buttonBar: {
    marginBottom: -theme.spacing.unit,
    textAlign: 'right',
  },
});

const EditOneCard = props => {
  const { classes, children, data, fields, collection } = props;

  const [showForm, setShowForm] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.buttonBar}>
        <Tooltip title="Copy ID">
          <IconButton
            onClick={() => {
              copyToClipboard(data.id);
            }}
          >
            <CopyIcon />
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
          <IconButton
            onClick={() => {
              updateDoc(collection, data.id, { published: !data.published });
            }}
          >
            {data.published ? <PublishedIcon /> : <UnpublishedIcon />}
          </IconButton>
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

      {children}

      {showForm && (
        <Form
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
    </div>
  );
};

export default withStyles(styles)(EditOneCard);
