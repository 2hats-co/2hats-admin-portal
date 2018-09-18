import React,{ Component } from 'react';
import { Paper, Button, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import LogoInCard from '../components/LogoInCard';
import GoogleButton from '../components/Auth/GoogleButton';

const styles = theme => ({
    root: {
        height:110
    },
});
class AuthenticationContainer extends React.Component{
    componentWillMount(){

    }

    render(){
        const {classes} = this.props;

        return(
            <LogoInCard width={350} height={260}>
                <Grid
                    container
                    className={classes.root}
                    alignItems="center"
                    direction="column"
                    justify="space-between"
                >
                <Typography variant='title'>Admin Portal</Typography>
                    <GoogleButton
                        id="google-button"
                        action="Sign in"
                    />
                    <Typography variant='caption'>Use your 2hats email</Typography>
                </Grid>
            </LogoInCard>
        )
    }

}
export default withStyles(styles)(AuthenticationContainer);