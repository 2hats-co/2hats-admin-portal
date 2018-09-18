import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import GoogleIcon from '../../assets/Google.svg';


const styles = theme => ({
    socialButton: {
        margin: 5,
        width: 250,
        height: 40,
        color: '#fff',
        backgroundColor: '#0077B5',
        fontWeight: 'bold',
    },
      socialIcon: {
        marginTop:2,
        marginRight: 17
    },
});

class GoogleButton extends Component {
    render() {
        const { classes } = this.props;

        return(
            <Button variant='flat'
                key={`google-button`}
                style={{ backgroundColor: '#E05449' }}
                // onClick={renderProps.onClick}
                className={classes.socialButton}
            >
                <div className={classes.socialIcon} >
                <img alt={'google-logo'} src={GoogleIcon} />
                </div> Sign in with Google
            </Button>
        );
    }
}

export default withStyles(styles)(GoogleButton);