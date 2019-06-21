import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/EditOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import OpenIcon from '@material-ui/icons/ArrowForwardIos';
import RecipientsIcon from '@material-ui/icons/GroupOutlined';

import EmailAnalytics from './EmailAnalytics';

import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

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

    '& > *': { justifyContent: 'flex-end' },
  },
});

function EmailTemplateCard(props) {
  const { classes, data, actions } = props;
  return (
    <>
      <Card classes={{ root: classes.root }} elevation={0}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={4}>
            <Grid container>
              <Grid item>{''}</Grid>
              <Grid item xs>
                <Typography variant="subtitle1">
                  {data.label}
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="span"
                    style={{ display: 'inline' }}
                  >
                    {data.delay ? ` · sent after ${data.delay} days` : ''}
                  </Typography>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <b>Subject:</b> {data.subject}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  last updated&nbsp;
                  {data.updatedAt
                    ? moment.unix(data.updatedAt.seconds).fromNow()
                    : 'at unknown time'}
                  &nbsp;•&nbsp;created&nbsp;
                  {data.createdAt
                    ? moment.unix(data.createdAt.seconds).fromNow()
                    : 'at unknown time'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6} className={classes.rightAligned}>
            <EmailAnalytics
              analyticsCollection={`${COLLECTIONS.emailTemplates}/${
                data.id
              }/analytics`}
            />
          </Grid>

          <Grid item xs={2} className={classes.rightAligned}>
            <Tooltip title="View recipients">
              <IconButton onClick={actions.viewRecipients}>
                <RecipientsIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit Template Properties">
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
    </>
  );
}

export default withStyles(styles)(EmailTemplateCard);
