import React, { useState, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

import CloseIcon from '@material-ui/icons/Close';

import ConnectionRequest from './ConnectionRequest';
import useCollection from '../../../hooks/useCollection';
import InfiniteScroll from 'react-infinite-scroller';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
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
  dialogContent: {
    paddingBottom: 0,
  },
  dialogSection: {
    '&:first-of-type': { marginBottom: theme.spacing.unit * 4 },
  },
  sectionTitle: {
    marginBottom: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  listRoot: {
    paddingTop: 0,
  },
  infiniteScrollWrapper: {
    overflowY: 'auto',
    minHeight: 200,
    height: 'calc(100vh - 480px)',
    marginTop: -theme.spacing.unit,
    marginLeft: -theme.spacing.unit * 3,
    marginRight: -theme.spacing.unit * 3,
  },
  listLoader: {
    marginTop: theme.spacing.unit * 2,
  },
});

function CampaignDetailsDialog(props) {
  const { classes, data, setShowDialog } = props;

  const [hasMore, setHasMore] = useState(false);

  const [recentConnectionsState, recentConnectionsDispatch] = useCollection(
    `linkedinCampaigns/${data.id}/requests`,
    { sort: { field: 'createdAt', direction: 'desc' } }
  );
  const recentConnections = recentConnectionsState.documents;

  useEffect(
    () => {
      if (
        recentConnectionsState.loading ||
        recentConnectionsState.limit === recentConnectionsState.cap
      ) {
        setHasMore(false);
      } else {
        setHasMore(
          recentConnectionsState.documents.length ===
            recentConnectionsState.limit
        );
      }
    },
    [recentConnectionsState]
  );

  const loadMore = () => {
    if (hasMore) {
      setHasMore(false);
      recentConnectionsDispatch({ type: 'more' });
    }
  };

  return (
    <React.Fragment>
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

      <DialogContent className={classes.dialogContent}>
        <div className={classes.dialogSection}>
          <Typography variant="subtitle1" className={classes.sectionTitle}>
            Stats (*fake data)
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Typography variant="h6">
                {parseInt(data.startPage, 10) * 10}
              </Typography>
              <Typography variant="body1">
                <b>of {data.totalResults}</b>
              </Typography>
              <Typography variant="body2">Scanned results</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="h6">{data.startPage}</Typography>
              <Typography variant="body2">Last page</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="h6">
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
              <Typography variant="h6">
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
              <Typography variant="h6">{data.requestsCount}</Typography>
              <Typography variant="body2">
                Connection
                <br />
                requests
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="h6">{data.connectionsPerSession}</Typography>
              <Typography variant="body2">
                Connections
                <br />
                per session
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="h6">
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

        {recentConnections && recentConnections.length > 0 && (
          <div className={classes.dialogSection}>
            <Typography variant="subtitle1" className={classes.sectionTitle}>
              Latest connection request
              {recentConnections.length > 1 ? 's ' : ' '}(
              {recentConnections.length})
            </Typography>

            <div className={classes.infiniteScrollWrapper}>
              <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={
                  <LinearProgress
                    key="listLoader"
                    className={classes.listLoader}
                  />
                }
                useWindow={false}
                threshold={1}
              >
                <List classes={{ root: classes.listRoot }}>
                  {recentConnections.map(data => (
                    <ConnectionRequest key={data.fullName} data={data} />
                  ))}
                </List>
              </InfiniteScroll>
            </div>
          </div>
        )}
      </DialogContent>
    </React.Fragment>
  );
}

function CampaignDetails(props) {
  const { classes, showDialog, setShowDialog, data } = props;

  return (
    <Dialog
      open={showDialog}
      onClose={() => {
        setShowDialog(false);
      }}
    >
      <CampaignDetailsDialog
        classes={classes}
        data={data}
        setShowDialog={setShowDialog}
      />
    </Dialog>
  );
}

export default withStyles(styles)(CampaignDetails);
