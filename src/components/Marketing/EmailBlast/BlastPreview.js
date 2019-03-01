import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import withStyles from '@material-ui/core/styles/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { useSearch } from '../../../hooks/useSearch';
import SearchItem from '../../Search/SearchItem';

import { ROUTES } from '../../../constants/routes';

const styles = theme => ({
  root: {},

  listWrapper: {
    height: 300,
    overflowY: 'scroll',
  },
});

function BlastPreview({ classes, query }) {
  const [hasMore, setHasMore] = useState(true);

  const [searchState, searchDispatch] = useSearch();
  const { results } = searchState;

  useEffect(
    () => {
      setHasMore(results.hitsPerPage < results.nbHits);
    },
    [results.hitsPerPage]
  );
  useEffect(
    () => {
      searchDispatch({ search: query });
      setHasMore(true);
    },
    [query]
  );
  const loadMore = num => {
    if (hasMore) {
      setHasMore(false);
      searchDispatch({ type: 'more' });
    }
  };

  const handleConversationRoute = hit => {
    const { conversationId, objectID } = hit;
    if (conversationId)
      window.open(`${ROUTES.conversations}?id=${conversationId}`, '_blank');
    else window.open(`${ROUTES.conversations}?uid=${objectID}`, '_blank');
  };

  let resultItems = [];
  if (results.hits && results.hits.length > 0) {
    resultItems = results.hits.map((hit, i) => (
      <SearchItem
        key={i}
        hit={hit}
        handleRoutes={{
          //submission: handleSubmissionRoute,
          conversation: handleConversationRoute,
        }}
      />
    ));
  }

  return (
    <>
      <Typography variant="body1" gutterBottom>
        Are you sure you want to blast <b>{results.nbHits}</b> people,
        including:
      </Typography>
      <Divider />
      <div className={classes.listWrapper}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={
            <LinearProgress key="listLoader" className={classes.listLoader} />
          }
          useWindow={false}
          threshold={100}
        >
          <List disablePadding>
            {resultItems.length > 0 ? (
              resultItems
            ) : (
              <ListItem>
                <ListItemText
                  primary="No results"
                  className={classes.noResults}
                />
              </ListItem>
            )}
          </List>
        </InfiniteScroll>
      </div>
      <Divider />
    </>
  );
}

export default withStyles(styles)(BlastPreview);
