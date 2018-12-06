import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Tooltip from '@material-ui/core/Tooltip';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import yesImg from '../../assets/obama/yes.png';
import maybeImg from '../../assets/obama/maybe.png';
import unlikelyImg from '../../assets/obama/unlikely.png';
import noImg from '../../assets/obama/no.png';

const styles = theme => ({
    root: {
    },
    confidenceBar: {
        marginBottom: theme.spacing.unit,
    },
    confidenceLabel: {
        textTransform: 'capitalize',
    },
    confidenceIcon: {
        backgroundColor: '#000',
        borderRadius: '50%',
        color: '#fff',
        fontSize: 20,
        padding: 2,
        verticalAlign: 'bottom',
        marginLeft: theme.spacing.unit,
    },
    toggleButtonGroup: {
        display: 'flex',
        boxShadow: 'none',
        '& > *': {
            color: '#000',
            height: 64,
        },
        '& img': {
            height: 56,
        },
    },
});

const CONFIDENCE_LEVELS = ['No', 'Unlikely', 'Maybe', 'Yes'];
const CONFIDENCE_IMAGES = [noImg, unlikelyImg, maybeImg, yesImg];

function Confidence(props) {
    const { classes, confidenceLevel, setConfidenceLevel } = props;

    return (
        <Grid container direction="column" className={classes.root}>
            <Grid container justify="space-between" alignItems="center" className={classes.confidenceBar}>
                <Typography variant="subheading">Confidence:</Typography>
                { confidenceLevel.index > -1 &&
                    <Typography variant="subheading" className={classes.confidenceLabel}>
                        {confidenceLevel.value}
                        { confidenceLevel.index < 2 ?
                            <CloseIcon className={classes.confidenceIcon} style={{backgroundColor: red[500]}} /> :
                            <CheckIcon className={classes.confidenceIcon} style={{backgroundColor: green[500]}} />
                        }
                    </Typography>
                }
            </Grid>
            <ToggleButtonGroup
                exclusive
                value={confidenceLevel.value}
                className={classes.toggleButtonGroup}
                onChange={(e, val) => { setConfidenceLevel({ value: val, index: CONFIDENCE_LEVELS.indexOf(val) }); } }
            >
                { CONFIDENCE_LEVELS.map((x, i) => (
                    <ToggleButton value={x} key={i}>
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
