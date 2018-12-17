import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import AddSubscriberIcon from '@material-ui/icons/GroupAdd';
import LinkIcon from '@material-ui/icons/Link';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarBorder';

import ManageSubscribersDialog from './ManageSubscribersDialog';

const styles = theme => ({
    root: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit*1.5}px ${theme.spacing.unit}px ${theme.spacing.unit*3}px`,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
});

function ConversationHeader(props) {
    const { classes,conversation } = props;
    console.log('conversation',conversation)
    const [showSubscriberDialog, setShowSubscriberDialog] = useState(false);

    return (<React.Fragment>
    <Grid item className={classes.root}>
        <Grid container justify="space-between" alignItems="center">
            <Grid item>
                <Typography variant="title">{conversation.displayName}</Typography>
            </Grid>
            <Grid item>
                <Tooltip title="Manage Subscribers">
                    <IconButton onClick={() => { setShowSubscriberDialog(true) }}>
                        <AddSubscriberIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Open Link in New Tab">
                    <IconButton onClick={() => { window.open('', '_blank') }}>
                        <LinkIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Star">
                    <IconButton><StarOutlineIcon /></IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    </Grid>

    <ManageSubscribersDialog conversation={conversation} showDialog={showSubscriberDialog} setShowDialog={setShowSubscriberDialog} />

    </React.Fragment>);
}

export default withStyles(styles)(ConversationHeader);
