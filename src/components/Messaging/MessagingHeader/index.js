import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import AddSubscriberIcon from '@material-ui/icons/GroupAdd';
import LinkIcon from '@material-ui/icons/Link';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarBorder';

import AddSubscriberDialog from './AddSubscriberDialog';

const styles = theme => ({
    root: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit*1.5}px ${theme.spacing.unit}px ${theme.spacing.unit*3}px`,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
});

function MessagingHeader(props) {
    const { classes, leadHeader } = props;

    const [showSubscriberDialog, setShowSubscriberDialog] = useState(false);

    return (<React.Fragment>
    <Grid item className={classes.root}>
        <Grid container justify="space-between" alignItems="center">
            <Grid item>
                <Typography variant="title">{ leadHeader.label }</Typography>
            </Grid>
            <Grid item>
                <IconButton onClick={() => { setShowSubscriberDialog(true) }}><AddSubscriberIcon /></IconButton>
                <IconButton onClick={() => { window.open(leadHeader.path, '_blank') }}><LinkIcon /></IconButton>
                <IconButton><StarOutlineIcon /></IconButton>
            </Grid>
        </Grid>
    </Grid>

    <AddSubscriberDialog showDialog={showSubscriberDialog} setShowDialog={setShowSubscriberDialog} />

    </React.Fragment>);
}

export default withStyles(styles)(MessagingHeader);
