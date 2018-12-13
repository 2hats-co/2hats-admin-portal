import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';

import { getInitials } from '../../../utilities';

const styles = theme => ({
    root: {
        minWidth: 480,
    },
    iconButton: {
        padding: theme.spacing.unit * 1.5,
        borderRadius: '50%',
        minWidth: 'auto',
        marginRight: -theme.spacing.unit * 2,
    },
});

const DUMMY_SUBSCRIBERS = [
    { displayName: 'Gloria Li', title: 'Co-Founder' },
    { displayName: 'Kelvin Li', title: 'Co-Founder' },
    { displayName: 'Athena Cheung', title: 'Content Writer' },
    { displayName: 'Shelley Wang', title: 'Graphic Designer' },
];

function AddSubscriberDialog(props) {
    const { classes, showDialog, setShowDialog } = props;
    
    const [subscribers, setSubscribers] = useState(DUMMY_SUBSCRIBERS);

    const handleClose = () => { setShowDialog(false) };

    const handleAddSubscriber = (e) => {
        if (e.key === 'Enter') {
            subscribers.push({ displayName: e.target.value });
            setSubscribers(subscribers);
            e.target.value = '';
        }
    }

    const handleRemoveSubscriber = (i) => {
        const newSubscribers = subscribers;
        newSubscribers.splice(i, 1);
        setSubscribers(newSubscribers);
    };

    return (
        <Dialog
            open={showDialog}
            onClose={handleClose}
            classes={{ paper: classes.root }}
        >
            <DialogTitle>Add Subscribers</DialogTitle>

            <DialogContent>
                <TextField
                    placeholder="Type a name…"
                    fullWidth
                    dense
                    autoFocus
                    onKeyPress={handleAddSubscriber}
                />

                <List>
                { subscribers.map((x, i) => (
                    <ListItem key={i} disableGutters>
                        <ListItemAvatar>
                            <Avatar>
                                { getInitials(x.displayName) }
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={x.displayName}
                            secondary={x.title}
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => {handleRemoveSubscriber(i)}} className={classes.iconButton}>
                                <RemoveIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )) }
                </List>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Done
                </Button>
            </DialogActions>

        </Dialog>
    );
}

export default withStyles(styles)(AddSubscriberDialog);
