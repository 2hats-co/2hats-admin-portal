import React from 'react';

import {withStyles} from '@material-ui/core/styles';

import PersonDetails from './PersonDetails';
import SubmissionDetails from './SubmissionDetails';


const styles = theme => ({
    root: {
        height: '100%',
    },
});

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

function Submission(props) {
    const { classes, submission, extraPadding } = props;

    return(
        <div className={classes.root}>
            <PersonDetails submission={submission} />
            <SubmissionDetails submission={submission} />
            { extraPadding && <div style={{height:300}} /> }
        </div>
    );
}

export default withStyles(styles)(Submission);
