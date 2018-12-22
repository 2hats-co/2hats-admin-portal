import React, { useState, useEffect, useMemo } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import SubmissionIcon from '@material-ui/icons/DescriptionOutlined';
import ResumeIcon from '@material-ui/icons/Attachment';

import { useSearch } from '../../hooks/useSearch';
import { ROUTES } from '../../constants/routes';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  paperRoot: {
    borderRadius: theme.shape.roundBorderRadius,
    width: 664,
    margin: '48px auto 0',
    outline: 'none',
    maxHeight: 'calc(100vh - 96px)',
    overflow: 'hidden',
  },
  nbHits: {
    fontSize: 16,
    position: 'absolute',
    right: 25,
    top: 25,
    fontWeight: 'bold',
    color: '#555',
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
      backgroundColor: 'rgba(0,0,0,.1)',

      position: 'absolute',
      left: 28,
      bottom: 0,
    },
  },
  listWrapper: {
    maxHeight: 'calc(100vh - 96px - 64px)',
    overflowY: 'scroll',
  },
  listRoot: {
    // borderRadius: '0 0 20px 20px',
    overflow: 'hidden',
  },
  listItem: {
    transition: 'background-color .2s',
    '&:hover': {
      backgroundColor: theme.palette.divider,
    },
  },
  listIcon: {
    margin: 0,
  },
  secondaryAction: {
    right: theme.spacing.unit,
  },
  noResults: {
    paddingLeft: '40px !important',
    opacity: 0.54,
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

  const onClose = () => {
    setSlideIn(false);
    setTimeout(() => {
      setShowSearch(false);
    }, 100);
  };

  const handleRoute = hit => {
    const { status, objectID } = hit;
    // console.log(stage, status, objectID);
    if (
      status !== 'pre-review' ||
      status !== 'incomplete' ||
      status !== 'complete'
    ) {
      history.push(`${ROUTES.submissions}?uid=${objectID}`);
    }
  };

  // console.log('results (re-render)', results);

  let resultItems = [];
  if (results.hits && results.hits.length > 0) {
    const resultItemsToRender = results.hits.map((hit, i) => (
      <ListItem key={i} className={classes.listItem}>
        <ListItemIcon classes={{ root: classes.listIcon }}>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={`${hit.firstName} ${hit.lastName}`} />
        <ListItemSecondaryAction classes={{ root: classes.secondaryAction }}>
          {hit.resume && (
            <Tooltip title="Resume">
              <IconButton
                onClick={() => {
                  window.open(hit.resume.downloadURL, '_blank');
                }}
              >
                <ResumeIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Submission">
            <IconButton
              onClick={() => {
                handleRoute(hit);
              }}
            >
              <SubmissionIcon />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
    ));
    resultItems = useMemo(() => resultItemsToRender, [
      results.nbHits,
      results.hitsPerPage,
    ]);
  }

  return (
    <Modal open={showSearch} onClose={onClose} disableAutoFocus>
      <Slide in={slideIn} direction="down">
        <Paper elevation={24} classes={{ root: classes.paperRoot }}>
          <InputBase
            autoFocus
            className={classes.searchInput}
            onChange={e => {
              searchDispatch({ search: e.target.value });
              setHasMore(true);
            }}
            placeholder="Search candidates"
            startAdornment={<SearchIcon className={classes.searchIcon} />}
          />
          <div className={classes.nbHits}>
            found {results.nbHits} candidates
          </div>

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
              threshold={1}
            >
              <List
                className={classes.list}
                classes={{ root: classes.listRoot }}
              >
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
