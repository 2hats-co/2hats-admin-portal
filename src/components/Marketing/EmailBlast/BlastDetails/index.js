import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/EditOutlined';
import CheckIcon from '@material-ui/icons/CheckCircle';
import PersonIcon from '@material-ui/icons/PersonOutline';
import PausedIcon from '@material-ui/icons/PauseCircleOutline';

import BlastStatusIcon from '../BlastStatusIcon';
import Friction from '../../../Friction';

import useDocument from '../../../../hooks/useDocument';
import { updateDoc } from '../../../../utilities/firestore';
import { AdminsContext } from '../../../../contexts/AdminsContext';

import {
  COLLECTIONS,
  MOMENT_FORMATS,
} from '@bit/sidney2hats.2hats.global.common-constants';
import { ROUTES } from '../../../../constants/routes';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    background: theme.palette.background.paper,
  },

  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },

  statusIcon: {
    marginLeft: -theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    verticalAlign: 'sub',

    position: 'relative',
    top: 2,
  },

  sectionButtons: {
    textAlign: 'right',
    '& button': {
      marginLeft: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
  },
});

const BlastDetails = props => {
  const { classes, history, data, editHandler } = props;

  const [templateState, templateDispatch] = useDocument();
  const templateDoc = templateState.doc;

  const adminsContext = useContext(AdminsContext);

  useEffect(
    () => {
      if (data.templateId)
        templateDispatch({
          path: `${COLLECTIONS.emailTemplates}/${data.templateId}`,
        });
    },
    [data]
  );

  const blastHandler = () => {
    updateDoc(COLLECTIONS.emailBlasts, data.id, { willBlast: !data.willBlast });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        <Grid item>
          <Typography variant="body2">Search query</Typography>
          <Typography variant="h5" gutterBottom>
            {data.query}
          </Typography>
        </Grid>

        <Grid item xs className={classes.sectionButtons}>
          <Button onClick={editHandler} disabled={data.blasted}>
            <EditIcon />
            Edit
          </Button>
          <Friction
            message={{
              title: `Are you sure you want to ${
                data.willBlast ? 'cancel the ' : ''
              }Blast!?`,
              body: data.willBlast
                ? 'You can set the email to Blast! again in the future.'
                : moment.unix(data.blastsAt.seconds) < moment()
                ? 'You will travel back in time and your email will be Blast!ed within the next hour.'
                : 'Your email will be Blast!ed within an hour of the scheduled time.',
            }}
          >
            <Button
              variant={data.willBlast || data.blasted ? 'text' : 'contained'}
              color="primary"
              className={classes.button}
              onClick={blastHandler}
              disabled={data.blasted}
            >
              {data.willBlast ? <PausedIcon /> : <CheckIcon />}
              {data.willBlast ? 'Cancel Blast!' : 'Blast!'}
            </Button>
          </Friction>
        </Grid>
      </Grid>

      <Grid container spacing={40}>
        <Grid item>
          <Typography variant="body2">Scheduled for</Typography>
          <Typography variant="subtitle1">
            {data.blastsAt &&
              moment
                .unix(data.blastsAt.seconds)
                .format(MOMENT_FORMATS.dateTime)}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2">Status</Typography>
          <Typography variant="subtitle1">
            <BlastStatusIcon data={data} className={classes.statusIcon} />
            {data.blasted ? 'Blasted' : data.willBlast ? 'Will blast' : 'Draft'}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2">Created by</Typography>
          <Typography variant="subtitle1">
            {adminsContext.getAdmin(data.createdBy).givenName}
          </Typography>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      <Grid container>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Analytics
          </Typography>
        </Grid>
        <Grid item xs className={classes.sectionButtons}>
          <Button disabled>
            <PersonIcon />
            View individuals
          </Button>
        </Grid>
      </Grid>
      <Typography>Your analytics go here</Typography>

      <Divider className={classes.divider} />

      <Grid container>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Preview
          </Typography>
        </Grid>
        <Grid item xs className={classes.sectionButtons}>
          <Button
            onClick={() => {
              history.push(
                `${ROUTES.transactionalEmails}?id=${data.templateId}`
              );
            }}
            disabled={data.blasted}
          >
            <EditIcon />
            Edit template
          </Button>
        </Grid>
      </Grid>

      {templateDoc && (
        <div dangerouslySetInnerHTML={{ __html: templateDoc.html }} />
      )}
    </div>
  );
};

export default withRouter(withStyles(styles)(BlastDetails));
