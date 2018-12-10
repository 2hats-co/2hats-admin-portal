import React from 'react';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Fade from '@material-ui/core/Fade';

import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { useCandidate } from '../../hooks/useCandidate';
import { getInitials } from '../../utilities';

const styles = theme => ({
    avatar: {
        width: 56,
        height: 56,
        marginRight: 16,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
    },
    personIcon: {
        fontSize: 32,
    },
    outcome: {
        textTransform: 'capitalize',
    },
    outcomeIcon: {
        backgroundColor: '#000',
        borderRadius: '50%',
        color: '#fff',
        fontSize: 20,
        padding: 2,
        verticalAlign: 'bottom',
        marginLeft: theme.spacing.unit,
        width: 20,
        height: 20,
        display: 'inline-block',
    },
});

function PersonDetails(props) {
    const { classes, submission } = props;

    const timestamp = moment.unix(submission.createdAt.seconds)
        .format('LLLL');

    const candidate = useCandidate(submission.UID);
    console.log(submission.UID, candidate);

    let interests = '';
    if (submission.submissionContent.careerInterests.value) {
        for (let i = 0; i < submission.submissionContent.careerInterests.value.length; i++) {
            interests += submission.submissionContent.careerInterests.value[i];
            if (i < submission.submissionContent.careerInterests.value.length - 1) interests += ', ';
        }
    }

    let initials;
    if (submission.displayName) initials = getInitials(submission.displayName);

    let outcomeIcon;
    switch (submission.outcome) {
        case 'rejected':
            outcomeIcon = <CloseIcon className={classes.outcomeIcon} style={{backgroundColor: red[500]}} />;
            break;
        case 'accepted':
            outcomeIcon = <CheckIcon className={classes.outcomeIcon} style={{backgroundColor: green[500]}} />;
            break;
        case 'pending':
        default:
            outcomeIcon = <div className={classes.outcomeIcon} style={{backgroundColor: amber[500]}} />;
            break;
    }

    return(
        <Grid container justify="space-between">
            <Grid item xs>
                <Grid container>
                    <Grid item>
                        { candidate && candidate.avatarURL ? 
                            <Fade in><Avatar className={classes.avatar} src={candidate.avatarURL} /></Fade>
                            : <Avatar className={classes.avatar}><PersonIcon className={classes.personIcon} /></Avatar>
                        }
                    </Grid>
                    <Grid item xs>
                        <Typography variant="headline">{submission.displayName}</Typography>
                        <Typography variant="body2">{interests}</Typography>
                        <Typography variant="body1">Submitted on {timestamp}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subheading" className={classes.outcome}>
                            {submission.outcome}
                            {outcomeIcon}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(PersonDetails);
