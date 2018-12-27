import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import ConnectionRequest from './ConnectionRequest';
import useCollection from '../../../hooks/useCollection';
const styles = theme => ({
  dialogTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      width: '100%',
      height: 1,
      backgroundColor: theme.palette.divider,
      position: 'relative',
      top: theme.spacing.unit * 2.5,
    },
  },
  live: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.background.paper,
    fontSize: '.7em',
    marginLeft: theme.spacing.unit,
    padding: '2px 7px 2px 8px',
    textTransform: 'uppercase',
    letterSpacing: '.1em',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  dialogSection: {
    paddingTop: theme.spacing.unit * 2,
    '& + &': {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing.unit * 3,
    },
  },
  sectionTitle: {
    marginBottom: theme.spacing.unit,
  },
});

function CampaignDetails(props) {
  const { classes, showDialog, setShowDialog, data } = props;

  const [recentConnections] = useCollection(
    `linkedinCampaigns/${data.id}/requests`,
    { sort: { field: 'createdAt', direction: 'desc' } }
  );
  return (
    <Dialog
      open={showDialog}
      onClose={() => {
        setShowDialog(false);
      }}
    >
      <DialogTitle className={classes.dialogTitle}>
        Campaign: {data.query}
        {data.needsToRun && <span className={classes.live}>Live</span>}
      </DialogTitle>

      <IconButton
        className={classes.closeButton}
        onClick={() => {
          setShowDialog(false);
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <div className={classes.dialogSection}>
          <Typography variant="subtitle1" className={classes.sectionTitle}>
            Stats (*fake data)
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Typography variant="h5">
                {Math.floor(Math.random() * 100)}
              </Typography>
              <Typography variant="body2">Total results*</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="h5">{data.startPage}</Typography>
              <Typography variant="body2">Last page</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="h5">
                {Math.floor(Math.random() * 100)}
                <small>%</small>
              </Typography>
              <Typography variant="body2">
                Accepted
                <br />
                connection rate*
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="h5">
                {Math.floor(Math.random() * 100)}
                <small>%</small>
              </Typography>
              <Typography variant="body2">
                Response
                <br />
                rate*
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="h5">{data.requestsCount}</Typography>
              <Typography variant="body2">
                Connection
                <br />
                requests
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="h5">{data.connectionsPerSession}</Typography>
              <Typography variant="body2">
                Connections
                <br />
                per session
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="h5">
                {Math.floor(Math.random() * 10)}
              </Typography>
              <Typography variant="body2">
                Connections
                <br />
                per day*
              </Typography>
            </Grid>
          </Grid>
        </div>

        {recentConnections.documents && (
          <div className={classes.dialogSection}>
            <Typography variant="subtitle1">
              Latest connection request
            </Typography>
            {recentConnections.documents.map(data => (
              //TODO:scrolly rolly
              <ConnectionRequest data={data} />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(CampaignDetails);
