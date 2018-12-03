import React, { useState, useEffect } from 'react'
import {withNavigation} from '../components/withNavigation';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

import { useSubmission } from '../hooks/useSubmission';
import { useSmartLink } from '../hooks/useSmartLink';

import LocationIndicator from '../components/LocationIndicator';
import Done from '../components/Done';
import Submission from '../components/Submission';
import ScreeningForm from '../components/ScreeningForm';
import FeedbackForm from '../components/FeedbackForm';
import TemplateGenerator from '../components/TemplateGenerator';

import { updateProperties } from '../utilities/firestore';
import { COLLECTIONS } from '../constants/firestore';

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
    successSnackbar: {
        '& > div': {
            backgroundColor: green[600],
        },
    },
});

const handleSubmit = (submissionID, confidenceLevel, reasons, resetScreeningForm) => {
    const outputReasons = reasons.filter(x => x.checked).map(x => x.label);
    const properties = {confidence:confidenceLevel,reasons:outputReasons,screened:true}
    updateProperties(COLLECTIONS.submissions, submissionID, properties);
    resetScreeningForm();
}

function SumbissionsContainer(props) {
    const { classes, location } = props;

    const [template, setTemplate] = useState(null);
    const [showDisqualify, setShowDisqualify] = useState(false);

    const [submissionState, submissionDispatch] = useSubmission(location.pathname.replace('/',''));
    const submission = submissionState.submission

    const [confidenceLevel, setConfidenceLevel] = useState({ value: '', index: -1 });
    const [reasons, setReasons] = useState([]);

    const [showSnackbar, setShowSnackbar] = useState(false);

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

    const resetScreeningForm = () => {
        setConfidenceLevel(-1);
        setReasons([]);
        setShowSnackbar(true);
    };

    let rightPanel;
    switch (location.pathname) {
        case '/pending':
            rightPanel = <ScreeningForm
                            submissionID={submission.id}
                            setTemplate={setTemplate}
                            showDisqualify={showDisqualify}
                            setShowDisqualify={setShowDisqualify}
                            submissionDispatch={submissionDispatch}

                            confidenceLevel={confidenceLevel}
                            setConfidenceLevel={setConfidenceLevel}
                            reasons={reasons}
                            setReasons={setReasons}

                            resetScreeningForm={resetScreeningForm}
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
                        handleSubmit={() => { handleSubmit(submission.id, confidenceLevel.index, reasons, resetScreeningForm) }}
                        close={ () => { setTemplate(null); setShowDisqualify(false); } }
                    />
                }
            </Grid>
            <Grid item style={{width:400}}>
                { rightPanel }
            </Grid>
        </Grid>

        <Snackbar
            className={classes.successSnackbar}
            anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
            open={showSnackbar}
            autoHideDuration={1500}
            onClose={() => { setShowSnackbar(false) }}
            message={<span id="message-id">Sent!</span>}
        />
    </React.Fragment>);
}

export default withNavigation(withStyles(styles)(SumbissionsContainer));
