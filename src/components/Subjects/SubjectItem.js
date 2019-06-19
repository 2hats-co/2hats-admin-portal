import React, { useState } from 'react';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// import Avatar from '@material-ui/core/Avatar';
// import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';

import LinkedInIcon from '../../assets/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
// import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import AssessmentIcon from '@material-ui/icons/Assignment';
import JobIcon from '@material-ui/icons/BusinessCenter';

import SuperAvatar from '../SuperAvatar';
// import { TAG_COLORS } from '../../constants/tags';
import { flattenSearchHighlight } from '../../utilities/objects';

import { MOMENT_LOCALES } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  listItemRoot: {
    padding: 0,
  },
  gridRoot: {
    // height: 72,
    margin: 0,
    padding: '0 4px',
    // borderBottom: `1px solid ${theme.palette.divider}`,
    // width: '100%',
  },
  iconButton: {
    padding: 6,
    width: 32,
    height: 32,
  },
  smallIcon: {
    fontSize: 16,
    color: theme.palette.text.secondary,
    marginRight: theme.spacing.unit * 0.75,
    verticalAlign: 'text-bottom',
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
    color: '#fff',
    fontSize: '.875rem',
    height: 24,
  },
});

function SubjectItem(props) {
  const {
    classes,
    data,
    setCandidateDrawer,
    selectHandler,
    unselectHandler,
  } = props;

  const name = data.displayName
    ? data.displayName
    : `${data.firstName} ${data.lastName}`;
  const {
    linkedin,
    email,
    phoneNumber,
    // note,
    touchedAssessments,
    touchedJobs,
    // selected,
    _snippetResult,
    updatedAt,
  } = data;

  moment.updateLocale('en', MOMENT_LOCALES);

  const highlighted = flattenSearchHighlight(_snippetResult).map(x => {
    return (
      <Grid container alignItems="baseline" spacing={8}>
        <Grid item>
          <Typography variant="caption" color="textSecondary">
            {x[0].split('.')[0]}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: x[1] }}
          />
        </Grid>
      </Grid>
    );
  });

  return (
    <ListItem
      classes={{ root: classes.listItemRoot }}
      divider
      button
      onClick={() => {
        setCandidateDrawer(data);
      }}
      disableGutters
    >
      <Grid
        container
        className={classes.gridRoot}
        alignItems="center"
        spacing={8}
      >
        <Grid item>
          <Checkbox
            icon={<AddIcon />}
            key={`${data.objectID}-uncontrolled`}
            checkedIcon={<RemoveIcon />}
            value={data.objectID}
            onClick={e => {
              e.stopPropagation();
            }}
            onChange={(e, v) => {
              if (v) {
                selectHandler(data);
              } else {
                unselectHandler(data, false);
              }
            }}
          />
        </Grid>

        <Grid item>
          <SuperAvatar data={data} />
        </Grid>

        <Grid item xs={2}>
          <Grid container direction="column">
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="caption">
              Last updated {moment.unix(updatedAt).fromNow()}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={2}>
          <Grid container direction="column">
            <Grid item>
              {linkedin && (
                <Typography variant="caption">
                  <LinkedInIcon className={classes.smallIcon} />
                  {linkedin.profileURL}
                </Typography>
              )}
            </Grid>
            <Grid item>
              {email && (
                <Typography variant="caption">
                  <MailIcon className={classes.smallIcon} />
                  {email}
                </Typography>
              )}
            </Grid>
            <Grid item>
              {phoneNumber && (
                <Typography variant="caption">
                  <PhoneIcon className={classes.smallIcon} />
                  {phoneNumber}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={1}>
          {Array.isArray(touchedAssessments) && (
            <Typography variant="body2" color="textSecondary">
              <AssessmentIcon className={classes.smallIcon} />
              <b>{touchedAssessments.length}</b> started
            </Typography>
          )}
          {Array.isArray(touchedJobs) && (
            <Typography variant="body2" color="textSecondary">
              <JobIcon className={classes.smallIcon} />
              <b>{touchedJobs.length}</b> applied
            </Typography>
          )}
        </Grid>

        <Grid item xs>
          {highlighted}
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default withStyles(styles)(SubjectItem);
