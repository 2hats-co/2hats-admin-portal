import React, { useState, useEffect } from 'react'
import {withNavigation} from '../components/withNavigation';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useSubmission } from '../hooks/useSubmission';
import { useSmartLink } from '../hooks/useSmartLink';

import LocationIndicator from '../components/LocationIndicator';
import Done from '../components/Done';
import Submission from '../components/Submission';
import ScreeningForm from '../components/ScreeningForm';
import FeedbackForm from '../components/FeedbackForm';
import TemplateGenerator from '../components/TemplateGenerator';

const styles = theme => ({
    card: {
        height: '100%',
        overflowY: 'scroll',
        boxSizing: 'border-box',
        padding: 40,
        background: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,.1), 0 30px 60px -15px rgba(0,0,0,.125), 0 60px 80px -20px rgba(0,0,0,.1), 0 50px 100px -30px rgba(0,0,0,.15), 0 40px 120px -5px rgba(0,0,0,.15)',
        borderRadius: '0 10px 0 0',
    },
});

function SumbissionsContainer(props) {
    const { classes, location } = props;

    const [template, setTemplate] = useState(null);
    const [showDisqualify, setShowDisqualify] = useState(false);

    const [submissionState, submissionDispatch] = useSubmission(location.pathname.replace('/',''));
    const submission = submissionState.submission

    const locationIndicator = <LocationIndicator
                                title="Submissions"
                                subRoutes={['/pending', '/rejected', '/accepted']}
                            />;

    if (!submission) {
        return <React.Fragment>
            { locationIndicator }
            <Grid container justify="center" alignItems="center" style={{ height: 'calc(100vh - 64px)' }}>
                <CircularProgress size={50} />
            </Grid>
        </React.Fragment>;
    }

    if (submission.complete) {
        const smartLink = useSmartLink(submission.UID, `/prevSubmission?${submission.id}`)
        return <React.Fragment> { locationIndicator } <Done /> </React.Fragment>
    }

    let rightPanel;
    switch (location.pathname) {
        case '/pending':
            rightPanel = <ScreeningForm
                            submissionID={submission.id}
                            setTemplate={setTemplate}
                            showDisqualify={showDisqualify}
                            setShowDisqualify={setShowDisqualify}
                            submissionDispatch={submissionDispatch}
                        />;
            break;
        case '/rejected':
        case '/accepted':   
            rightPanel = <FeedbackForm
                submission={submission}
                setTemplate={setTemplate}
            />;
    }

    const smartLink = useSmartLink(submission.UID, `/prevSubmission?${submission.id}`)

    return(<React.Fragment>
        { locationIndicator }
        <Grid container style={{ height: 'calc(100vh - 64px)' }}>
            <Grid item xs className={classes.card}>
                <Submission
                    submission={submission}
                    listType={location.pathname.split('/')[1]}
                />
                { template && smartLink &&
                    <TemplateGenerator
                        template={template}
                        recipientUID={submission.UID}
                        smartLink={smartLink}
                        close={ () => { setTemplate(null); setShowDisqualify(false) } }
                    />
                }
            </Grid>
            <Grid item style={{width:400}}>
                { rightPanel }
            </Grid>
        </Grid>
    </React.Fragment>);
}

export default withNavigation(withStyles(styles)(SumbissionsContainer));
