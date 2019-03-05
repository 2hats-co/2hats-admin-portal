import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import RefreshIcon from '@material-ui/icons/Refresh';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',

    userSelect: 'none',

    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },

  title: {
    marginBottom: theme.spacing.unit,
    fontWeight: 400,
  },
  subtitle: { fontWeight: 400 },

  buttonWrapper: { marginTop: theme.spacing.unit * 2 },
  button: { margin: theme.spacing.unit },
});

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    const { classes } = this.props;

    if (this.state.hasError)
      return (
        <Grid
          container
          className={classes.root}
          justify="center"
          alignItems="center"
          direction="column"
          wrap="nowrap"
        >
          <Typography variant="h4" className={classes.title}>
            oopsie no bueno
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            idk slack shams or something
          </Typography>

          <div className={classes.buttonWrapper}>
            <Button
              color="primary"
              className={classes.button}
              onClick={() => {
                window.location.reload();
              }}
            >
              <RefreshIcon />
              Reload
            </Button>
          </div>
        </Grid>
      );

    return this.props.children;
  }
}

export default withStyles(styles)(ErrorBoundary);
