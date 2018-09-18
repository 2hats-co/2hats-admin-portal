import React,{ Component } from 'react';
import { Paper, Button, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import LogoInCard from '../components/LogoInCard';
import GoogleButton from '../components/Auth/GoogleButton';

const styles = theme => ({
    root: {
        //
    },
});

class AuthContainer extends React.Component{
    componentWillMount(){

    }

    render(){
        const {classes} = this.props;

        return(
            <LogoInCard width={350} height={220}>
                <Grid
                    container
                    className={classes.root}
                    alignItems="center"
                    direction="column"
                    justify="space-between"
                >
                    <GoogleButton
                        id="google-button"
                        action="Sign in"
                        // changeHandler={this.handleChange}
                    />
                </Grid>
            </LogoInCard>
        )
    }

}
export default withStyles(styles)(AuthContainer);``