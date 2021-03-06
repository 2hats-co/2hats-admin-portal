import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';

import SearchIcon from '@material-ui/icons/Search';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// import DescriptionIcon from '@material-ui/icons/Description';
import Submissions2Icon from '@material-ui/icons/RateReview';
import StatisticsIcon from '@material-ui/icons/InsertChart';
import ConversationsIcon from '@material-ui/icons/Forum';
import MarketingIcon from '../../assets/icons/Bullhorn';
import JobsIcon from '@material-ui/icons/PregnantWoman';
import EmailIcon from '@material-ui/icons/Email';
import WarningIcon from '@material-ui/icons/Warning';

import { ROUTES } from '../../constants/routes';

import logo from '../../assets/logo/WhiteIcon.svg';
// import gloria from '../../assets/gloria.jpg';
import LoadingHat from '../LoadingHat';
import NavigationItems from './NavigationItems';
import Search from '../Search';
import Notifications from '../Notifications';
import UserDialog from '../UserDialog';
import SuperAvatar from '../SuperAvatar';
import Fired from './Fired';
import metadata from '../../metadata.json';
import useAuthedUser from '../../hooks/useAuthedUser';
import DebugContext from '../../contexts/DebugContext';
import { AdminsProvider } from '../../contexts/AdminsContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import withAuthentication from '../withAuthentication';
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  leftNav: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: 64,
    height: '100vh',
    position: 'relative',
    zIndex: 999,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  logo: {
    width: 40,
    height: 34,
    margin: '0 auto',
    padding: '15px 0',
    display: 'block',
    userDrag: 'none',
    userSelect: 'none',
  },
  // gloria: {
  //   width: 34,
  //   height: 34,
  //   margin: '0 auto',
  //   padding: '15px 0',
  //   display: 'block',
  //   userDrag: 'none',
  //   userSelect: 'none',
  //   transform: 'scale(2)',
  // },
  searchButton: {
    color: 'rgba(255,255,255,.87)',
  },
  notificationButton: {
    color: 'rgba(255,255,255,.87)',
  },
  avatar: {
    backgroundColor: 'rgba(255,255,255,.87)',
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  avatarSpinner: {
    margin: theme.spacing.unit * 1.5,
  },
});

const navigationRoutes = [
  {
    label: 'Statistics',
    icon: <StatisticsIcon />,
    route: ROUTES.stats,
  },
  {
    label: 'Submissions2',
    icon: <Submissions2Icon />,
    route: ROUTES.submissions2,
  },
  {
    label: 'Conversations',
    icon: <ConversationsIcon />,
    route: ROUTES.conversations,
  },
  {
    label: 'Candidates',
    icon: <SupervisorAccountIcon />,
    route: ROUTES.candidates,
    subRoutes: [ROUTES.clients, ROUTES.candidates],
    //incomplete: true,
  },
  {
    label: 'Marketing',
    icon: <MarketingIcon />,
    route: ROUTES.marketingLeadGeneration,
    subRoutes: [
      ROUTES.marketingLeadGeneration,
      ROUTES.marketingEmailBlast,
      ROUTES.marketingReferrals,
    ],
  },
  {
    label: 'Email Templates',
    icon: <EmailIcon />,
    route: ROUTES.emailCampaigns,
    subRoutes: [
      ROUTES.emailCampaigns,
      ROUTES.conversationEmails,
      ROUTES.transactionalEmails,
    ],
  },
  {
    label: 'Content Manager',
    icon: <JobsIcon />,
    route: ROUTES.jobsManager,
    subRoutes: [
      ROUTES.jobsManager,
      ROUTES.coursesManager,
      ROUTES.assessmentsManager,
      ROUTES.eventsManager,
    ],
    //  incomplete: true,
  },
];

export default function withNavigation(WrappedComponent) {
  function WithNavigation(props) {
    const { history, classes, theme, displayName, uid, location } = props;

    const [showSearch, setShowSearch] = useState(false);
    const [showUserDialog, setShowUserDialog] = useState(false);
    const currentUser = useContext(CurrentUserContext);

    const goTo = route => {
      history.push(route);
    };
    const path = location.pathname;

    const [debug, setDebug] = useState(
      window.location.hostname === 'localhost'
    );

    let index = 0;
    for (let i = 0; i < navigationRoutes.length; i++) {
      if (path === navigationRoutes[i].route) index = i;
      if (navigationRoutes[i].subRoutes) {
        for (let subRoute of navigationRoutes[i].subRoutes) {
          if (path === subRoute) index = i;
        }
      }
    }
    // console.log(currentUser);
    if (currentUser && currentUser.fired) {
      return <Fired user={currentUser} />;
    }
    if (currentUser && uid)
      return (
        <AdminsProvider>
          <DebugContext.Provider
            value={{ enabled: debug, setEnabled: setDebug }}
          >
            <Grid container wrap="nowrap" className={classes.root}>
              <Slide in direction="right">
                <>
                  <Grid item className={classes.leftNav}>
                    <Grid
                      container
                      style={{ height: '100vh' }}
                      justify="center"
                      alignContent="space-between"
                    >
                      <Grid item>
                        <Tooltip
                          title={
                            <>
                              <b>Build {metadata.hash}</b>
                              <div>
                                {new Date(metadata.date).toLocaleString()}
                              </div>
                            </>
                          }
                          placement="right"
                        >
                          <img
                            alt="2hats logo"
                            src={logo}
                            className={classes.logo}
                          />
                        </Tooltip>
                        <Tooltip title="Search users" placement="right">
                          <IconButton
                            className={classes.searchButton}
                            onClick={() => {
                              setShowSearch(true);
                            }}
                          >
                            <SearchIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <NavigationItems
                          currentLocation={path}
                          selectedIndex={index}
                          navigationRoutes={navigationRoutes}
                        />
                      </Grid>
                      <Grid item style={{ textAlign: 'center' }}>
                        <Notifications
                          uid={uid}
                          className={classes.notificationButton}
                        />
                        {currentUser && displayName && uid ? (
                          <IconButton
                            onClick={() => {
                              setShowUserDialog(true);
                            }}
                          >
                            <SuperAvatar
                              data={currentUser}
                              className={classes.avatar}
                              noInitialsIcon={<WarningIcon />}
                            />
                          </IconButton>
                        ) : (
                          <CircularProgress
                            color="inherit"
                            className={classes.avatarSpinner}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              </Slide>
              <Fade in timeout={400}>
                <Grid
                  item
                  xs
                  style={{ backgroundColor: theme.palette.background.paper }}
                >
                  <WrappedComponent {...props} classes={null} />
                </Grid>
              </Fade>
            </Grid>

            {showSearch && (
              <Search
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                placeholder="Search users"
              />
            )}
            {showUserDialog && (
              <UserDialog
                user={currentUser}
                showDialog={showUserDialog}
                setShowDialog={setShowUserDialog}
                navigationRoutes={navigationRoutes}
              />
            )}
          </DebugContext.Provider>
        </AdminsProvider>
      );
    else return <LoadingHat message="Looking for your data???" />;
  }
  return withAuthentication(
    withRouter(withStyles(styles, { withTheme: true })(WithNavigation))
  );
}
