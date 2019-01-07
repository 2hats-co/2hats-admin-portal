import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';

function ScrollyRolly(props) {
  const {
    classes,
    dataState,
    dataDispatch,
    disablePadding,
    reverse,
    sort,
  } = props;

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = num => {
    if (hasMore) {
      setHasMore(false);
      setLoading(true);
      dataDispatch({ type: 'more' });
    }
  };

  useEffect(
    () => {
      if (
        dataState.limit === dataState.cap ||
        (dataState.limit - dataState.documents.length > 0 &&
          dataState.limit - dataState.documents.length < 10)
      ) {
        setHasMore(false);
        setLoading(false);
      } else {
        setHasMore(dataState.documents.length === dataState.limit);
        if (dataState.documents.length === dataState.limit) setLoading(false);
      }
    },
    [dataState]
  );

  let sortedDocs = dataState.documents;
  if (sort) sortedDocs = sort(dataState.documents);

  return (
    <React.Fragment>
      {reverse && loading && (
        <LinearProgress
          key="listLoader"
          className={classes && classes.listLoader}
        />
      )}
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={() => {
          loadMore();
        }}
        hasMore={hasMore}
        useWindow={false}
        threshold={100}
        isReverse={reverse || false}
      >
        <List disablePadding={disablePadding || false}>
          {sortedDocs.map(props.children)}
        </List>
      </InfiniteScroll>
      {!reverse && loading && (
        <LinearProgress
          key="listLoader"
          className={classes && classes.listLoader}
        />
      )}
    </React.Fragment>
  );
}

export default ScrollyRolly;
