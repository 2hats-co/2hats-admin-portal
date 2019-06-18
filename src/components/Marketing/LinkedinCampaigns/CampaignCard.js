import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import StartIcon from '@material-ui/icons/PlayCircleOutline';
import ReplayIcon from '@material-ui/icons/Replay';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import ErrorIcon from '@material-ui/icons/Error';

import CampaignDetails from './CampaignDetails';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
    padding: `${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 3}px`,
    boxShadow: `0 0 0 1px ${theme.palette.divider}`,
  },
  runButton: {
    marginRight: theme.spacing.unit,
    marginLeft: -theme.spacing.unit,
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
  rightAligned: {
    textAlign: 'right',
  },
  errorIcon: {
    verticalAlign: 'text-bottom',
    marginRight: theme.spacing.unit / 2,
  },
});
function CampaignCard(props) {
  const { classes, data, actions } = props;

  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  let primaryButton = (
    <Tooltip title="Run Campaign">
      <IconButton
        className={classes.runButton}
        onClick={() => {
          actions.run(data.id);
        }}
      >
        <StartIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  );

  if (data.startPage >= 100)
    primaryButton = (
      <Tooltip title="Re-run Campaign">
        <IconButton
          className={classes.runButton}
          onClick={() => {
            actions.rerun(data.id);
          }}
        >
          <ReplayIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    );

  return (
    <>
      <Card classes={{ root: classes.root }} elevation={0}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={7}>
            <Grid container>
              <Grid item>{primaryButton}</Grid>
              <Grid item xs>
                <Typography variant="h6">
                  {data.query}
                  {data.needsToRun && (
                    <span className={classes.live}>Pending</span>
                  )}
                </Typography>
                <Typography variant="body2">
                  {data.email} · created&nbsp;
                  {data.createdAt
                    ? moment.unix(data.createdAt.seconds).fromNow()
                    : 'at unknown time'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2} className={classes.rightAligned}>
            <Typography variant="h6">{data.requestsCount}</Typography>
            <Typography variant="body2">Connection requests</Typography>
          </Grid>
          {data.startPage >= 100 ? (
            <Tooltip
              title={
                <>
                  This campaign has hit the LinkedIn search result limit. Please{' '}
                  <b>re-run the campaign</b> and optionally modify the search
                  term slightly.
                </>
              }
            >
              <Grid item xs={1} className={classes.rightAligned}>
                <Typography variant="h6" color="error">
                  <ErrorIcon color="error" className={classes.errorIcon} />
                  {data.startPage}
                </Typography>
                <Typography variant="body2" color="error">
                  Last page
                </Typography>
              </Grid>
            </Tooltip>
          ) : (
            <Grid item xs={1} className={classes.rightAligned}>
              <Typography variant="h6">{data.startPage}</Typography>
              <Typography variant="body2">Last page</Typography>
            </Grid>
          )}

          <Grid item xs={2} className={classes.rightAligned}>
            <Tooltip title="Edit Campaign">
              <IconButton onClick={actions.edit}>
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Campaign Details">
              <IconButton
                onClick={() => {
                  setShowDetailsDialog(true);
                }}
              >
                <InfoIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Campaign">
              <IconButton
                onClick={() => {
                  actions.delete(data.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Card>

      <CampaignDetails
        showDialog={showDetailsDialog}
        setShowDialog={setShowDetailsDialog}
        data={data}
      />
    </>
  );
}

export default withStyles(styles)(CampaignCard);
