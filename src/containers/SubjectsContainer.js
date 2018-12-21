import React, { useState } from 'react';
import withNavigation from '../components/withNavigation';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';

import LocationIndicator from '../components/LocationIndicator';
import Filter from '../components/Subjects/Filter';
import SubjectItem from '../components/Subjects/SubjectItem';

import useSubjectFilter from '../hooks/useSubjectFilter';

const styles = theme => ({
  root: {
    height: '100vh',
  },
  filterContainer: {
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
    overflowY: 'scroll',
    borderTop: '1px solid #eee',
  },
});

const FAKE_DATA = [
  {
    name: 'Prosafia Caming',
    email: 'prosafia@caming.xxx',
    phone: '000',
    industry: 'Baby Showers',
    tags: [
      { type: 'leads', label: 'opportunity' },
      { type: 'stage', label: 'cv' },
    ],
    note: 'x',
  },
  {
    name: 'Prosafia Caming',
    email: 'prosafia@caming.xxx',
    phone: '000',
    industry: 'Baby Showers',
    tags: [
      { type: 'leads', label: 'opportunity' },
      { type: 'stage', label: 'cv' },
    ],
    note: '',
  },
  {
    name: 'Prosafia Caming',
    email: 'prosafia@caming.xxx',
    phone: '000',
    industry: 'Bone app the teeth',
    tags: [
      { type: 'leads', label: 'opportunity' },
      { type: 'stage', label: 'cv' },
    ],
    note: 'x',
  },
  {
    name: 'Prosafia Caming',
    email: 'prosafia@caming.xxx',
    phone: '000',
    industry: 'Baby Showers',
    tags: [
      { type: 'leads', label: 'opportunity' },
      { type: 'stage', label: 'cv' },
    ],
  },
];

const FILTERS = [
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

function SubjectsContainer(props) {
  const { classes, theme } = props;

  const [snackbarContent, setSnackbarContent] = useState('');
  // const [subjectFilter, subjectFilterDispatch] = useSubjectFilter();

  return (
    <React.Fragment>
      <Grid container direction="column" className={classes.root}>
        <LocationIndicator title="Subjects" />

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
          {FILTERS.map((x, i) => (
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
          <div>
            {FAKE_DATA.map((x, i) => (
              <SubjectItem
                key={i}
                name={x.name}
                email={x.email}
                phone={x.phone}
                industry={x.industry}
                tags={x.tags}
                note={x.note}
                setSnackbarContent={setSnackbarContent}
              />
            ))}
          </div>
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
