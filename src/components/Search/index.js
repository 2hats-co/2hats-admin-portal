import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';

import InputBase from '@material-ui/core/InputBase';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import SearchIcon from '@material-ui/icons/Search';
import useWindowSize from '../../hooks/useWindowSize';
import SearchItem from './SearchItem';
import { useSearch } from '../../hooks/useSearch';
import { ROUTES } from '../../constants/routes';
// import { sleep } from '../../utilities';
// import last from 'ramda/es/last';

const styles = theme => ({
  webRoot: {
    borderRadius: theme.shape.roundBorderRadius,
    width: 664,
    margin: '48px auto 0',
    outline: 'none',
    maxHeight: 'calc(100vh - 96px)',
    overflow: 'hidden',
  },
  mobileRoot: {
    borderRadius: theme.shape.roundBorderRadius,
    width: 'calc(100% - 0px)',
    margin: '18px auto 0',
    outline: 'none',
    maxHeight: 'calc(100vh - 96px)',
    overflow: 'hidden',
  },
  nbHits: {
    position: 'absolute',
    right: 24,
    top: 26,
    color: theme.palette.text.primary,
    zIndex: -1,
    opacity: 0.5,
  },
  enterPrompt: {
    position: 'absolute',
    right: theme.spacing.unit * 2,
    top: theme.spacing.unit * 2.5,
    backgroundColor: theme.palette.getContrastText(
      theme.palette.background.paper
    ),
    color: theme.palette.background.paper,
    boxShadow: `0 0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${
      theme.palette.background.paper
    }, ${theme.spacing.unit * 3}px 0 0 0 ${theme.palette.background.paper}`,
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`,
    borderRadius: theme.shape.borderRadius,
  },
  searchIcon: {
    fontSize: 28,
    marginRight: 12,
    opacity: 0.54,
  },
  searchInput: {
    fontSize: 24,
    fontWeight: 500,
    padding: '12px 0 12px 24px',
    width: 640,
    position: 'relative',

    '&::after': {
      content: '""',
      display: 'block',
      width: 612,
      height: 1,
      backgroundColor: theme.palette.divider,

      position: 'absolute',
      left: 28,
      bottom: 0,
    },
  },
  listWrapper: {
    maxHeight: 'calc(100vh - 96px - 64px)',
    overflowY: 'auto',
  },
  noResults: {
    paddingLeft: '40px !important',
    opacity: 0.67,
  },
  listLoader: {
    margin: `0 auto ${theme.spacing.unit * 2}px`,
    width: 620,
  },
});

function Search(props) {
  const { history, classes, showSearch, setShowSearch } = props;

  const [slideIn, setSlideIn] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchState, searchDispatch] = useSearch();
  const { results } = searchState;
  const [showEnterPrompt, setShowEnterPrompt] = useState(false);
  const windowSize = useWindowSize();

  const updateQuery = query => {
    searchDispatch({ search: query });
    setHasMore(true);
    setShowEnterPrompt(false);
  };

  useEffect(
    () => {
      setHasMore(results.hitsPerPage < results.nbHits);
    },
    [results.hitsPerPage]
  );

  const loadMore = num => {
    if (hasMore) {
      setHasMore(false);
      searchDispatch({ type: 'more' });
    }
  };

  const handleClose = () => {
    setSlideIn(false);
    setTimeout(() => {
      setShowSearch(false);
    }, 100);
  };

  const handleSubmissionRoute = hit => {
    const { status, objectID } = hit;
    if (
      status !== 'pre-review' ||
      status !== 'incomplete' ||
      status !== 'complete'
    ) {
      history.push(`${ROUTES.submissions}?uid=${objectID}`);
      handleClose();
    }
  };
  const handleConversationRoute = hit => {
    const { objectID } = hit;
    history.push(`${ROUTES.conversations}?uid=${objectID}`);
    handleClose();
  };

  let resultItems = [];
  if (results.hits && results.hits.length > 0) {
    resultItems = results.hits.map((hit, i) => (
      <SearchItem
        key={i}
        hit={hit}
        handleRoutes={{
          submission: handleSubmissionRoute,
          conversation: handleConversationRoute,
        }}
      />
    ));
  }

  return (
    <Modal open={showSearch} onClose={handleClose} disableAutoFocus>
      <Slide in={slideIn} direction="down">
        <Paper
          elevation={24}
          classes={{
            root: windowSize.isMobile ? classes.mobileRoot : classes.webRoot,
          }}
        >
          <InputBase
            autoFocus
            className={classes.searchInput}
            onKeyPress={e => {
              if (e.key === 'Enter') updateQuery(e.target.value);
              else if (!showEnterPrompt) setShowEnterPrompt(true);
            }}
            placeholder="Search candidates"
            startAdornment={<SearchIcon className={classes.searchIcon} />}
          />
          {showEnterPrompt ? (
            <div className={classes.enterPrompt}>Press Enter to search</div>
          ) : (
            resultItems.length > 0 && (
              <div className={classes.nbHits}>
                {resultItems.length} of {results.nbHits} results
              </div>
            )
          )}
          {}

          <div className={classes.listWrapper}>
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={hasMore}
              loader={
                <LinearProgress
                  key="listLoader"
                  className={classes.listLoader}
                />
              }
              useWindow={false}
              threshold={100}
            >
              <List>
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
        </Paper>
      </Slide>
    </Modal>
  );
}
export default withRouter(withStyles(styles)(Search));
