import React from 'react';
import moment from 'moment';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FlagIcon from '@material-ui/icons/Flag';
import AcceptIcon from '@material-ui/icons/Done';
import RejectIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

const styles = theme => ({
    avatar: {
        width: 56,
        height: 56,
        marginRight: 16,
    },
    greyButton: {
        boxShadow: 'none',
        marginRight: 16,
    },
    greenButton: {
        backgroundColor: '#24c875',
        color: '#fff',
        boxShadow: 'none',
        marginRight: 16,
        '&:hover': {
            backgroundColor: '#1B9457',
        },
    },
    redButton: {
        backgroundColor: '#eb5858',
        color: '#fff',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#b84444',
        },
    }
});

function PersonDetails(props) {
    const { classes, submission, showButtons, acceptHandler, rejectHandler, submissionStatusLabel } = props;

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
                        <Typography variant="headline">{submission.displayName} {submissionStatusLabel} </Typography>
                        <Typography variant="body2">{interests}</Typography>
                        <Typography variant="body1">Submitted on {timestamp}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            {showButtons && <Grid item>
                <Button variant="fab" className={classes.greyButton} aria-label="reject">
                    <FlagIcon />
                </Button>
                <Button variant="fab" className={classes.greenButton} 
                onClick={acceptHandler}
                aria-label="accept">
                    <AcceptIcon />
                </Button>
                <Button variant="fab" className={classes.redButton} aria-label="reject"
                onClick={rejectHandler}>
                    <RejectIcon />
                </Button>
            </Grid>}
        </Grid>
    );
}

export default withStyles(styles)(PersonDetails);
