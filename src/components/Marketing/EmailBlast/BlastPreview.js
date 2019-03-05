import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import withStyles from '@material-ui/core/styles/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useSearch } from '../../../hooks/useSearch';
import useDocument from '../../../hooks/useDocument';
import SearchItem from '../../Search/SearchItem';

import {
  COLLECTIONS,
  STYLES,
} from '@bit/sidney2hats.2hats.global.common-constants';
import { ROUTES } from '../../../constants/routes';

const styles = theme => ({
  root: {},

  listWrapper: {
    height: 300,
    overflowY: 'scroll',
  },

  ...STYLES.NAKED_EXPANSION_PANEL(theme),
});

function BlastPreview({ classes, query, template }) {
  const [hasMore, setHasMore] = useState(true);

  const [searchState, searchDispatch] = useSearch();
  const { results } = searchState;

  const [templateState, templateDispatch] = useDocument();
  const templateDoc = templateState.doc;

  useEffect(
    () => {
      if (template && template.value)
        templateDispatch({
          path: `${COLLECTIONS.emailTemplates}/${template.value}`,
        });
    },
    [template]
  );

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
      <ExpansionPanel
        classes={{
          root: classes.expansionPanel,
          expanded: classes.expansionPanelExpanded,
        }}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            root: classes.expansionPanelSummary,
            content: classes.expansionPanelSummaryContent,
            expanded: classes.expansionPanelSummaryExpanded,
            expandIcon: classes.expansionPanelSummaryExpandIcon,
          }}
        >
          <Typography variant="subtitle1">
            Preview template {template && template.label}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          classes={{ root: classes.expansionPanelDetails }}
        >
          {templateDoc ? (
            <div dangerouslySetInnerHTML={{ __html: templateDoc.html }} />
          ) : (
            <Typography variant="body1">No template selected</Typography>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <Divider />
      <ExpansionPanel
        classes={{
          root: classes.expansionPanel,
          expanded: classes.expansionPanelExpanded,
        }}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            root: classes.expansionPanelSummary,
            content: classes.expansionPanelSummaryContent,
            expanded: classes.expansionPanelSummaryExpanded,
            expandIcon: classes.expansionPanelSummaryExpandIcon,
          }}
        >
          <Typography variant="subtitle1">
            You’re going to blast <b>{results.nbHits}</b> people
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          classes={{ root: classes.expansionPanelDetails }}
        >
          <Divider />
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
}

export default withStyles(styles)(BlastPreview);
