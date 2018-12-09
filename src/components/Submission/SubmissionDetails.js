import React, { Component } from 'react';

import withStyles from '@material-ui/core/sytles/withStyles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import EduExpCard from './EduExpCard';

const styles = theme => ({
    subheading: {
        marginTop: 40,
        marginBottom: 10,
        fontWeight: 700,
    },
    chip: {
        marginRight: 4,
        marginBottom: 4,
    },
    iframe: {
        width: '100%',
        border: 'none',
        height: 600,
        marginBottom: 40,
    },
});

function submissionDetails(props) {
    const { submission, classes } = props;

    return (<React.Fragment>
        <Typography className={classes.subheading} variant="subheading">Bio:</Typography>
        <Typography variant="body1">{submission.submissionContent.bio}</Typography>

        <Typography className={classes.subheading} variant="subheading">Available Days:</Typography>
        <Typography variant="body1">{submission.submissionContent.availableDays}</Typography>


        <Typography className={classes.subheading} variant="subheading">Skills:</Typography>
        {submission.submissionContent.skills.map(x =>
            <Chip color="primary" label={x} key={x} className={classes.chip} />
        )}

        <Typography className={classes.subheading} variant="subheading">{submission.submissionContent.process === 'upload' ?'Resume':'Profile'}:</Typography>
        {submission.submissionContent.process === 'upload' && 
            <iframe src={submission.submissionContent.resumeFile.downloadURL} className={classes.iframe} />
        }
        {submission.submissionContent.process === 'build' && 
        <div>
        <Typography className={classes.subheading} variant="subheading">Education:</Typography>
        {submission.submissionContent.education.map((x, i) => <EduExpCard key={i} title={x.degree} label={x.major} description={x.description} startDate={x.startDate} endDate={x.endDate}/>)}
        <Typography className={classes.subheading} variant="subheading">Experience:</Typography>
        {submission.submissionContent.experience.map((x, i) => <EduExpCard key={i} title={`${x.title} - ${x.type}`} label={x.organisation} description={x.description} startDate={x.startDate} endDate={x.endDate}/>)}
        </div>
        }
    </React.Fragment>);
}

export default withStyles(styles)(submissionDetails);
