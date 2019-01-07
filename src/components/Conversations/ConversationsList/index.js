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
import AdminSelector from '../../AdminSelector';
import CategoryFilter from './CategoryFilter';
import Item from './Item';
import ScrollyRolly from '../../ScrollyRolly';

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
const candidateFilter = {
  field: 'type',
  operator: '==',
  value: 'candidate',
};
const clientFilter = {
  field: 'type',
  operator: '==',
  value: 'client',
};
const spamFilter = {
  field: 'type',
  operator: '==',
  value: 'spam',
};
const notSpamFilter = {
  field: 'type',
  operator: '<',
  value: 'spam',
};
const categoryFilter = category => ({
  field: 'category',
  operator: '==',
  value: category,
});

function ConversationsList(props) {
  const { classes, setSelectedConversation, selectedConversation, uid } = props;
  const [conversationsState, conversationsDispatch] = useCollection({
    path: `conversations`,
    sort: [
      { field: 'type', direction: 'asc' },
      { field: 'lastMessage.sentAt', direction: 'desc' },
    ],
    filters: [subscriberFilter(uid)],
  });
  const conversations = conversationsState.documents;

  const [filter, setFilter] = useState('all');
  const [filters, setFilters] = useState([subscriberFilter(uid)]);
  const [category, setCategory] = useState('');

  useEffect(
    () => {
      if (filter) setCategory('');
      switch (filter) {
        case 'unread':
          setFilters([unreadFilter(uid)]);
          break;
        case 'candidate':
          setFilters([candidateFilter]);
          break;
        case 'client':
          setFilters([subscriberFilter(uid), clientFilter]);
          break;
        case 'spam':
          setFilters([spamFilter]);
          break;
        case 'all':
          setFilters([subscriberFilter(uid), notSpamFilter]);
          break;
        default:
          break;
      }
    },
    [filter]
  );

  useEffect(
    () => {
      conversationsDispatch({ filters: filters });
    },
    [filters]
  );

  if (conversationsState.loading)
    return (
      <Grid
        container
        style={{ height: '100%' }}
        justify="center"
        alignItems="center"
      >
        <CircularProgress size={64} />
      </Grid>
    );

  return (
    <Grid container direction="column" style={{ height: 'calc(100vh - 64px)' }}>
      <Grid item className={classes.adminSelectorWrapper}>
        <CategoryFilter
          onSelect={category => {
            if (category) setFilter('');
            setCategory(category);
            setFilters([categoryFilter(category)]);
            if (!category) setFilter('all');
          }}
          selected={category}
          setSelected={setCategory}
        />
        <AdminSelector
          onSelect={uid => {
            setFilters([assigneeFilter(uid)]);
          }}
          tooltip="Filter by assignee"
          noneText="Unassigned"
        />
      </Grid>
      <Grid item>
        <Tabs
          className={classes.tabs}
          value={filter}
          onChange={(e, v) => {
            setFilter(v);
          }}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab
            value="all"
            label="All"
            classes={{ labelContainer: classes.tabLabelContainer }}
          />

          <Tab
            value="unread"
            label={
              <Tooltip title="Unread">
                <UnreadIcon />
              </Tooltip>
            }
            classes={{ labelContainer: classes.tabLabelContainer }}
          />

          <Tab
            value="client"
            label={
              <Tooltip title="Leads">
                <ClientIcon />
              </Tooltip>
            }
            classes={{ labelContainer: classes.tabLabelContainer }}
          />

          <Tab
            value="candidate"
            label={
              <Tooltip title="Candidates">
                <CandidateIcon />
              </Tooltip>
            }
            classes={{ labelContainer: classes.tabLabelContainer }}
          />

          <Tab
            value="spam"
            label={
              <Tooltip title="Spam">
                <SpamIcon />
              </Tooltip>
            }
            classes={{ labelContainer: classes.tabLabelContainer }}
          />
        </Tabs>
      </Grid>

      {conversations && conversations.length === 0 ? (
        <Grid item xs>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.noConvs}
          >
            <Grid item>
              <ForumIcon />
              <Typography variant="subtitle1" color="textSecondary">
                No conversations
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs style={{ overflowY: 'scroll' }}>
          <ScrollyRolly
            classes={{ listLoader: classes.listLoader }}
            dataState={conversationsState}
            dataDispatch={conversationsDispatch}
            disablePadding
          >
            {data => (
              <Item
                onClick={() => {
                  setSelectedConversation(data);
                }}
                data={data}
                key={data.id}
                selected={
                  selectedConversation && data.id === selectedConversation.id
                }
                isUnread={data.unreadAdmins.includes(uid)}
              />
            )}
          </ScrollyRolly>
        </Grid>
      )}
    </Grid>
  );
}

export default withStyles(styles)(ConversationsList);
