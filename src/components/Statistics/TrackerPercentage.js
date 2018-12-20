import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import withAnalytics from './withAnalytics';

const styles = theme => ({
    root: {
        height: '100%',
        padding: theme.spacing.unit * 2,
        textAlign: 'center',

        '& *': { color: 'inherit' },
    },
    circularProgress: {
        opacity: .87,
    },
    percentage: {
        marginTop: -102,
        marginBottom: 56,
        marginRight: -6,
    },
});

function TrackerPercentage(props) {
    const { classes, theme, title, trackers } = props;
    console.log('%%,,%%',trackers)
    if(trackers.length < 2) return <p>loadin %</p>
    const colour = trackers[0].colour;
    let percentage = 0;

    if (trackers[0].sum<trackers[1].sum) {
        percentage = Math.round((trackers[0].sum/trackers[1].sum)*100);
    } else {
        percentage = Math.round((trackers[1].sum/trackers[0].sum)*100);
    }

    return(
        <Grid container
            className={classes.root}
            justify="center" alignItems="center"
            style={{backgroundColor:colour,color:theme.palette.getContrastText(colour)}}
        >
            <Grid item>
                <CircularProgress className={classes.circularProgress} variant="static" value={percentage} size={150} thickness={3} />
                <Typography className={classes.percentage} variant="display2">{percentage}<small>%</small></Typography>
                <Typography variant="subheading">{title}</Typography>
            </Grid>
        </Grid>
    );
}

export default withAnalytics(withStyles(styles, { withTheme:true })(TrackerPercentage));
