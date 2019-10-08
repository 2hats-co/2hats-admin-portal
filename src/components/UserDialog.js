import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

import Snackbar from '@material-ui/core/Snackbar';

import { ChromePicker } from 'react-color';
import SuperAvatar from './SuperAvatar';
import { randomGreeting } from '../utilities';
import { COLLECTIONS } from '../constants/firestore';
import { updateDoc } from '../utilities/firestore';
import { ORANGE_COLOR } from '../Theme';
import DebugContext from '../contexts/DebugContext';
import { auth } from '../store';
const styles = theme => ({
  paperRoot: {
    borderRadius: theme.shape.roundBorderRadius,
    width: 360,
    padding: theme.spacing(4),
    outline: 'none',
    maxHeight: 'calc(100vh - 88px)',
    position: 'absolute',
    bottom: theme.spacing(1.5),
    left: theme.spacing(9),
    overflowY: 'auto',
  },

  header: {
    textAlign: 'center',
  },
  avatar: {
    width: theme.spacing(24),
    height: theme.spacing(24),
    margin: `0 auto ${theme.spacing(2)}px`,
    backgroundColor: theme.palette.primary.light,
    fontSize: theme.spacing(12),
    cursor: 'none',

    animation: 'spin-me 2s linear infinite',
    animationPlayState: 'paused',
    '&:hover': { animationPlayState: 'running' },
  },
  '@keyframes spin-me': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  greeting: {
    marginBottom: theme.spacing(1.5),
    color: theme.palette.text.primary,
  },
  UID: {
    opacity: 0.67,
  },
  logOutButton: { marginTop: theme.spacing(1.5) },

  borderedSection: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  debugSection: {
    textAlign: 'center',
    marginBottom: -theme.spacing(1),
  },

  routeDropdown: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
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

  snackbar: {
    marginLeft: theme.spacing(11.5),
    '& > div': { justifyContent: 'center' },
  },
});

function UserDialog(props) {
  const { classes, showDialog, setShowDialog, user, navigationRoutes } = props;

  const [slideIn, setSlideIn] = useState(true);
  const [greeting] = useState(randomGreeting());
  const [darkTheme, setDarkTheme] = useState(user.theme.type === 'dark');
  const [themeColor, setThemeColor] = useState(user.theme.color);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [defaultRoute, setDefaultRoute] = useState(user.defaultRoute);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const debugContext = useContext(DebugContext);

  const onClose = () => {
    setSlideIn(false);
    setTimeout(() => {
      setShowDialog(false);
    }, 100);
  };

  const updateTheme = () => {
    if (
      darkTheme !== (user.theme.type === 'dark') ||
      themeColor !== user.theme.color
    ) {
      user.setTheme({
        type: darkTheme ? 'dark' : 'light',
        color: themeColor,
      });
      updateDoc(COLLECTIONS.admins, user.UID, {
        adminPortal: {
          themeColor,
          theme: darkTheme ? 'dark' : 'light',
        },
      });
      setSnackbarMessage('Saved theme');
    }
  };

  const updateDefaultRoute = val => {
    setDefaultRoute(val);
    updateDoc(COLLECTIONS.admins, user.UID, { defaultRoute: val });
    setSnackbarMessage('Saved default route!');
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <>
      <Modal open={showDialog} onClose={onClose} disableAutoFocus>
        <Slide in={slideIn} direction="up">
          <Paper elevation={24} classes={{ root: classes.paperRoot }}>
            <Grid container direction="column" justify="center">
              <Grid item className={classes.header}>
                <SuperAvatar data={user} className={classes.avatar} />

                <Typography variant="h4" className={classes.greeting}>
                  {greeting}, {user.givenName}!
                </Typography>

                {debugContext.enabled && (
                  <Typography variant="body2" className={classes.UID}>
                    {user.UID}
                  </Typography>
                )}

                <Button
                  onClick={handleLogout}
                  color="primary"
                  variant="contained"
                  className={classes.logOutButton}
                >
                  Log out
                </Button>
              </Grid>

              <Grid item className={classes.borderedSection}>
                <Grid
                  container
                  justify="center"
                  alignItems="baseline"
                  spacing={1}
                >
                  <Typography variant="subtitle1">Default route: </Typography>
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

              <Grid
                item
                className={classNames(
                  classes.borderedSection,
                  classes.debugSection
                )}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={debugContext.enabled}
                      onChange={e => {
                        debugContext.setEnabled(!debugContext.enabled);
                      }}
                    />
                  }
                  label="Show debug info"
                />
              </Grid>

              <Grid item className={classes.borderedSection}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Grid container justify="space-between" alignItems="center">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={darkTheme}
                            onChange={e => {
                              setDarkTheme(e.target.checked);
                            }}
                            value="checkedDarkTheme"
                          />
                        }
                        label="Dark"
                      />
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
                        variant="body2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setShowColorPicker(!showColorPicker);
                        }}
                      >
                        Colour
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
                              onChangeComplete={val => {
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
                    </Grid>
                  </Grid>

                  <Grid>
                    <Button
                      onClick={() => {
                        updateTheme();
                      }}
                      color="primary"
                      variant="contained"
                      className={classes.saveThemeButton}
                    >
                      Save
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
    </>
  );
}
export default withStyles(styles)(UserDialog);
