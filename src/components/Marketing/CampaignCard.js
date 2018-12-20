import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        padding: `${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 3}px`,
        boxShadow: `0 0 0 1px ${theme.palette.divider}`,
    },
    rightAligned: {
        textAlign: 'right',
    },
});

function CampaignCard(props) {
    const { classes, data } = props;

    return (
    <Card classes={{ root:classes.root }} elevation={0}>
        <Grid container justify="space-between">
            <Grid item xs={8}>
                <Typography variant="title">{data.name}</Typography>
                <Typography variant="body1">by {data.author} · created {moment(data.createdAt).fromNow()}</Typography>
            </Grid>
            <Grid item xs={2} className={classes.rightAligned}>
                <Typography variant="title">{data.messages}</Typography>
                <Typography variant="body1">Messages</Typography>
            </Grid>
            <Grid item xs={2} className={classes.rightAligned}>
                <Typography variant="title">{data.replies}</Typography>
                <Typography variant="body1">Replies</Typography>
            </Grid>
        </Grid>
    </Card>
    );
}

export default withStyles(styles)(CampaignCard);
