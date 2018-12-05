import React from 'react';
import moment from 'moment';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

const styles = theme => ({
    avatar: {
        width: 56,
        height: 56,
        marginRight: 16,
    },
});

function PersonDetails(props) {
    const { classes, submission, submissionStatusLabel } = props;

    const timestamp = moment.unix(submission.createdAt.seconds)
        .format('LLLL');

    let interests = '';
    if (submission.submissionContent.careerInterests.value) {
        for (let i = 0; i < submission.submissionContent.careerInterests.value.length; i++) {
            interests += submission.submissionContent.careerInterests.value[i];
            if (i < submission.submissionContent.careerInterests.value.length - 1) interests += ', ';
        }
    }

    return(
        <Grid container justify="space-between">
            <Grid item xs>
                <Grid container>
                    <Grid item>
                        <Avatar className={classes.avatar}><PersonIcon /></Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="headline">{submission.displayName}</Typography>
                        <Typography variant="body2">{interests}</Typography>
                        <Typography variant="body1">Submitted on {timestamp}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(PersonDetails);
