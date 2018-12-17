import React, { useState, useEffect } from 'react';
import {withNavigation} from '../components/withNavigation';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

import { useSubmission } from '../hooks/useSubmission';

import LocationIndicator from '../components/LocationIndicator';
import Done from '../components/Done';
import Submission from '../components/Submission';
import ScreeningForm from '../components/ScreeningForm';
import FeedbackForm from '../components/FeedbackForm';
import TemplateGenerator from '../components/TemplateGenerator';
import {sendEmail} from '../utilities/email/send';
import { ROUTES } from '../constants/routes';

// import Search from '../components/Search'
const styles = theme => ({
    card: {
        height: '100%',
        overflowY: 'scroll',
        boxSizing: 'border-box',
        padding: theme.spacing.unit * 5,
        background: '#fff',
        // boxShadow: '0 0 10px rgba(0,0,0,.1), 0 30px 60px -15px rgba(0,0,0,.125), 0 60px 80px -20px rgba(0,0,0,.1), 0 50px 100px -30px rgba(0,0,0,.15), 0 40px 120px -5px rgba(0,0,0,.15)',
        boxShadow: theme.shadows[16],
        borderRadius: '0 10px 0 0',
        zIndex: 2,
    },
    successSnackbar: {
        '& > div': {
            backgroundColor: green[600],
        },
    },
});

function SumbissionsContainer(props) {
    const { classes, location, history } = props;

    const [template, setTemplate] = useState(null);
    const [smartLink, setSmartLink] = useState(null);

    const currentRoute = location.pathname.replace('/','')
    const [submissionState, submissionDispatch] = useSubmission(currentRoute);
    const submission = submissionState.submission;

    useEffect(() => {
        if (!submission && location.search.indexOf('?uid=') > -1) {
            const uid = location.search.replace('?uid=','')
            submissionDispatch({uid});
        }
    }, [submission, location.search]);

    const [email, setEmail] = useState(null);
    const [emailReady, setEmailReady] = useState(false);

    const [showSnackbar, setShowSnackbar] = useState(false);

    const locationIndicator = <div style={{ paddingLeft: 40 - 24 }}>
        <LocationIndicator
            title="Submissions"
            subRoutes={[ROUTES.pending, ROUTES.rejected, ROUTES.accepted]}
        />
    </div>;

    if (submissionState.loading) {
        return <React.Fragment>
            { locationIndicator }
            <Grid container justify="center" alignItems="center" style={{ height: 'calc(100vh - 64px)' }}>
                <CircularProgress size={64} />
            </Grid>
        </React.Fragment>;
    }

    if (submission.complete) {
        console.log(submission)
        return <React.Fragment> { locationIndicator } <Done /> </React.Fragment>
    }

    const handleSendEmail = () => {
        sendEmail(email);
        setShowSnackbar(true);
        setTemplate(null);
        setEmailReady(false);
    };

    let rightPanel;
    switch (submission.outcome) {
        case 'pending':
        case 'disqualified':
            rightPanel = <ScreeningForm
                            submission={submission}
                            setTemplate={setTemplate}
                            setSmartLink={setSmartLink}
                            submissionDispatch={submissionDispatch}
                            handleSendEmail={handleSendEmail}
                            emailReady={emailReady}
                            setEmailReady={setEmailReady}
                        />;
            break;
        case 'rejected':
        case 'accepted':
            rightPanel = <FeedbackForm
                submission={submission}
                setTemplate={setTemplate}
                setSmartLink={setSmartLink}
                submissionDispatch={submissionDispatch}
                handleSendEmail={handleSendEmail}
                emailReady={emailReady}
                location={location}
                history={history}
            />;
    }

    return(<React.Fragment>
        { locationIndicator }
        <Grid container style={{ height: 'calc(100vh - 64px)' }}>
            <Grid item xs className={classes.card}>
                <Submission
                    submission={submission}
                    listType={location.pathname.split('/')[1]}
                    extraPadding={template !== null}
                />
                { template &&
                    <TemplateGenerator
                        template={template}
                        recipientUID={submission.UID}
                        smartLink={smartLink}
                        setEmail= {setEmail}
                        setEmailReady={setEmailReady}
                    />
                }
            </Grid>
            <Grid item style={{width:400, overflowY:'scroll'}}>
                { rightPanel }
            </Grid>
        </Grid>

        <Snackbar
            className={classes.successSnackbar}
            anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
            open={showSnackbar}
            autoHideDuration={1500}
            onClose={() => { setShowSnackbar(false) }}
            message={<span id="message-id">Sent email!</span>}
        />
    </React.Fragment>);
}

export default withNavigation(withStyles(styles)(SumbissionsContainer));
