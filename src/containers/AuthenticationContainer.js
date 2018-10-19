import React from 'react';
import {Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import LogoInCard from '../components/LogoInCard';
import GoogleButton from '../components/Auth/GoogleButton';

const styles = theme => ({
    root: {
        height:110
    },
});
class AuthenticationContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = { loading: false };

        this.handleGoogleButton = this.handleGoogleButton.bind(this);
    }
    componentDidMount(){

    }

    handleGoogleButton() {
        this.setState({ loading: true });
    }

    render(){
        const {classes} = this.props;

        if (this.state.loading) {
            return(
                <LogoInCard width={350} height={260}>
                    <Grid
                        container
                        className={classes.root}
                        alignItems="center"
                        direction="column"
                        justify="center"
                    >
                        <CircularProgress size={50} />
                    </Grid>
                </LogoInCard>
            );
        } else {
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
                            onClick={this.handleGoogleButton}
                        />
                        <Typography variant='caption'>Use your 2hats email</Typography>
                    </Grid>
                </LogoInCard>
            );
        }
    }

}
export default withStyles(styles)(AuthenticationContainer);
