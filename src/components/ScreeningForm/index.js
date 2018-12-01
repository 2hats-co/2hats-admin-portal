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

import {outsideDemographic,outsideIndusty} from '../../constants/emails/templates';
import { updateProperties } from '../../utilities/firestore';
import { COLLECTIONS } from '../../constants/firestore';

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
            { label: 'Writing Quality', checked: false },
            { label: 'Format Issue', checked: false },
            { label: 'Experience Issue', checked: false },
            { label: 'Commitment Issue', checked: false },
        ]
        case 2:
        case 3:
        return [
            { label: 'Writing Quality', checked: false },
            { label: 'Relevant Skills', checked: false },
            { label: 'Good Experience', checked: false },
            { label: 'Not Currently Situated in Vietnam', checked: false },
        ]
        default: return[]   
    }
}
const handleSubmit = (submissionID, confidenceLevel, reasons) => {
    const outputReasons = reasons.filter(x => x.checked).map(x => x.label);
    console.log(submissionID, confidenceLevel, outputReasons);
    const properties = {confidence:confidenceLevel,reasons:outputReasons,screened:true}
    updateProperties(COLLECTIONS.submissions, submissionID, properties);
}

function ScreeningForm(props) {
    const { classes, setTemplate, showDisqualify, setShowDisqualify, submissionID, submissionDispatch } = props;

    const [confidenceLevel, setConfidenceLevel] = useState({ value: '', index: -1 });

    const [reasons, setReasons] = useState([]);

    useEffect(() => {
        setReasons(handleConfidence(confidenceLevel.index))
    }, [confidenceLevel])


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
            <Button onClick={() => { setTemplate(outsideDemographic) }}>Demographic</Button>
            <Button onClick={() => { setTemplate(outsideIndusty) }}>Industry</Button>
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
                onClick={() => { handleSubmit(submissionID, confidenceLevel.index, reasons) }}
            >
                <SendIcon className={classes.icon} />Submit
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
