import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { GOOGLE_CID_PRODUCTION, GOOGLE_CID_STAGING } from "../../config/auth";
import GoogleIcon from "../../assets/Google.svg";
import GoogleLogin from "../../utilities/auth/GoogleLogin";
import { withRouter } from "react-router-dom";
import { authAdmin } from "../../firebase/auth";
const styles = theme => ({
  root: {
    paddingLeft: 50,
    paddingRight: 50,
    height: 500
  },
  socialButton: {
    margin: 5,
    width: 250,
    height: 40,
    color: "#fff",
    backgroundColor: "#0077B5"
  },
  socialIcon: {
    marginTop: 2,
    marginRight: 17
  }
});
class GoogleButton extends Component {
  constructor(props) {
    super(props);
    this.handleGoogleAuthFail = this.handleGoogleAuthFail.bind(this);
    this.handleRouting = this.handleRouting.bind(this);
    this.getToken = this.getToken.bind(this);
    if (process.env.REACT_APP_ENV === "PRODUCTION") {
      this.state = { cid: GOOGLE_CID_PRODUCTION };
      console.log("google auth production", GOOGLE_CID_PRODUCTION);
    } else {
      this.state = { cid: GOOGLE_CID_STAGING };
      console.log("google auth staging", GOOGLE_CID_STAGING);
    }
  }

  handleRouting(route) {
    this.props.history.replace(route);
  }
  handleGoogleAuthFail = error => {
    console.log("google auth fail", error);
  };

  getToken(r) {
    console.log(r);
    // if (r.profileObj.email.split("@")[1] === "2hats.com.au") {
    //   console.log("yay");
    authAdmin(r, this.handleRouting);
    // } else {
    //   console.log("nay");
    // }
  }
  render() {
    const { classes } = this.props;
    const { cid } = this.state;
    return (
      <div onClick={this.props.onClick}>
        <GoogleLogin
          clientId={cid}
          scope="https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/calendar"
          //scope="https://www.googleapis.com/auth/gmail.readonly"
          accessType="offline"
          responseType="code"
          render={renderProps => (
            <Button
              variant="flat"
              key={`google-button`}
              style={{ backgroundColor: "#E05449" }}
              onClick={renderProps.onClick}
              className={classes.socialButton}
            >
              <div className={classes.socialIcon}>
                <img alt={"google-logo"} src={GoogleIcon} />
              </div>{" "}
              Sign in with Google
            </Button>
          )}
          buttonText="Login"
          onSuccess={this.getToken}
          onFailure={this.handleGoogleAuthFail}
        />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(GoogleButton));
