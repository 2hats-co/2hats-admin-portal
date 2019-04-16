import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import withNavigation from '../components/withNavigation';
import { ROUTES } from '../constants/routes';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
// import Tooltip from '@material-ui/core/Tooltip';
// import IconButton from '@material-ui/core/IconButton';
// import FilterIcon from '@material-ui/icons/FilterList';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';

import LocationIndicator from '../components/LocationIndicator';
// import AdminSelector from '../components/AdminSelector';
// import Filter from '../components/Subjects/Filter';
import ClientItem from '../components/Subjects/ClientItem';
import SubjectItem from '../components/Subjects/SubjectItem';
//import useCollection from '../hooks/useCollection';
import useAlgolia from '../hooks/useAlgolia';
import LoadingHat from '../components/LoadingHat';
import { createDoc, updateDoc } from '../utilities/firestore';

import AlgoliaScrollyRolly from '../components/AlgoliaScrollyRolly';
import Form from '../components/Form';
import clientFields from '../constants/forms/clients';
import ClientDrawer from '../components/Subjects/ClientDrawer';
import CandidateDrawer from '../components/Subjects/CandidateDrawer';
import BottomSheet from '../components/Subjects/BottomSheet';
import SubjectSearch from '../components/Subjects/SubjectSearch';

const styles = theme => ({
  wrapper: {
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
  },
  root: {
    height: '100vh',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.background.paper,
  },
  locationIndicator: {
    zIndex: 10,
  },

  searchBox: {
    position: 'absolute',
    top: theme.spacing.unit * 1.5,
    right: theme.spacing.unit * 2,
    zIndex: 50,
  },

  filterContainer: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    boxShadow:
      theme.palette.type !== 'dark'
        ? theme.shadows[1]
        : `0 0 0 1px ${theme.palette.divider}`,
    zIndex: 9,
  },
  clearFilterButton: {
    padding: 0,
    marginRight: theme.spacing.unit,
    width: 36,
    height: 36,
  },
  subjectListContainer: {
    width: '100%',
    overflowY: 'auto',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

// const CANIDIDATE_FILTERS = [];

// const CLIENT_FILTERS = [
//   {
//     title: 'Assignee',
//     type: 'admin',
//   },

//   {
//     title: 'Industry',
//     type: 'search',
//     values: ['IT', 'HEALTH', 'MARKETING', 'CONSTRUCTION', 'ACCOUNTING'],
//   },
// ];

// const assigneeFilter = (currentFilters, uid) => {
//   let filters = currentFilters.filter(x => x.field !== 'assignee');
//   filters.push({
//     field: 'assignee',
//     operator: '==',
//     value: uid,
//   });
//   return filters;
// };

function CandidatesContainer(props) {
  const { classes, route, history, location } = props;

  const [candidateDrawer, setCandidateDrawer] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleSelect = data => {
    const index = selected.findIndex(x => x.objectID === data.objectID);
    // Add to array if not already in array
    if (index === -1) setSelected([data, ...selected]);
  };
  const removeFromSelected = index => {
    const newSelected = [...selected];
    newSelected.splice(index, 1);
    setSelected(newSelected);
  };
  // useEffect(
  //   () => {
  //     console.log(selected);
  //   },
  //   [selected]
  // );

  useEffect(
    () => {
      if (!!candidateDrawer) setShowDrawer(true);
      else setShowDrawer(false);

      const parsedQuery = queryString.parse(location.search);
      if (candidateDrawer && candidateDrawer.objectID)
        parsedQuery.id = candidateDrawer.objectID;
      else if (parsedQuery.id) delete parsedQuery.id;

      const searchString = queryString.stringify(parsedQuery);

      history.push(`${location.pathname}?${searchString}`);
    },
    [candidateDrawer]
  );

  const parsedQuery = queryString.parse(location.search);

  const [hits, setQuery, results, loadMore] = useAlgolia(parsedQuery.query);
  const subjects = hits;

  // helper function to sync search query to URL params
  const searchForQuery = query => {
    setQuery(query);

    const parsedQuery = queryString.parse(location.search);
    if (query.trim().length > 0) parsedQuery.query = query;
    else if ('query' in parsedQuery) delete parsedQuery.query;
    const searchString = queryString.stringify(parsedQuery);
    history.push(`${location.pathname}?${searchString}`);
  };

  const [snackbarContent, setSnackbarContent] = useState('');

  return (
    <div className={classes.wrapper}>
      <Grid container direction="column" wrap="nowrap" className={classes.root}>
        <Grid item>
          <LocationIndicator
            classes={{ root: classes.locationIndicator }}
            showBorder
            title="Directory"
            subRoutes={[
              { label: 'Clients', value: ROUTES.clients },
              { label: 'Candidates', value: ROUTES.candidates },
            ]}
          />
          <SubjectSearch
            className={classes.searchBox}
            searchForQuery={searchForQuery}
            location={location}
            numDisplayedResults={hits && hits.length}
            numResults={results && results.nbHits}
          />
        </Grid>

        <Grid item xs className={classes.subjectListContainer}>
          <AlgoliaScrollyRolly hits={hits} loadMore={loadMore} disablePadding>
            {(x, i) => {
              return route === ROUTES.clients ? (
                <ClientItem
                  key={x.objectID}
                  data={x}
                  setSnackbarContent={setSnackbarContent}
                />
              ) : (
                <SubjectItem
                  key={x.objectID}
                  data={x}
                  setCandidateDrawer={setCandidateDrawer}
                  setSnackbarContent={setSnackbarContent}
                  selectHandler={handleSelect}
                />
              );
            }}
          </AlgoliaScrollyRolly>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarContent.length > 0}
        autoHideDuration={1500}
        onClose={() => {
          setSnackbarContent('');
        }}
        message={
          <span id="message-id">Copied to clipboard: {snackbarContent}</span>
        }
      />

      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => {
          setShowDrawer(false);
          setTimeout(() => {
            setCandidateDrawer(null);
          }, 333);
        }}
      >
        {candidateDrawer && <CandidateDrawer data={candidateDrawer} />}
      </Drawer>

      <BottomSheet
        selected={selected}
        setCandidateDrawer={setCandidateDrawer}
        removeFromSelected={removeFromSelected}
      />
    </div>
  );
}

export default withNavigation(withStyles(styles)(CandidatesContainer));
