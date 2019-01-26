import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Form from '../Form';

import { updateProperties, deleteDoc } from '../../utilities/firestore';

const EditOneCard = props => {
  const { children, data, fields, collection } = props;

  const [showForm, setShowForm] = useState(false);

  return (
    <div>
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

      {children}

      {showForm && (
        <Form
          action="edit"
          actions={{
            edit: d => {
              updateProperties(collection, data.id, d);
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

export default EditOneCard;
