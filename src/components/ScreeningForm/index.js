import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Confidence from './Confidence';
import Reasons from './Reasons';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        paddingTop: 0,

        '& > *': {
            marginBottom: theme.spacing.unit * 4,
        }
    },
});

function ScreeningForm(props) {
    const [confidenceLevel, setConfidenceLevel] = useState('');

    const [reasons, setReasons] = useState([
        { label: 'Writing Quality', checked: false },
        { label: 'Format Issue', checked: false },
        { label: 'Experience Issue', checked: false },
        { label: 'Commitment Issue', checked: false },
    ]);

    const { classes } = props;

    return (
    <Grid container className={classes.root} direction="column">
        <Confidence confidenceLevel={confidenceLevel} setConfidenceLevel={setConfidenceLevel} />
        <Reasons reasons={reasons} setReasons={setReasons} />
        <Button variant="extendedFab" color="primary">
            Submit
        </Button>
    </Grid>);
}

export default withStyles(styles)(ScreeningForm);
