import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import LinkedInIcon from '../../assets/icons/LinkedIn';
import MailIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/PhoneOutlined';
// import PersonIcon from '@material-ui/icons/Person';

import SuperAvatar from '../SuperAvatar';
import { TAG_COLORS } from '../../constants/tags';
import { copyToClipboard } from '../../utilities';

const styles = theme => ({
  listItemRoot: {
    padding: 0,
  },
  gridRoot: {
    height: 72,
    margin: 0,
    padding: '0 18px',
    // borderBottom: `1px solid ${theme.palette.divider}`,
    // width: '100%',
  },
  iconButton: {
    padding: 6,
    width: 32,
    height: 32,
  },
  smallIcon: {
    fontSize: 20,
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
  const { classes, data, setCandidateDrawer, setSnackbarContent } = props;

  const name = data.displayName
    ? data.displayName
    : `${data.firstName} ${data.lastName}`;
  const { linkedin, email, phoneNumber, industry, tags, note } = data;

  const tagChips =
    tags &&
    tags.map((x, i) => (
      <Chip
        key={i}
        label={x.label}
        className={classes.chip}
        style={{ backgroundColor: TAG_COLORS[x.type][x.label] }}
      />
    ));

  return (
    <ListItem
      classes={{ root: classes.listItemRoot }}
      divider
      button
      onClick={() => {
        setCandidateDrawer(data);
      }}
    >
      <Grid
        container
        className={classes.gridRoot}
        alignItems="center"
        spacing={16}
      >
        <Grid item>
          <Grid container direction="column" justify="space-evenly">
            {linkedin && (
              <Tooltip title={linkedin.profileURL}>
                <IconButton
                  className={classes.iconButton}
                  onClick={() => {
                    copyToClipboard(linkedin.profileURL);
                    setSnackbarContent(linkedin.profileURL);
                  }}
                >
                  <LinkedInIcon className={classes.smallIcon} />
                </IconButton>
              </Tooltip>
            )}
            {email && (
              <Tooltip title={email}>
                <IconButton
                  className={classes.iconButton}
                  onClick={() => {
                    copyToClipboard(email);
                    setSnackbarContent(email);
                  }}
                >
                  <MailIcon className={classes.smallIcon} />
                </IconButton>
              </Tooltip>
            )}
            {phoneNumber && (
              <Tooltip title={phoneNumber}>
                <IconButton
                  className={classes.iconButton}
                  onClick={() => {
                    copyToClipboard(phoneNumber);
                    setSnackbarContent(phoneNumber);
                  }}
                >
                  <PhoneIcon className={classes.smallIcon} />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>

        <Grid item>
          <SuperAvatar data={data} />
        </Grid>

        <Grid item xs={2}>
          <Grid container direction="column">
            <Typography variant="subtitle1">{name}</Typography>
            {industry && <Typography variant="body2">{industry}</Typography>}
          </Grid>
        </Grid>

        <Grid item xs>
          <Grid container direction="column">
            <Grid item xs={6}>
              {tagChips}
            </Grid>
            {note ? (
              <Grid item xs={6} style={{ paddingLeft: 12 }}>
                <Typography variant="body2">Note: {note}</Typography>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default withStyles(styles)(SubjectItem);
