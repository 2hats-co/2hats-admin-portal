import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import ConversationIcon from '@material-ui/icons/MessageOutlined';
import ReminderIcon from '@material-ui/icons/NotificationsOutlined';
import AssessmentIcon from '@material-ui/icons/AssignmentOutlined';
import JobIcon from '@material-ui/icons/BusinessCenterOutlined';

import SuperAvatar from '../SuperAvatar';
import Notes from './Notes';

import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import ROUTES from '../../constants/routes';
import useAnalytics from '../../hooks/useAnalytics';

const styles = theme => ({
  root: {
    width: 320,
  },

  section: {
    padding: theme.spacing.unit * 2,
  },

  icon: {
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
  iconAligned: {
    position: 'relative',
    top: 4,
  },

  avatar: { marginRight: theme.spacing.unit * 2 },
  name: {
    marginTop: theme.spacing.unit * 0.75,
  },
});

function CandidateDrawer(props) {
  const { classes, history, data } = props;

  const assessmentsCount = useAnalytics({
    collection: COLLECTIONS.submissions,
    filters: [
      { property: 'UID', operation: '==', value: data.id },
      { property: 'type', operation: '==', value: 'assessment' },
    ],
  });
  const jobsCount = useAnalytics({
    collection: COLLECTIONS.submissions,
    filters: [
      { property: 'UID', operation: '==', value: data.id },
      { property: 'type', operation: '==', value: 'job' },
    ],
  });

  const listItems = [
    {
      label: 'Go to conversation',
      Icon: ConversationIcon,
      onClick: () => history.push(`${ROUTES.conversations}?uid=${data.id}`),
    },

    {
      label: 'Set reminder',
      Icon: ReminderIcon,
      onClick: () => history.push(`${ROUTES.conversations}?uid=${data.id}`),
    },
    {
      label: 'View assessments',
      count: assessmentsCount,
      Icon: AssessmentIcon,
      onClick: () =>
        history.push(`${ROUTES.submissions2}?uid=${data.id}&type=assessments`),
    },
    {
      label: 'View job submissions',
      count: jobsCount,
      Icon: JobIcon,
      onClick: () =>
        history.push(`${ROUTES.submissions2}?uid=${data.id}&type=jobs`),
    },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Grid container alignItems="flex-start" wrap="nowrap">
          <SuperAvatar data={data} className={classes.avatar} />

          <Grid item>
            <Typography variant="h5" className={classes.name} gutterBottom>
              {data.firstName} {data.lastName}
            </Typography>
            <Typography variant="caption">{data.id}</Typography>
          </Grid>
        </Grid>
      </div>

      <Divider variant="middle" />

      <List>
        {listItems.map((x, i) => (
          <ListItem key={i} button onClick={x.onClick}>
            <ListItemIcon>
              <x.Icon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Grid container justify="space-between">
                  <span>{x.label}</span> <span>{x.count}</span>
                </Grid>
              }
            />
          </ListItem>
        ))}
      </List>

      <Divider variant="middle" />

      <div className={classes.section}>
        <Notes collectionPath={`${COLLECTIONS.candidates}/${data.id}/notes`} />
      </div>
    </div>
  );
}

CandidateDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CandidateDrawer));
