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
    const { classes, submission } = props;

    const submissionStatusLabel = ` – ${submission.submissionStatus} by ${submission.operator && submission.operator.displayName && submission.operator.displayName.split(' ')[0]}`

    return(
        <div className={classes.root}>
            <PersonDetails
                submission={ submission }
                submissionStatusLabel={submissionStatusLabel}
            />
            <SubmissionDetails submission={submission} />
        </div>
    );
}

export default withStyles(styles)(Submission);
