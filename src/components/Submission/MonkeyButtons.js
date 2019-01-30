import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SkipIcon from '@material-ui/icons/Redo';
import PassIcon from '@material-ui/icons/CheckCircle';
import FailIcon from '@material-ui/icons/Error';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import { updateDoc } from '../../utilities/firestore';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    paddingTop: 0,

    '& button': {
      display: 'flex',
      width: '100%',
    },
  },

  pass: { backgroundColor: `${green[500]} !important` },
  fail: { backgroundColor: `${red[500]} !important` },
});

function MonkeyButtons(props) {
  const { classes, submission, submissionDispatch } = props;

  return (
    <Grid container className={classes.root} direction="row" spacing={16}>
      <Grid item xs={6}>
        <Button
          color="primary"
          className={classes.pass}
          variant="contained"
          size="large"
          onClick={() => {
            updateDoc(COLLECTIONS.submissions, submission.id, {
              outcome: 'pass',
              screened: true,
            });
          }}
        >
          <PassIcon className={classes.icon} /> Pass
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          color="primary"
          className={classes.fail}
          variant="contained"
          size="large"
          onClick={() => {
            updateDoc(COLLECTIONS.submissions, submission.id, {
              outcome: 'fail',
              screened: true,
            });
          }}
        >
          <FailIcon className={classes.icon} /> Fail
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          color="primary"
          onClick={() => {
            submissionDispatch({ type: 'skip' });
          }}
        >
          <SkipIcon className={classes.icon} /> Skip
        </Button>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(MonkeyButtons);
