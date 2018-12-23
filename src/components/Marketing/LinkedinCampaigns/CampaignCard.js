import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StartIcon from '@material-ui/icons/PlayArrow';
import { Tooltip } from '@material-ui/core';
const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
    padding: `${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 3}px`,
    boxShadow: `0 0 0 1px ${theme.palette.divider}`,
  },
  rightAligned: {
    textAlign: 'right',
  },
});
function CampaignCard(props) {
  const { classes, data, actions } = props;
  console.log(data);
  return (
    <Card classes={{ root: classes.root }} elevation={0}>
      <Grid container justify="space-between">
        <Grid item xs={1}>
          <Tooltip title="Run Campaign">
            <IconButton
              onClick={() => {
                actions.run(data.id);
              }}
            >
              <StartIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6">{data.query}</Typography>
          <Typography variant="body2">
            account {data.email} · created {moment(data.createdAt).fromNow()}
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.rightAligned}>
          <Typography variant="h6">{data.requestsCount}</Typography>
          <Typography variant="body2">Connection Requests</Typography>
        </Grid>
        <Grid item xs={2} className={classes.rightAligned}>
          <Typography variant="h6">{data.startPage}</Typography>
          <Typography variant="body2">Last Page</Typography>
        </Grid>
        <Grid item xs={1} className={classes.rightAligned}>
          <Tooltip title="Edit Campaign">
            <IconButton onClick={actions.edit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1} className={classes.rightAligned}>
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
  );
}

export default withStyles(styles)(CampaignCard);
