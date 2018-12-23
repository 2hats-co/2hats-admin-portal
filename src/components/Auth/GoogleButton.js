import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { GOOGLE_CID_PRODUCTION, GOOGLE_CID_STAGING } from '../../config/auth';
import GoogleIcon from '../../assets/Google.svg';
//import GoogleLogin from "react-google-login";
import GoogleLogin from '../../utilities/auth/GoogleLogin';
import { withRouter } from 'react-router-dom';
import { authAdmin } from '../../firebase/auth';
const styles = theme => ({
  socialButton: {
    margin: 5,
    width: 250,
    height: 40,
    color: `${theme.palette.primary.main} !important`,
    backgroundColor: '#fff',
    '& *': { color: `${theme.palette.primary.main} !important` },
  },
  socialIcon: {
    fill: theme.palette.primary.main,
    color: theme.palette.primary.main,
    marginTop: 2,
    marginRight: 17,
  },
});
function GoogleButton(props) {
  const [cid, setCID] = useState(null);

  if (process.env.REACT_APP_ENV === 'PRODUCTION' && !cid) {
    setCID(GOOGLE_CID_PRODUCTION);
    console.log('google auth production', GOOGLE_CID_PRODUCTION);
  } else if (!cid) {
    setCID(GOOGLE_CID_STAGING);
    console.log('google auth staging', GOOGLE_CID_STAGING);
  }
  const handleRouting = route => {
    this.props.history.replace(route);
  };
  const handleGoogleAuthFail = error => {
    console.log('google auth fail', error);
  };

  const getToken = r => {
    authAdmin(r, handleRouting);
  };

  const { classes } = props;

  return (
    <div onClick={props.onClick}>
      <GoogleLogin
        clientId={cid}
        scope="https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/calendar"
        //scope="https://www.googleapis.com/auth/gmail.readonly"
        accessType="offline"
        responseType="code"
        render={renderProps => (
          <Button
            variant="contained"
            key={`google-button`}
            //style={{ backgroundColor: '#fff' }}
            onClick={renderProps.onClick}
            className={classes.socialButton}
          >
            Sign in with Google
          </Button>
        )}
        buttonText="Login"
        onSuccess={getToken}
        onFailure={handleGoogleAuthFail}
      />
    </div>
  );
}

export default withRouter(withStyles(styles)(GoogleButton));
