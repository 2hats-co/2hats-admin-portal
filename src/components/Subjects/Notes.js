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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import { AdminsContext } from '../../contexts/AdminsContext';
import useCollection from '../../hooks/useCollection';
import { addDoc, deleteDoc } from '../../utilities/firestore';

const styles = theme => ({
  root: {},

  input: {
    paddingTop: theme.spacing.unit * 1.75,
    paddingBottom: theme.spacing.unit * 1.75,
  },
  addButton: { marginRight: -theme.spacing.unit },

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
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleAddNote = () => {
    addDoc(collectionPath, { adminId: currentUser.UID, body: note });
    setNote('');
  };

  const handleDeleteNote = id => () => {
    deleteDoc(collectionPath, id);
  };
  const handleEditNote = note => () => {
    setNote(note.body);
    deleteDoc(collectionPath, note.id);
  };

  return (
    <div className={classes.root}>
      <Grid container wrap="nowrap" alignItems="flex-end">
        <Grid item xs>
          <TextField
            fullWidth
            value={note}
            onChange={e => {
              setNote(e.target.value);
            }}
            multiline
            variant="filled"
            margin="none"
            placeholder="Note"
            InputProps={{
              disableUnderline: true,
              classes: { root: classes.input },
            }}
          />
        </Grid>
        <Grid item>
          <IconButton
            onClick={handleAddNote}
            color="primary"
            disabled={note.length === 0}
            className={classes.addButton}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>

      <List>
        {Array.isArray(notes) &&
          notes.map(x => (
            <ListItem key={x.id} disableGutters>
              <ListItemText
                primary={x.body}
                secondary={`${
                  adminsContext.getAdmin(x.adminId).givenName
                }\u00a0\u00a0•\u00a0\u00a0${x.createdAt &&
                  moment.unix(x.createdAt.seconds).fromNow()}`}
              />
              <ListItemSecondaryAction
                classes={{ root: classes.listItemSecondaryAction }}
              >
                <IconButton
                  onClick={e => {
                    setMenuAnchor(e.currentTarget);
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={menuAnchor}
                  open={!!menuAnchor}
                  onClose={() => {
                    setMenuAnchor(null);
                  }}
                >
                  <MenuItem onClick={handleEditNote(x)}>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleDeleteNote(x.id)}>
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                    Delete
                  </MenuItem>
                </Menu>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </div>
  );
};
export default withStyles(styles)(Notes);
