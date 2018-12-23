import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

import Snackbar from '@material-ui/core/Snackbar';

import { ChromePicker } from 'react-color';
import { randomGreeting, getInitials } from '../utilities';
import { COLLECTIONS } from '../constants/firestore';
import { updateProperties } from '../utilities/firestore';
import { ORANGE_COLOR } from '../Theme';

const styles = theme => ({
  paperRoot: {
    borderRadius: theme.shape.roundBorderRadius,
    width: 360,
    padding: theme.spacing.unit * 4,
    outline: 'none',
    maxHeight: 'calc(100vh - 96px)',
    position: 'absolute',
    bottom: theme.spacing.unit * 1.5,
    left: theme.spacing.unit * 9,
    overflowY: 'auto',
  },

  header: {
    textAlign: 'center',
  },
  avatar: {
    width: theme.spacing.unit * 24,
    height: theme.spacing.unit * 24,
    margin: `0 auto ${theme.spacing.unit * 2}px`,
    backgroundColor: theme.palette.primary.light,
    fontSize: theme.spacing.unit * 12,
  },
  greeting: {
    marginBottom: theme.spacing.unit * 1.5,
    color: theme.palette.text.primary,
  },
  UID: {
    opacity: 0.67,
  },

  borderedSection: {
    marginTop: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 2,
    borderTop: `1px solid ${theme.palette.divider}`,
  },

  routeDropdown: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    minWidth: 140,
  },

  swatch: {
    background: '#fff',
    width: 20,
    height: 20,
    borderRadius: 10,
    boxShadow: '0 0 1px 0 rgba(0,0,0,.5) inset',
  },
  popover: {
    position: 'fixed',
    zIndex: '2',
    '& .chrome-picker': { transform: 'translateY(-120px) translateX(-22px)' },
  },
  cover: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  darkThemeSwitch: {
    marginLeft: theme.spacing.unit * 4,
  },

  themeButtons: {
    marginTop: theme.spacing.unit,
    textAlign: 'center',
  },

  snackbar: {
    marginLeft: theme.spacing.unit * 11.5,
    '& > div': { justifyContent: 'center' },
  },
});

function UserDialog(props) {
  const { classes, showDialog, setShowDialog, user, navigationRoutes } = props;

  const [slideIn, setSlideIn] = useState(true);
  const [greeting] = useState(randomGreeting());
  const [darkTheme, setDarkTheme] = useState(
    (user.adminPortal && user.adminPortal.theme === 'dark') || false
  );
  const [themeColor, setThemeColor] = useState(
    (user.adminPortal && user.adminPortal.themeColor) || ORANGE_COLOR
  );
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [defaultRoute, setDefaultRoute] = useState(user.defaultRoute);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const onClose = () => {
    setSlideIn(false);
    setTimeout(() => {
      setShowDialog(false);
    }, 100);
  };

  const updateTheme = () => {
    updateProperties(COLLECTIONS.admins, user.UID, {
      adminPortal: {
        themeColor,
        theme: darkTheme ? 'dark' : 'light',
      },
    });
    setSnackbarMessage('Saved theme! Reloading…');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const updateDefaultRoute = val => {
    setDefaultRoute(val);
    updateProperties(COLLECTIONS.admins, user.UID, { defaultRoute: val });
    setSnackbarMessage('Saved default route!');
  };

  const initials = getInitials(`${user.givenName} ${user.familyName}`);

  return (
    <React.Fragment>
      <Modal open={showDialog} onClose={onClose} disableAutoFocus>
        <Slide in={slideIn} direction="up">
          <Paper elevation={24} classes={{ root: classes.paperRoot }}>
            <Grid container direction="column" justify="center">
              <Grid item className={classes.header}>
                <Avatar src={user.avatarURL} className={classes.avatar}>
                  {initials ? initials : null}
                </Avatar>
                <Typography variant="display1" className={classes.greeting}>
                  {greeting}, {user.givenName}!
                </Typography>
                <Typography variant="body1" className={classes.UID}>
                  {user.UID}
                </Typography>
              </Grid>

              <Grid item className={classes.borderedSection}>
                <Grid
                  container
                  justify="center"
                  alignItems="baseline"
                  spacing={8}
                >
                  <Typography variant="subheading">Default route: </Typography>
                  <Select
                    value={defaultRoute}
                    onChange={e => {
                      updateDefaultRoute(e.target.value);
                    }}
                    className={classes.routeDropdown}
                  >
                    {navigationRoutes.map((x, i) => (
                      <MenuItem key={i} value={x.route}>
                        {x.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>

              <Grid item className={classes.borderedSection}>
                <Grid container alignItems="center" justify="center">
                  <IconButton
                    onClick={() => {
                      setShowColorPicker(!showColorPicker);
                    }}
                  >
                    <div
                      className={classes.swatch}
                      style={{ background: themeColor }}
                    />
                  </IconButton>
                  <Typography
                    variant="body1"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setShowColorPicker(!showColorPicker);
                    }}
                  >
                    Theme colour
                  </Typography>
                  {showColorPicker ? (
                    <Fade in>
                      <div className={classes.popover}>
                        <div
                          className={classes.cover}
                          onClick={() => {
                            setShowColorPicker(!showColorPicker);
                          }}
                        />
                        <ChromePicker
                          color={themeColor}
                          onChange={val => {
                            setThemeColor(
                              `hsl(${Math.floor(val.hsl.h)}, ${Math.floor(
                                val.hsl.s * 100
                              )}%, ${Math.floor(val.hsl.l * 100)}%)`
                            );
                          }}
                        />
                      </div>
                    </Fade>
                  ) : null}

                  <FormControlLabel
                    className={classes.darkThemeSwitch}
                    control={
                      <Switch
                        checked={darkTheme}
                        onChange={e => {
                          setDarkTheme(e.target.checked);
                        }}
                        value="checkedDarkTheme"
                      />
                    }
                    label="Dark theme"
                  />
                </Grid>
              </Grid>

              <Grid item className={classes.themeButtons}>
                <Button
                  onClick={updateTheme}
                  color="primary"
                  variant="contained"
                  disabled={
                    user.adminPortal
                      ? themeColor === user.adminPortal.themeColor &&
                        darkTheme === (user.adminPortal.theme === 'dark')
                      : false
                  }
                >
                  Save and Reload
                </Button>
                <Button
                  onClick={() => {
                    setThemeColor(ORANGE_COLOR);
                    setDarkTheme(false);
                  }}
                  color="primary"
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Slide>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarMessage.length > 0}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbarMessage('');
        }}
        message={snackbarMessage}
        className={classes.snackbar}
      />
    </React.Fragment>
  );
}
export default withStyles(styles)(UserDialog);
