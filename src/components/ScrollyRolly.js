import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';

import withTheme from '@material-ui/core/styles/withTheme';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function ScrollyRolly(props) {
  const {
    classes,
    theme,
    dataState,
    dataDispatch,
    disablePadding,
    reverse,
    sort,
    NoneIcon,
    noneText,
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
          {sortedDocs.length > 0 ? (
            sortedDocs.map(props.children)
          ) : (
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{
                height: '100%',
                color: theme.palette.text.secondary,
                textAlign: 'center',
                cursor: 'default',
                userSelect: 'none',
                paddingTop: theme.spacing.unit * 4,
              }}
            >
              <Grid item>
                {NoneIcon && (
                  <NoneIcon
                    style={{ fontSize: 48, color: theme.palette.text.disabled }}
                  />
                )}
                <Typography variant="subtitle1" color="textSecondary">
                  {noneText || 'No items'}
                </Typography>
              </Grid>
            </Grid>
          )}
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

export default withTheme()(ScrollyRolly);
