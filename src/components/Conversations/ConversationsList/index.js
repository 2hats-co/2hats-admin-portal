import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import ForumIcon from '@material-ui/icons/Forum';

import InfiniteScroll from 'react-infinite-scroller';

import useCollection from '../../../hooks/useCollection';
import AdminSelector from '../../AdminSelector';
import Item from './Item';

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
function ConversationsList(props) {
  const { classes, setSelectedConversation, selectedConversation, uid } = props;
  const [conversationsState, conversationsDispatch] = useCollection({
    path: `conversations`,
    sort: { field: 'lastMessage.sentAt', direction: 'desc' },
    filters: [subscriberFilter(uid)],
  });
  const conversations = conversationsState.documents;
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState('all');
  const [filters, setFilters] = useState([subscriberFilter(uid)]);
  useEffect(
    () => {
      if (filter === 'unread') {
        setFilters([unreadFilter(uid)]);
      } else {
        setFilters([subscriberFilter(uid)]);
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
  useEffect(
    () => {
      setHasMore(true);
    },
    [conversationsState.documents]
  );
  const loadMore = num => {
    if (hasMore) {
      setHasMore(false);
      conversationsDispatch({ type: 'more' });
    }
  };

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
        <AdminSelector
          onSelect={uid => {
            setFilters([assigneeFilter(uid)]);
          }}
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
          <Tab value="all" label="All" />
          <Tab value="unread" label="Unread" />
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
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            //BROKEN
            loadMore={() => {
              loadMore();
            }}
            hasMore={hasMore}
            loader={
              conversationsState.loading ? (
                <LinearProgress
                  key="listLoader"
                  className={classes.listLoader}
                />
              ) : null
            }
            useWindow={false}
            threshold={100}
          >
            <List disablePadding>
              {conversations.map(x => (
                <Item
                  onClick={() => {
                    setSelectedConversation(x);
                  }}
                  data={x}
                  key={x.id}
                  selected={
                    selectedConversation && x.id === selectedConversation.id
                  }
                  isUnread={x.unreadAdmins.includes(uid)}
                  // isStarred={x.isStarred}
                />
              ))}
            </List>
          </InfiniteScroll>
        </Grid>
      )}
    </Grid>
  );
}

export default withStyles(styles)(ConversationsList);
