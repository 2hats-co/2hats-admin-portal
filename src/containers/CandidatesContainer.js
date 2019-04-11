import React, { useState, useEffect } from 'react';
import withNavigation from '../components/withNavigation';
import { ROUTES } from '../constants/routes';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

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

import ScrollyRolly from '../components/AlgoliaScrollyRolly';
import Form from '../components/Form';
import clientFields from '../constants/forms/clients';
import ClientDrawer from '../components/Subjects/ClientDrawer';
import CandidateDrawer from '../components/Subjects/CandidateDrawer';

const styles = theme => ({
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
  searchField: {
    margin: 10,
    width: 400,
  },
  count: {
    position: 'absolute',
    top: theme.spacing.unit * 2.25,
    right: theme.spacing.unit * 3,
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

function SubjectsContainer(props) {
  const { classes, route } = props;

  const [candidateDrawer, setCandidateDrawer] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(
    () => {
      if (!!candidateDrawer) setShowDrawer(true);
      else setShowDrawer(false);
    },
    [candidateDrawer]
  );

  const [hits, setQuery, results, loadMore] = useAlgolia();
  const subjects = hits;

  const [snackbarContent, setSnackbarContent] = useState('');

  return (
    <>
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
          <TextField
            className={classes.searchField}
            label="search"
            variant="outlined"
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
          <Typography variant="subtitle1" className={classes.count}>
            {subjects && subjects.length}
          </Typography>
        </Grid>

        <Grid item xs className={classes.subjectListContainer}>
          <ScrollyRolly hits={hits} loadMore={loadMore} disablePadding>
            {(x, i) => {
              return route === ROUTES.clients ? (
                <ClientItem
                  key={x.id}
                  data={x}
                  setSnackbarContent={setSnackbarContent}
                />
              ) : (
                <SubjectItem
                  key={x.id}
                  data={x}
                  setCandidateDrawer={setCandidateDrawer}
                  setSnackbarContent={setSnackbarContent}
                />
              );
            }}
          </ScrollyRolly>
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
    </>
  );
}

export default withNavigation(
  withStyles(styles, { withTheme: true })(SubjectsContainer)
);
