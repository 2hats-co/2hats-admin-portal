import React, { useState, useContext } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import { AdminsContext } from '../../contexts/AdminsContext';
import useCollection from '../../hooks/useCollection';
import { addDoc, deleteDoc } from '../../utilities/firestore';

const styles = theme => ({
  root: {},

  listItemSecondaryAction: { right: -8 },
});

const Notes = props => {
  const { classes, collectionPath } = props;

  const currentUser = useContext(CurrentUserContext);
  const adminsContext = useContext(AdminsContext);

  const [notesState] = useCollection({
    path: collectionPath,
    sort: [{ field: 'createdAt', direction: 'desc' }],
  });
  const notes = notesState.documents;

  const [note, setNote] = useState('');

  const handleAddNote = () => {
    addDoc(collectionPath, { adminId: currentUser.UID, body: note });
    setNote('');
  };

  const handleDeleteNote = id => () => {
    deleteDoc(collectionPath, id);
  };

  return (
    <div className={classes.root}>
      <Grid container wrap="nowrap">
        <TextField
          fullWidth
          value={note}
          onChange={e => {
            setNote(e.target.value);
          }}
          multiline
          variant="filled"
          label="Note"
          InputProps={{ disableUnderline: true }}
        />
        <IconButton
          onClick={handleAddNote}
          color="primary"
          disabled={note.length === 0}
        >
          <AddIcon />
        </IconButton>
      </Grid>

      <List>
        {Array.isArray(notes) &&
          notes.map(x => (
            <ListItem key={x.id} disableGutters>
              <ListItemText
                primary={x.body}
                secondary={`${
                  adminsContext.getAdmin(x.adminId).givenName
                } • ${moment.unix(x.updatedAt.seconds).fromNow()}`}
              />
              <ListItemSecondaryAction
                classes={{ root: classes.listItemSecondaryAction }}
              >
                <IconButton onClick={handleDeleteNote(x.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </div>
  );
};
export default withStyles(styles)(Notes);
