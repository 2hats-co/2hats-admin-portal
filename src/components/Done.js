import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import HatCongrats from '../assets/hatCongrats.png';

const styles = theme => ({
    root: {
        height: 'calc(100vh - 64px)',
        textAlign: 'center',

        animation: 'done-animation 2s infinite',
    },
    '@keyframes done-animation': {
        '0%': {
            transform: 'scale(0) rotate(180deg)',
            opacity: 0,
        },
        '33%': {
            transform: 'scale(1) rotate(0)',
            opacity: 1,
        },
        '66%': {
            transform: 'scale(1) rotate(0)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(0) rotate(-180deg)',
            opacity: 0,
        },
    },
    text: {
        opacity: .75,
        animation: 'done-text-animation 1.5s infinite',

        '&:first-of-type': { marginTop: theme.spacing.unit * 2 },
    },
    '@keyframes done-text-animation': {
        '0%':   { color: '#000' },
        '20%':  { color: '#0f0' },
        '40%':  { color: '#ff0' },
        '60%':  { color: '#f0f' },
        '80%':  { color: '#0ff' },
        '100%': { color: '#000' },
    },
})

function Done(props) {
    const { classes } = props;

    return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
        <Grid item>
            <img src={HatCongrats} alt="Congrats!" width="320" />
            <Typography variant="title" className={classes.text}>
                You’re done! Now celebrate with…
            </Typography>
            <Typography variant="title" className={classes.text}>
                sparkling water?
            </Typography>
        </Grid>
    </Grid>);
}

export default withStyles(styles)(Done)
