import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import PassIcon from '@material-ui/icons/CheckCircle';
import FailIcon from '@material-ui/icons/Error';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import Friction from '../../Friction';

const styles = theme => ({
  root: {
    '&+&': {
      borderTop: `1px solid ${theme.palette.divider}`,
      paddingTop: theme.spacing.unit / 2,
    },
  },

  actionButtons: { marginRight: -theme.spacing.unit * 1.5 },

  title: { lineHeight: 1.25 },
  message: {
    marginBottom: theme.spacing.unit * 2,
    whiteSpace: 'pre-line',
  },
  messageText: { marginTop: 2 },

  passIcon: {
    marginRight: theme.spacing.unit,
    color: green[500],
  },
  failIcon: {
    marginRight: theme.spacing.unit,
    color: red[500],
  },
});

const Criterion = props => {
  const { classes, data, setEditTarget, handleDelete } = props;

  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1" className={classes.title}>
            {data.title}
          </Typography>
        </Grid>

        <Grid item className={classes.actionButtons}>
          <IconButton onClick={setEditTarget}>
            <EditIcon />
          </IconButton>

          <Friction
            message={{
              title: `Are you sure you want to delete ${data.title}?`,
              body: 'You won’t be able to recover it',
            }}
          >
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Friction>
        </Grid>
      </Grid>

      <Grid container className={classes.message}>
        <Grid item>
          <PassIcon className={classes.passIcon} />
        </Grid>
        <Grid item xs>
          <Typography variant="body2" className={classes.messageText}>
            {data.pass}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.message}>
        <Grid item>
          <FailIcon className={classes.failIcon} />
        </Grid>
        <Grid item xs>
          <Typography variant="body2" className={classes.messageText}>
            {data.fail}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Criterion);
