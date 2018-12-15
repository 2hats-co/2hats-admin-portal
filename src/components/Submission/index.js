import React from 'react';

import PersonDetails from './PersonDetails';
import SubmissionDetails from './SubmissionDetails';

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

function Submission(props) {
    const { submission, extraPadding } = props;

    return(
        <div>
            <PersonDetails submission={submission} />
            <SubmissionDetails submission={submission} />
            { extraPadding && <div style={{height:300}} /> }
        </div>
    );
}

export default Submission;
