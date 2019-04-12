import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';

import withTheme from '@material-ui/core/styles/withTheme';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function AlgoliaScrollyRolly(props) {
  const {
    classes,
    theme,
    loadMore,
    disablePadding,
    reverse,
    NoneIcon,
    noneText,
    hits,
  } = props;

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  if (hits)
    return (
      <>
        {reverse && loading && (
          <LinearProgress
            key="listLoader"
            className={classes && classes.listLoader}
          />
        )}
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          useWindow={false}
          threshold={500}
          isReverse={reverse || false}
        >
          <List
            disablePadding={disablePadding || false}
            className={classes && classes.list}
          >
            {hits.length > 0 ? (
              hits.map(props.children)
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
                      style={{
                        fontSize: 48,
                        color: theme.palette.text.disabled,
                      }}
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
      </>
    );

  return null;
}

export default withTheme()(AlgoliaScrollyRolly);
