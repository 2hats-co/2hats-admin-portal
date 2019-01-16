import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
// import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

import LocationIndicator from '../components/LocationIndicator';

import { ROUTES } from '../constants/routes';
import { COLLECTIONS } from '../constants/firestore';
import { createDoc } from '../utilities/firestore';
import useCollection from '../hooks/useCollection';

import moment from 'moment';
import { momentLocales } from '../constants/momentLocales';

import withNavigation from '../components/withNavigation';
import OneCard from '../components/OneCard';

import Form from '../components/Form';
import courseFields from '../constants/forms/course';
import assessmentFields from '../constants/forms/assessment';
import jobFields from '../constants/forms/job';
import eventFields from '../constants/forms/event';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh',
    overflow: 'auto',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

function ContentManagerContainer(props) {
  const { classes, location } = props;
  const path = location.pathname;

  moment.updateLocale('en', momentLocales);

  const [showDialog, setShowDialog] = useState(false);

  let fields = [];
  let formTitle = '';
  let collection = '';
  switch (path) {
    case ROUTES.jobsManager:
      fields = jobFields();
      formTitle = 'Job';
      collection = COLLECTIONS.jobs;
      break;
    case ROUTES.coursesManager:
      fields = courseFields();
      formTitle = 'Course';
      collection = COLLECTIONS.courses;
      break;
    case ROUTES.assessmentsManager:
      fields = assessmentFields();
      formTitle = 'Assessment';
      collection = COLLECTIONS.assessments;
      break;
    case ROUTES.eventsManager:
      fields = eventFields();
      formTitle = 'Event';
      collection = COLLECTIONS.events;
      break;
    default:
      break;
  }

  const [dataState, dataDispatch] = useCollection({
    path: collection,
  });
  const docs = dataState.documents;
  console.log(docs);

  return (
    <Fade in>
      <div className={classes.root}>
        <LocationIndicator
          title="Content Manager"
          showShadow
          subRoutes={[
            { label: 'Jobs', value: ROUTES.jobsManager },
            { label: 'Courses', value: ROUTES.coursesManager },
            { label: 'Assessments', value: ROUTES.assessmentsManager },
            { label: 'Events', value: ROUTES.eventsManager },
          ]}
        />

        {docs &&
          docs.map(x => (
            <OneCard
              key={x.id}
              title={x.title}
              secondaryText={x.description || x.roleDescription}
              primaryAction="Do nothing"
              route={`#${x.id}`}
              image={x.image}
              video={x.videoUrl}
            />
          ))}

        <Fab
          className={classes.fab}
          color="primary"
          onClick={() => {
            setShowDialog(true);
          }}
        >
          <AddIcon />
        </Fab>

        <Form
          action="create"
          actions={{
            create: data => {
              console.log(collection, data);
              createDoc(collection, data);
              setShowDialog(false);
            },
            close: () => {
              setShowDialog(false);
            },
          }}
          open={showDialog}
          data={fields}
          formTitle={formTitle}
        />
      </div>
    </Fade>
  );
}

export default withNavigation(withStyles(styles)(ContentManagerContainer));
