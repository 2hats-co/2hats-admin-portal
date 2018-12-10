import React, { useState, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import BackIcon from '@material-ui/icons/ArrowBack';
import DoneIcon from '@material-ui/icons/Done';
import SendIcon from '@material-ui/icons/Send';
import RedoIcon from '@material-ui/icons/Redo';
import DisqualifyIcon from '@material-ui/icons/Cancel';

import Confidence from './Confidence';
import Reasons from './Reasons';

import { outsideDemographic, outsideIndusty,invalidSubmission } from '../../constants/emails/templates';
import { updateProperties } from '../../utilities/firestore';
import { COLLECTIONS } from '../../constants/firestore';
import { CLOUD_FUNCTIONS,callable } from '../../firebase/functions';
import { useAuthedUser } from '../../hooks/useAuthedUser';

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 6,
        paddingBottom: theme.spacing.unit * 7,
        position: 'relative',
        '& > *': {
            padding: theme.spacing.unit * 2,
        }
    },
    topButtons: {
        backgroundColor: '#fff',
        borderBottom: '1px solid rgba(0,0,0,.1)',
        padding: 0,
        position: 'fixed',
        right: 0,
        top: 64,
        zIndex: 1,
        width: 400,
    },
    icon: {
        marginRight: 8,
    },
    submitButton: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
        width: 400 - theme.spacing.unit * 4,
        height: 48,
        padding: 0,
        marginBottom: 0,
    },
    disqualifyButton: {
        padding: '8px 16px',
        margin: theme.spacing.unit * 2,
        marginBottom: 0,
        transition: 'all .2s',
    },
});

const handleConfidence = (confidence) => {
    switch (confidence) {
        case 0:
        case 1:
        return [
            { label: 'Writtten Communication', checked: false },
            { label: 'Formatting Issue', checked: false },
            { label: 'Experience Issue', checked: false },
            { label: 'Commitment Issue', checked: false },
        ]
        case 2:
        case 3:
        return [
            { label: 'Writtten Communication', checked: false },
            { label: 'Relevant Skills', checked: false },
            { label: 'Relevant Experience', checked: false },
            { label: 'Relevant Degree', checked: false },
        ]
        default: return[]   
    }
}

function ScreeningForm(props) {
    const { classes, setTemplate, submission, submissionDispatch, handleSendEmail, emailReady, setEmailReady } = props;
    const submissionID = submission.id;

    const [confidenceLevel, setConfidenceLevel] = useState({ value: '', index: -1 });
    const [reasons, setReasons] = useState([]);

    const [showDisqualify, setShowDisqualify] = useState(submission.outcome === 'disqualified');
    const [showSend, setShowSend] = useState(false);

    const [disqualifyType, setDisqualifyType] = useState('');

    const authedUser = useAuthedUser();

    useEffect(() => {
        setReasons(handleConfidence(confidenceLevel.index));
    }, [confidenceLevel]);

    const updateSubmission = () => {
        const outputReasons = reasons.filter(x => x.checked).map(x => x.label);
        const oldProcesses = submission.processes ? submission.processes : [];
        const properties = {
            outcome: (confidenceLevel.index < 2 ? 'rejected' : 'accepted'),
            processes: oldProcesses.concat([ {
                type: 'screened',
                value: confidenceLevel.value,
                operator: authedUser.UID,
                timestamp: new Date(),
            } ]),
            reasons: outputReasons,
        }
        callable(CLOUD_FUNCTIONS.tracker,{type:'talentTeam',value:`screened-${confidenceLevel.value}`})
        callable(CLOUD_FUNCTIONS.tracker,{type:authedUser.UID,value:`screened-${confidenceLevel.value}`})
        updateProperties(COLLECTIONS.submissions, submissionID, properties);
        resetScreeningForm();
        submissionDispatch({ type:'clear' });
    };

    const disqualifySubmission = () => {
        const oldProcesses = submission.processes ? submission.processes : [];
        const properties = {
            outcome: 'disqualified',
            processes: oldProcesses.concat([ {
                type: 'screened',
                value: `disqualified-${disqualifyType}`,
                operator: authedUser.UID,
                timestamp: new Date(),
            } ]),
        }
        callable(CLOUD_FUNCTIONS.tracker,{type:'talentTeam',value:`disqualified-${disqualifyType}`})
        callable(CLOUD_FUNCTIONS.tracker,{type:authedUser.UID,value:`disqualified-${disqualifyType}`})
        updateProperties(COLLECTIONS.submissions, submissionID, properties);
        resetScreeningForm();
        submissionDispatch({ type:'clear' });
    };

    const resetScreeningForm = () => {
        setConfidenceLevel({ value: '', index: -1 });
        setReasons([]);
        setShowSend(false);
        setShowDisqualify(false);
        setTemplate(null);
        setEmailReady(false);
        setDisqualifyType('');
    };

    if (showDisqualify) return (
        <Grid container className={classes.root} direction="column">
            <Grid item className={classes.topButtons}>
                <Button onClick={resetScreeningForm} color="primary">
                    <BackIcon className={classes.icon} /> Back
                </Button>
            </Grid>
            <Typography variant="title" style={{marginTop:16}}>
                <DisqualifyIcon className={classes.icon} style={{ verticalAlign: 'bottom' }} />
                Disqualify Submission
            </Typography>
            <Typography variant="body1">
                This is sent to the candidate when their application has a
                mismatch with 2hats’ business priorities, such as people who are
                overqualified or people who are in a completely different
                industry to what we do.
            </Typography>

            <Button variant={ disqualifyType === 'demographic' ? 'contained' : 'outlined' }
            onClick={() => {
                setTemplate(null); setEmailReady(false);
                setTimeout(() => { setTemplate(outsideDemographic); }, 100);
                setDisqualifyType('demographic');
                setShowSend(true);
            }} className={classes.disqualifyButton} color="primary">
                Demographic Mismatch
            </Button>
            <Button variant={ disqualifyType === 'industry' ? 'contained' : 'outlined' }
            onClick={() => {
                setTemplate(null); setEmailReady(false);
                setTimeout(() => { setTemplate(outsideIndusty); }, 100);
                setDisqualifyType('industry');
                setShowSend(true);
            }} className={classes.disqualifyButton} color="primary">
                Industry Mismatch
            </Button>
            <Button variant={ disqualifyType === 'invalid' ? 'contained' : 'outlined' }
            onClick={() => {
                setTemplate(null); setEmailReady(false);
                setTimeout(() => { setTemplate(invalidSubmission); }, 100);
                setDisqualifyType('invalid');
                setShowSend(true);
            }} className={classes.disqualifyButton} color="primary">
                Invalid  Submission
            </Button>

            <Tooltip title={`Sends email. ${submission.displayName} is removed from Pending.`}><div className={classes.submitButton}>
                <Button
                    disabled={!(showSend && emailReady)}
                    variant="extendedFab" color="primary" className={classes.submitButton}
                    onClick={ () => { handleSendEmail(); disqualifySubmission(); } }
                >
                    <SendIcon className={classes.icon} /> Send Email
                </Button>
            </div></Tooltip>
        </Grid>
    );

    return (
    <Grid container className={classes.root} direction="column">
        <Grid container justify="space-between" className={classes.topButtons}>
            <Button color="primary" onClick={() => { resetScreeningForm(); setShowDisqualify(true); }}>
                <DisqualifyIcon className={classes.icon} /> Disqualify
            </Button>
            <Button color="primary" onClick={() => { submissionDispatch({type:'skip'}); resetScreeningForm(); }}>
                <RedoIcon className={classes.icon} /> Skip
            </Button>
        </Grid>

        <Confidence confidenceLevel={confidenceLevel} 
        setConfidenceLevel={setConfidenceLevel} />

        { reasons.length > 0 &&
            <Reasons reasons={reasons} setReasons={setReasons} />
        }

        <Tooltip title={
            <React.Fragment>
                Place {submission.displayName} in 
                <b> {confidenceLevel.index < 2 ? 'Rejected' : 'Accepted'}</b>.
                <br />{submission.displayName} will <b>not</b> see the reasons
                you gave here.
                <br />No email will be sent.
            </React.Fragment>
        }><div className={classes.submitButton}>
            <Button
                disabled={reasons.filter(x => x.checked).length === 0}
                variant="extendedFab" color="primary" className={classes.submitButton}
                onClick={updateSubmission}
            >
                <DoneIcon className={classes.icon} />Submit
            </Button>
        </div></Tooltip>
    </Grid>);
}

export default withStyles(styles)(ScreeningForm);
