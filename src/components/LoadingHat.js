import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import hatLoading from '../assets/hatLoading.svg';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    // animation: 'fade-in .5s both',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  // '@keyframes fade-in': {
  //need to prevent flashing between different loads
  // from: { opacity: 0 },
  // to: { opacity: 1 },
  // },
  loadingHat: {
    animationName: 'loading-hat',
    animationDuration: '1.4s',
    animationTimingFunction: 'cubic-bezier(0.280, 0.840, 0.420, 1)',
    animationIterationCount: 'infinite',
  },
  '@keyframes loading-hat': {
    '0%': { transform: 'scale(1,1)      translateY(10px)' },
    '10%': { transform: 'scale(1.1,.9)   translateY(10px)' },
    '30%': { transform: 'scale(.9,1.1)   translateY(-100px)' },
    '50%': { transform: 'scale(1.05,.95) translateY(10px)' },
    '57%': { transform: 'scale(1,1)      translateY(-7px)' },
    '64%': { transform: 'scale(1,1)      translateY(10px)' },
    '100%': { transform: 'scale(1,1)      translateY(10px)' },
  },
  floor: {
    width: 200,
    height: 40,
    borderRadius: '50%',
    backgroundColor:
      theme.palette.type === 'dark' ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,.25)',

    position: 'relative',
    top: -25,
    left: -10,
    zIndex: -1,
  },
  message: {
    marginBottom: -theme.spacing.unit * 6,
    marginTop: theme.spacing.unit * 3,
    marginLeft: -theme.spacing.unit,
  },
});

const LoadingHat = props => (
  <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    className={props.classes.root}
  >
    <img
      src={hatLoading}
      alt="Loading"
      className={props.classes.loadingHat}
      width={280}
      height={206}
    />
    <div className={props.classes.floor} />
    {props.message && (
      <Typography variant="h6" className={props.classes.message}>
        {props.message}
      </Typography>
    )}
  </Grid>
);

export default withStyles(styles)(LoadingHat);
