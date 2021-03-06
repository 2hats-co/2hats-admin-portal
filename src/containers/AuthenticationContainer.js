import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import LogoInCard from '../components/LogoInCard';
import GoogleButton from '../components/Auth/GoogleButton';
// import { CLOUD_FUNCTIONS, callable } from '../firebase/functions';
//
const styles = theme => ({
  root: {
    height: 110,
    '& *': { color: 'rgba(0,0,0,.87)' },
  },
});
class AuthenticationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };

    this.handleGoogleButton = this.handleGoogleButton.bind(this);
  }

  handleGoogleButton() {
    this.setState({ loading: true });
  }
  render() {
    const { classes } = this.props;
    if (this.state.loading) {
      return (
        <LogoInCard width={350} height={260}>
          <Grid
            container
            className={classes.root}
            alignItems="center"
            direction="column"
            justify="center"
          >
            <CircularProgress size={64} />
          </Grid>
        </LogoInCard>
      );
    } else {
      return (
        <LogoInCard width={350} height={280}>
          <Grid
            container
            className={classes.root}
            alignItems="center"
            direction="column"
            justify="space-between"
            wrap="nowrap"
          >
            <Typography variant="h6">Admin Portal</Typography>
            <GoogleButton
              id="google-button"
              action="Sign in"
              onClick={this.handleGoogleButton}
            />
            <Grid item style={{ textAlign: 'center', marginTop: 8 }}>
              <Typography variant="caption">Use your 2hats email</Typography>
              <Typography variant="caption">
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reset your Google permissions
                </a>
              </Typography>
            </Grid>
          </Grid>
        </LogoInCard>
      );
    }
  }
}
export default withStyles(styles)(AuthenticationContainer);
