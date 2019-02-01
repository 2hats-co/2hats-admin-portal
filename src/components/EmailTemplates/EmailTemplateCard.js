import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import CopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import OpenIcon from '@material-ui/icons/ArrowForwardIos';

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
});
function EmailTemplateCard(props) {
  const { classes, data, actions } = props;
  return (
    <React.Fragment>
      <Card classes={{ root: classes.root }} elevation={0}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={4}>
            <Grid container>
              <Grid item>{''}</Grid>
              <Grid item xs>
                <Typography variant="h6">
                  {data.label}
                  {data.delay ? `(after ${data.delay} days)` : ''}
                </Typography>
                <Typography variant="body2">
                  subject: {data.subject} - created&nbsp;
                  {data.createdAt
                    ? moment.unix(data.createdAt.seconds).fromNow()
                    : 'at unknown time'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2} className={classes.rightAligned}>
            <Typography variant="h6">{'--%'}</Typography>
            <Typography variant="body2">Open Rate</Typography>
          </Grid>
          <Grid item xs={2} className={classes.rightAligned}>
            <Typography variant="h6">{'--%'}</Typography>
            <Typography variant="body2">Click Rate</Typography>
          </Grid>
          <Grid item xs={2} className={classes.rightAligned}>
            <Typography variant="h6">{'--%'}</Typography>
            <Typography variant="body2">Bounce Rate</Typography>
          </Grid>

          <Grid item xs={2} className={classes.rightAligned}>
            <Tooltip title="Edit Template">
              <IconButton onClick={actions.edit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Template">
              <IconButton onClick={actions.editTemplate}>
                <OpenIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
}

export default withStyles(styles)(EmailTemplateCard);
