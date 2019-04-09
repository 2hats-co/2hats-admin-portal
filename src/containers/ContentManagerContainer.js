import React, { useState, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

import LocationIndicator from '../components/LocationIndicator';

import { ROUTES } from '../constants/routes';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { createDoc } from '../utilities/firestore';
import useCollection from '../hooks/useCollection';

import moment from 'moment';
import { momentLocales } from '../constants/momentLocales';

import withNavigation from '../components/withNavigation';
import EditOneCard from '../components/Cards/EditOneCard';
import OneCard from '../components/Cards/OneCard';
import * as oneCardMappings from '../constants/oneCardMappings';

import Form from '../components/Form';
import courseFields from '../constants/forms/course';
import assessmentFields from '../constants/forms/assessment';
import jobFields from '../constants/forms/job';
// import eventFields from '../constants/forms/event';
import announcementFields from '../constants/forms/announcement';
import useClient from '../hooks/useClient';
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
  let mapping = '';
  switch (path) {
    case ROUTES.jobsManager:
      fields = jobFields;
      formTitle = 'Job';
      collection = COLLECTIONS.jobs;
      mapping = oneCardMappings.job;
      break;

    case ROUTES.coursesManager:
      fields = courseFields;
      formTitle = 'Course';
      collection = COLLECTIONS.courses;
      mapping = oneCardMappings.course;
      break;

    case ROUTES.assessmentsManager:
      fields = assessmentFields;
      formTitle = 'Assessment';
      collection = COLLECTIONS.assessments;
      mapping = oneCardMappings.assessment;
      break;

    case ROUTES.announcementsManager:
      fields = announcementFields;
      formTitle = 'Announcements';
      collection = COLLECTIONS.announcements;
      mapping = oneCardMappings.announcement;
      break;

    default:
      break;
  }

  const [dataState, collectionDispatch] = useCollection({
    path: collection,
    sort: { field: 'createdAt', direction: 'desc' },
  });
  const [client, setSearch] = useClient(location.search);
  useEffect(
    () => {
      if (client.id)
        collectionDispatch({
          filters: [{ field: 'clientId', operator: '==', value: client.id }],
        });
      else
        collectionDispatch({
          filters: [],
        });
    },
    [client.id]
  );
  useEffect(
    () => {
      setSearch(location.search);
    },
    [location.search]
  );
  const docs = dataState.documents;

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
            { label: 'Announcements', value: ROUTES.announcementsManager },
          ]}
        />
        {client && (
          <Typography component="h3">
            {client.companyName} {collection}
          </Typography>
        )}
        <Grid container>
          {docs &&
            docs.map(x => (
              <EditOneCard
                data={x}
                fields={fields}
                key={x.id}
                collection={collection}
              >
                {extraProps => <OneCard {...extraProps} {...mapping(x)} />}
              </EditOneCard>
            ))}
        </Grid>

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
          //justForm
          action="create"
          actions={{
            create: data => {
              createDoc(collection, { ...data, clientId: client.id });
              setShowDialog(false);
            },
            close: () => {
              setShowDialog(false);
            },
          }}
          open={showDialog}
          data={client ? fields({ companyName: client.companyName }) : fields()}
          formTitle={formTitle}
        />
      </div>
    </Fade>
  );
}

export default withNavigation(withStyles(styles)(ContentManagerContainer));
