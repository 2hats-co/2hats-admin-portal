import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import withAnalytics from './withAnalytics';

const styles = theme => ({
    root: {
        height: '100%',
    },
    container: {
        width: '100%',
        // padding: theme.spacing.unit * 2,
        paddingBottom: '100%',
        position: 'relative',
    },
    circularProgress: {
        opacity: .87,
        position: 'absolute',
        top: 0,
        left: 0,
        color: 'inherit',

        padding: theme.spacing.unit,
        boxSizing: 'border-box',
    },
    circularProgressSvg: {
        width: '100%',
        height: '100%',
    },
    circularProgressCircle: {
        fill: 'rgba(0,0,0,.2)',
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9,

        textAlign: 'center',
        '& *': { color: 'inherit' }, 
    },
    percentage: {
        // top: -theme.spacing.unit,
        // right: -6,
        // position: 'relative',
        // zIndex: 99,

        // marginBottom: 56,
    },
});

function TrackerPercentage(props) {
    const { classes, theme, title, trackers } = props;
    if(trackers.length < 2) return <p>loadin %</p>
    const colour = trackers[0].colour;
    let percentage = 0;

    if (trackers[0].sum<trackers[1].sum) {
        percentage = Math.round((trackers[0].sum/trackers[1].sum)*100);
    } else {
        percentage = Math.round((trackers[1].sum/trackers[0].sum)*100);
    }

    return(<React.Fragment>
        <Grid container className={classes.root}
            justify="center" alignItems="center"
            style={{
                backgroundImage: `linear-gradient(to bottom right, ${colour.replace('rgb','rgba').replace(')',', 1)')} 0%, ${colour.replace('rgb','rgba').replace(')',', .67)')} 100%)`,
                color: theme.palette.getContrastText(colour)
            }}
        >
            <Grid item className={classes.container}>
                <CircularProgress
                    className={classes.circularProgress}
                    classes={{ svg:classes.circularProgressSvg, circle:classes.circularProgressCircle }}
                    variant="static" value={percentage} size="100%" thickness={3} />
            </Grid>
        </Grid>

        <Grid container className={classes.textContainer} justify="center" alignItems="center">
            <Grid item>
                <Typography className={classes.percentage} variant="display2">{percentage}<small>%</small></Typography>
                <Typography variant="subheading">{title}</Typography>
            </Grid>
        </Grid>
    </React.Fragment>);
}

export default withAnalytics(withStyles(styles, { withTheme:true })(TrackerPercentage));
