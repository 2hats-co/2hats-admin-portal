import React, { useState, useEffect } from 'react';
import withNavigation from '../components/withNavigation';
import { ROUTES } from '../constants/routes';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import Typography from '@material-ui/core/Typography';

import LocationIndicator from '../components/LocationIndicator';
import Filter from '../components/Subjects/Filter';
import SubjectItem from '../components/Subjects/SubjectItem';
import useCollection from '../hooks/useCollection';
import LoadingHat from '../components/LoadingHat';

import InfiniteScroll from 'react-infinite-scroller';
import LinearProgress from '@material-ui/core/LinearProgress';

import { COLLECTIONS } from '../constants/firestore';

const styles = theme => ({
  root: {
    height: '100vh',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.background.paper,
  },
  count: {
    position: 'absolute',
    top: theme.spacing.unit * 2.25,
    right: theme.spacing.unit * 3,
    zIndex: 50,
  },
  filterContainer: {
    marginTop: '20px',
    padding: '0 24px 8px',
  },
  clearFilterButton: {
    padding: 0,
    marginRight: theme.spacing.unit * 2,
    width: 36,
    height: 36,
  },
  subjectListContainer: {
    width: '100%',
    overflowY: 'auto',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
});

// const FAKE_DATA = [
//   {
//     name: 'Prosafia Caming',
//     email: 'prosafia@caming.xxx',
//     phone: '000',
//     industry: 'Baby Showers',
//     tags: [
//       { type: 'leads', label: 'opportunity' },
//       { type: 'stage', label: 'cv' },
//     ],
//     note: 'x',
//   },
//   {
//     name: 'Prosafia Caming',
//     email: 'prosafia@caming.xxx',
//     phone: '000',
//     industry: 'Baby Showers',
//     tags: [
//       { type: 'leads', label: 'opportunity' },
//       { type: 'stage', label: 'cv' },
//     ],
//     note: '',
//   },
//   {
//     name: 'Prosafia Caming',
//     email: 'prosafia@caming.xxx',
//     phone: '000',
//     industry: 'Bone app the teeth',
//     tags: [
//       { type: 'leads', label: 'opportunity' },
//       { type: 'stage', label: 'cv' },
//     ],
//     note: 'x',
//   },
//   {
//     name: 'Prosafia Caming',
//     email: 'prosafia@caming.xxx',
//     phone: '000',
//     industry: 'Baby Showers',
//     tags: [
//       { type: 'leads', label: 'opportunity' },
//       { type: 'stage', label: 'cv' },
//     ],
//   },
// ];

const CANIDIDATE_FILTERS = [
  {
    title: 'Submission Status',
    values: ['Pending', 'Scheduled', 'Placed', 'Cancelled'],
  },
  {
    title: 'Submission Status II',
    type: 'date',
    values: ['Pending', 'Scheduled', 'Placed', 'Cancelled'],
  },
  {
    title: 'Company',
    type: 'search',
    values: [
      'Apple',
      'BP',
      'Chevron',
      'Deloitte',
      'Energizer',
      'Foursquare',
      'Google',
      'Hyundai',
      'Iglu',
      'Wumbo',
    ],
  },
];

const CLIENT_FILTERS = [
  {
    title: 'Assignee',
    values: ['Pending', 'Scheduled', 'Placed', 'Cancelled'],
  },
  {
    title: 'Submission Status II',
    type: 'date',
    values: ['Pending', 'Scheduled', 'Placed', 'Cancelled'],
  },
  {
    title: 'Company',
    type: 'search',
    values: [
      'Apple',
      'BP',
      'Chevron',
      'Deloitte',
      'Energizer',
      'Foursquare',
      'Google',
      'Hyundai',
      'Iglu',
      'Wumbo',
    ],
  },
];
function SubjectsContainer(props) {
  const { classes, theme, route } = props;

  let collection = COLLECTIONS.candidates;
  let filters = CANIDIDATE_FILTERS;
  if (route === ROUTES.clients) {
    filters = CLIENT_FILTERS;
    collection = COLLECTIONS.clients;
  }

  const [hasMore, setHasMore] = useState(false);
  const [subjectsState, subjectsDispatch] = useCollection({
    path: collection,
    sort: { field: 'createdAt', direction: 'desc' },
  });
  const subjects = subjectsState.documents;

  useEffect(
    () => {
      if (subjectsState.loading || subjectsState.limit === subjectsState.cap) {
        setHasMore(false);
      } else {
        setHasMore(subjectsState.documents.length === subjectsState.limit);
      }
    },
    [subjectsState]
  );

  const loadMore = () => {
    if (hasMore) {
      setHasMore(false);
      subjectsDispatch({ type: 'more' });
    }
  };

  const [snackbarContent, setSnackbarContent] = useState('');
  return (
    <React.Fragment>
      <Grid container direction="column" wrap="nowrap" className={classes.root}>
        <Grid item>
          <LocationIndicator
            title="aiPhoneBook.ml.biz.ru"
            showBorder
            subRoutes={[
              { label: 'All', value: ROUTES.subjects },
              { label: 'Clients', value: ROUTES.clients },
              { label: 'Candidates', value: ROUTES.candidates },
            ]}
          />
          <Typography variant="subtitle1" className={classes.count}>
            {subjects && subjects.length}
          </Typography>
        </Grid>

        <Grid item className={classes.filterContainer}>
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
          {filters.map((x, i) => (
            <Filter
              key={i}
              title={x.title}
              type={x.type}
              values={x.values}
              searchValues={x.searchValues}
            />
          ))}
        </Grid>

        <Grid item xs className={classes.subjectListContainer}>
          <React.Fragment>
            {subjectsState.loading ? (
              <LoadingHat message="Rounding up your subjects…" />
            ) : (
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
                {subjects.map((x, i) => (
                  <SubjectItem
                    key={i}
                    name={
                      x.displayName
                        ? x.displayName
                        : `${x.firstName} ${x.lastName}`
                    }
                    tags={[
                      { type: 'leads', label: 'opportunity' },
                      { type: 'stage', label: 'cv' },
                    ]}
                    // email={x.email}
                    // phone={x.phone}
                    // industry={x.industry}
                    // tags={x.tags}
                    // note={x.note}
                    // setSnackbarContent={setSnackbarContent}
                  />
                ))}
              </InfiniteScroll>
            )}
          </React.Fragment>
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
    </React.Fragment>
  );
}

export default withNavigation(
  withStyles(styles, { withTheme: true })(SubjectsContainer)
);
