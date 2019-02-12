import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import Form from '../Form';

import { updateDoc, deleteDoc } from '../../utilities/firestore';

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
        <IconButton
          onClick={() => {
            setShowForm(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            deleteDoc(collection, data.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
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
