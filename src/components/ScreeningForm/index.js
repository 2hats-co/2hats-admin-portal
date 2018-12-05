import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import BackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import RedoIcon from '@material-ui/icons/Redo';
import DisqualifyIcon from '@material-ui/icons/Cancel';

import Confidence from './Confidence';
import Reasons from './Reasons';

import { outsideDemographic, outsideIndusty, resumeAccepted } from '../../constants/emails/templates';
import { updateProperties } from '../../utilities/firestore';
import { COLLECTIONS } from '../../constants/firestore';
import { useUserInfo } from '../../hooks/useUserInfo';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        paddingTop: 0,

        '& > *': {
            marginBottom: theme.spacing.unit * 4,
        }
    },
    button: {
        marginBottom: 8,
    },
    icon: {
        marginRight: 8,
    },
    back: {
        position: 'relative',
        left: -8,
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
    const { classes, setTemplate, submission, submissionDispatch, handleSendEmail } = props;
    const submissionID = submission.id;

    const [confidenceLevel, setConfidenceLevel] = useState({ value: '', index: -1 });
    const [reasons, setReasons] = useState([]);

    const [showDisqualify, setShowDisqualify] = useState(false);
    const [showSend, setShowSend] = useState(false);

    const [disqualifyType, setDisqualifyType] = useState('');

    const userInfo = useUserInfo();

    useEffect(() => {
        setReasons(handleConfidence(confidenceLevel.index))
    }, [confidenceLevel])

    const handleSubmit = () => {
        switch (confidenceLevel.index) {
            case 0:
            case 1:
                updateSubmission();
                break;
            case 2:
            case 3:
                setTemplate(resumeAccepted);
                setShowSend(true);
                break;
        }
    };

    const updateSubmission = () => {
        const outputReasons = reasons.filter(x => x.checked).map(x => x.label);
        const oldProcesses = submission.processes ? submission.processes : [];
        const properties = {
            outcome: (confidenceLevel.index < 2 ? 'rejected' : 'accepted'),
            processes: oldProcesses.concat([ {
                type: 'screened',
                value: confidenceLevel.value,
                operator: userInfo.UID,
                timestamp: new Date(),
            } ]),
            reasons: outputReasons,
        }
        updateProperties(COLLECTIONS.submissions, submissionID, properties);
        resetScreeningForm();
    };

    const disqualifySubmission = () => {
        const oldProcesses = submission.processes ? submission.processes : [];
        const properties = {
            outcome: 'disqualified',
            processes: oldProcesses.concat([ {
                type: 'screened',
                value: `disqualified-${disqualifyType}`,
                operator: userInfo.UID,
                timestamp: new Date(),
            } ]),
        }
        updateProperties(COLLECTIONS.submissions, submissionID, properties);
        resetScreeningForm();
    };

    const resetScreeningForm = () => {
        setConfidenceLevel({ value: '', index: -1 });
        setReasons([]);
        setShowSend(false);
        setShowDisqualify(false);
    };

    if (showDisqualify) return (
        <Grid container className={classes.root} direction="column">
            <IconButton onClick={() => { setShowDisqualify(false); setTemplate(null) }} className={classes.back}>
                <BackIcon />
            </IconButton>
            <Typography variant="title">
                <DisqualifyIcon className={classes.icon} style={{ verticalAlign: 'bottom' }} />
                Disqualify Submission
            </Typography>
            <Typography variant="body1">
                This is sent to the candidate when their application has a
                mismatch with 2hats’ business priorities, such as people who are
                overqualified or people who are in a completely different
                industry to what we do.
            </Typography>
            <Button variant="outlined" onClick={() => { setTemplate(outsideDemographic); setDisqualifyType('demographic'); setShowSend(true); }}>Demographic</Button>
            <Button variant="outlined" onClick={() => { setTemplate(outsideIndusty); setDisqualifyType('industry'); setShowSend(true); }}>Industry</Button>
            <Button
                disabled={!showSend}
                variant="extendedFab" color="primary" className={classes.button}
                onClick={ () => { handleSendEmail(); disqualifySubmission(); } }
            >
                <SendIcon className={classes.icon} /> Send Email
            </Button>
        </Grid>
    );

    return (
    <Grid container className={classes.root} direction="column">
        <Confidence confidenceLevel={confidenceLevel} 
        setConfidenceLevel={setConfidenceLevel} />

        {reasons.length > 0 &&
            <Reasons reasons={reasons} setReasons={setReasons} />
        }
        
        <Grid container direction="column">
            <Button
                disabled={reasons.filter(x => x.checked).length === 0}
                variant="extendedFab" color="primary" className={classes.button}
                onClick={ showSend ?
                    () => { handleSendEmail(); updateSubmission(); resetScreeningForm(); }
                    : handleSubmit
                }
            >
                <SendIcon className={classes.icon} />{showSend ? 'Send Email' : 'Submit'}
            </Button>
            <Button className={classes.button} onClick={() => { submissionDispatch({type:'skip'}) }}>
                <RedoIcon className={classes.icon} />Skip
            </Button>
            <Button className={classes.button} onClick={() => { setShowDisqualify(true); }}>
                <DisqualifyIcon className={classes.icon} />Disqualify
            </Button>
        </Grid>
    </Grid>);
}

export default withStyles(styles)(ScreeningForm);
