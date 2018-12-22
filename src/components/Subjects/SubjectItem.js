import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import MailIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';

import { TAG_COLORS } from '../../constants/tags';
import { copyToClipboard } from '../../utilities';

const styles = theme => ({
  rootButton: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
  },
  root: {
    height: 72,
    margin: 0,
    padding: '0 18px',
    borderBottom: `1px solid ${theme.palette.divider}`,
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
  const {
    classes,
    name,
    email,
    phone,
    industry,
    tags,
    note,
    setSnackbarContent,
  } = props;

  const tagChips = props.tags.map((x, i) => (
    <Chip
      key={i}
      label={x.label}
      className={classes.chip}
      style={{ backgroundColor: TAG_COLORS[x.type][x.label] }}
    />
  ));

  return (
    <ButtonBase className={classes.rootButton}>
      <Grid container className={classes.root} alignItems="center" spacing={16}>
        <Grid item>
          <Grid container direction="column" justify="space-evenly">
            <Tooltip title={props.email}>
              <IconButton
                className={classes.iconButton}
                onClick={() => {
                  copyToClipboard(props.email);
                  setSnackbarContent(props.email);
                }}
              >
                <MailIcon className={classes.smallIcon} />
              </IconButton>
            </Tooltip>
            <Tooltip title={props.phone}>
              <IconButton
                className={classes.iconButton}
                onClick={() => {
                  copyToClipboard(props.phone);
                  setSnackbarContent(props.phone);
                }}
              >
                <PhoneIcon className={classes.smallIcon} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Grid item>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </Grid>

        <Grid item xs={2}>
          <Grid container direction="column">
            <Typography variant="subheading">{props.name}</Typography>
            <Typography variant="body1">{props.industry}</Typography>
          </Grid>
        </Grid>

        <Grid item xs>
          <Grid container direction="column">
            <Grid item xs={6}>
              {tagChips}
            </Grid>
            {props.note ? (
              <Grid item xs={6} style={{ paddingLeft: 12 }}>
                <Typography variant="body1">Note: {props.note}</Typography>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </ButtonBase>
  );
}

export default withStyles(styles)(SubjectItem);
