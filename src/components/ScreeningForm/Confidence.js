import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Tooltip from '@material-ui/core/Tooltip';

import yesImg from '../../assets/obama/yes.png';
import maybeImg from '../../assets/obama/maybe.png';
import unlikelyImg from '../../assets/obama/unlikely.png';
import noImg from '../../assets/obama/no.png';

const styles = theme => ({
    root: {
    },
    confidenceLabel: {
        textTransform: 'capitalize',
    },
    toggleButtonGroup: {
        display: 'flex',
        boxShadow: 'none',
        '& > *': {
            color: '#000',
            height: 64,
        },
        '& img': {
            height: 64,
        },
    },
});

const CONFIDENCE_LEVELS = ['No', 'Unlikely', 'Maybe', 'Yes'];
const CONFIDENCE_IMAGES = [noImg, unlikelyImg, maybeImg, yesImg];

function Confidence(props) {
    const { classes, confidenceLevel, setConfidenceLevel } = props;

    return (
        <Grid container direction="column" className={classes.root}>
            <Typography variant="subheading">
                Confidence: <span className={classes.confidenceLabel}>{confidenceLevel}</span>
            </Typography>
            <ToggleButtonGroup
                exclusive
                value={confidenceLevel}
                className={classes.toggleButtonGroup}
                onChange={(e, val) => { setConfidenceLevel(val); } }
            >
                { CONFIDENCE_LEVELS.map((x, i) => (
                    <ToggleButton value={x.toLowerCase()} key={i}>
                        <Tooltip title={x}>
                            <img src={CONFIDENCE_IMAGES[i]} alt={x} />
                        </Tooltip>
                    </ToggleButton>
                )) }
            </ToggleButtonGroup>
        </Grid>
    );
}

export default withStyles(styles)(Confidence);
