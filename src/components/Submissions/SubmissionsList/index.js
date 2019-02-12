import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import ForumIcon from '@material-ui/icons/Forum';
import UnreadIcon from '@material-ui/icons/Markunread';
import ClientIcon from '@material-ui/icons/BusinessCenter';
import CandidateIcon from '@material-ui/icons/School';
import SpamIcon from '@material-ui/icons/Report';
import useCollection from '../../../hooks/useCollection';
import Item from './Item';
import ScrollyRolly from '../../ScrollyRolly';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  adminSelectorWrapper: {
    marginTop: -theme.spacing.unit * 7,
    marginBottom: theme.spacing.unit,
    textAlign: 'right',
    paddingRight: theme.spacing.unit,
  },
  tabs: {
    boxShadow: `0 -1px 0 ${theme.palette.divider} inset`,
  },
  tabLabelContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  noConvs: {
    height: '100%',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    cursor: 'default',
    userSelect: 'none',
    '& svg': {
      fontSize: 48,
      color: theme.palette.text.disabled,
    },
  },
});

const unreadFilter = uid => ({
  field: 'unreadAdmins',
  operator: 'array-contains',
  value: uid,
});
const subscriberFilter = uid => ({
  field: 'subscribedAdmins',
  operator: 'array-contains',
  value: uid,
});
const assigneeFilter = uid => ({
  field: 'assignee',
  operator: '==',
  value: uid,
});
const candidateFilter = uid => ({
  field: 'UID',
  operator: '==',
  value: uid,
});

const orderbySubmissionTime = { field: 'createdAt', direction: 'asc' };
const orderByType = { field: 'type', direction: 'asc' };
const categoryFilter = category => ({
  field: 'category',
  operator: '==',
  value: category,
});

function SubmissionsList(props) {
  const { classes, setSelectedSubmission, selectedSubmission } = props;

  const [submissionsState, submissionsDispatch] = useCollection({
    path: COLLECTIONS.submissions,
    sort: [orderbySubmissionTime],
    filters: [{ field: 'outcome', operator: '==', value: 'pending' }],
  });
  const submissions = submissionsState.documents;

  // const [filter, setFilter] = useState('all');
  // const [filters, setFilters] = useState([subscriberFilter(uid)]);
  // const [sorts, setSorts] = useState([orderByType, orderbyLastMessage]);
  // const [category, setCategory] = useState('');

  // useEffect(
  //   () => {
  //     if (filter) setCategory('');
  //     switch (filter) {
  //       case 'unread':
  //         setSorts([orderByType, orderbyLastMessage]);
  //         setFilters([unreadFilter(uid)]);
  //         break;
  //       case 'candidate':
  //         setSorts([orderbyLastMessage]);
  //         setFilters([candidateFilter]);
  //         break;
  //       case 'client':
  //         setSorts([orderbyLastMessage]);
  //         setFilters([subscriberFilter(uid), clientFilter]);
  //         break;
  //       case 'spam':
  //         setSorts([orderbyLastMessage]);
  //         setFilters([spamFilter]);
  //         break;
  //       case 'all':
  //         setSorts([orderByType, orderbyLastMessage]);
  //         setFilters([subscriberFilter(uid), notSpamFilter]);
  //         break;
  //       default:
  //         break;
  //     }
  //   },
  //   [filter]
  // );

  // useEffect(
  //   () => {
  //     conversationsDispatch({ filters: filters, sort: sorts });
  //   },
  //   [filters]
  // );

  if (submissionsState.loading)
    return (
      <Grid
        container
        style={{ height: 'calc(100vh - 60px)' }}
        justify="center"
        alignItems="center"
      >
        <CircularProgress size={64} />
      </Grid>
    );

  return (
    <Grid container direction="column" style={{ height: 'calc(100vh - 60px)' }}>
      {submissions && submissions.length === 0 ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.noConvs}
        >
          <Grid item>
            <ForumIcon />
            <Typography variant="subtitle1" color="textSecondary">
              No submissions
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs style={{ overflowY: 'scroll' }}>
          <ScrollyRolly
            classes={{ listLoader: classes.listLoader }}
            dataState={submissionsState}
            dataDispatch={submissionsDispatch}
            disablePadding
          >
            {data => (
              <Item
                onClick={() => {
                  setSelectedSubmission(data);
                }}
                submission={data}
                key={data.id}
                selected={
                  selectedSubmission && data.id === selectedSubmission.id
                }
              />
            )}
          </ScrollyRolly>
        </Grid>
      )}
    </Grid>
  );
}

export default withStyles(styles)(SubmissionsList);
