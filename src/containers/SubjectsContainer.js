import React, { useState, useEffect } from 'react';
import withNavigation from '../components/withNavigation';
import { ROUTES } from '../constants/routes';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
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
import useCollection from '../hooks/useCollection';
import LoadingHat from '../components/LoadingHat';
import { createDoc, updateDoc } from '../utilities/firestore';

import ScrollyRolly from '../components/ScrollyRolly';
import { COLLECTIONS } from '../constants/firestore';
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
  count: {
    position: 'absolute',
    top: theme.spacing(2.25),
    right: theme.spacing(3),
    zIndex: 50,
  },
  filterContainer: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    boxShadow:
      theme.palette.type !== 'dark'
        ? theme.shadows[1]
        : `0 0 0 1px ${theme.palette.divider}`,
    zIndex: 9,
  },
  clearFilterButton: {
    padding: 0,
    marginRight: theme.spacing(1),
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
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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
  const { classes, theme, route } = props;

  let collection = COLLECTIONS.candidates;
  // let filters = CANIDIDATE_FILTERS;
  let fields;
  let formTitle;
  if (route === ROUTES.clients) {
    // filters = CLIENT_FILTERS;
    fields = clientFields;
    formTitle = 'Client Account';
    collection = COLLECTIONS.clients;
  }

  const [clientDrawer, setClientDrawer] = useState(null);
  const [candidateDrawer, setCandidateDrawer] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(
    () => {
      if (!!clientDrawer || !!candidateDrawer) setShowDrawer(true);
      else setShowDrawer(false);
    },
    [clientDrawer, candidateDrawer]
  );

  const [clientForm, setClientForm] = useState(null);

  const [
    queryFilters,
    // setQueryFilters
  ] = useState([]);
  const [subjectsState, subjectsDispatch, loadMore] = useCollection({
    path: collection,
    sort: { field: 'createdAt', direction: 'desc' },
    filters: queryFilters,
  });
  const subjects = subjectsState.documents;

  useEffect(
    () => {
      subjectsDispatch({ filters: queryFilters });
    },
    [queryFilters]
  );
  const [snackbarContent, setSnackbarContent] = useState('');
  return subjectsState.loading ? (
    <LoadingHat
      message="Rounding up your subjects…"
      altBg={theme.palette.type !== 'dark'}
    />
  ) : (
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
          <Typography variant="subtitle1" className={classes.count}>
            {subjects && subjects.length}
          </Typography>
        </Grid>

        {/* <Grid item className={classes.filterContainer}>
          <Grid container alignItems="center">
            <Tooltip title="Clear all filters">
              <IconButton
                className={classes.clearFilterButton}
                style={
                  true
                    ? {
                        backgroundColor: theme.palette.primary.main,
                        color: '#fff',
                      }
                    : null
                }
              >
                <FilterIcon />
              </IconButton>
            </Tooltip>
            {filters.map((x, i) => {
              switch (x.type) {
                case 'admin':
                  return (
                    <AdminSelector
                      key={i}
                      tooltip={x.title}
                      onSelect={val => {
                        if (val)
                          setQueryFilters(assigneeFilter(queryFilters, val));
                      }}
                    />
                  );
                default:
                  return (
                    <Filter
                      key={i}
                      title={x.title}
                      type={x.type}
                      values={x.values}
                      searchValues={x.searchValues}
                    />
                  );
              }
            })}
          </Grid>
        </Grid> */}

        <Grid item xs className={classes.subjectListContainer}>
          <ScrollyRolly
            dataState={subjectsState}
            dataDispatch={subjectsDispatch}
            loadMore={loadMore}
            disablePadding
          >
            {(x, i) => {
              return route === ROUTES.clients ? (
                <ClientItem
                  key={x.id}
                  data={x}
                  setClientDrawer={setClientDrawer}
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
      {/* {console.log('clientForm', clientForm)} */}
      {clientForm !== null && (
        <Form
          action={clientForm === undefined ? 'create' : 'edit'}
          actions={{
            create: data => {
              createDoc(collection, data);
              setClientForm(null);
            },
            edit: data => {
              console.log('clientForm', clientForm);
              updateDoc(COLLECTIONS.clients, clientForm.id, data);
              setClientForm(null);
            },

            close: () => {
              setClientForm(null);
            },
          }}
          open={clientForm !== null}
          data={fields(clientForm)}
          formTitle={formTitle}
        />
      )}
      {route === ROUTES.clients && (
        <Fab
          className={classes.fab}
          color="primary"
          onClick={() => {
            setClientForm(undefined);
          }}
        >
          <AddIcon />
        </Fab>
      )}

      {route === ROUTES.clients && (
        <Fab
          className={classes.fab}
          color="primary"
          onClick={() => {
            setClientForm(undefined);
          }}
        >
          <AddIcon />
        </Fab>
      )}

      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => {
          setShowDrawer(false);
          setTimeout(() => {
            setClientDrawer(null);
            setCandidateDrawer(null);
          }, 333);
        }}
      >
        {clientDrawer && (
          <ClientDrawer data={clientDrawer} setClientForm={setClientForm} />
        )}
        {candidateDrawer && <CandidateDrawer data={candidateDrawer} />}
      </Drawer>
    </>
  );
}

export default withNavigation(
  withStyles(styles, { withTheme: true })(SubjectsContainer)
);
