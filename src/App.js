import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

//routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import generateTheme, { ORANGE_COLOR } from './Theme';
import { ROUTES } from './constants/routes';
import { useAuthedUser } from './hooks/useAuthedUser';
import LoadingHat from './components/LoadingHat';
import SubmissionsContainer from './containers/SubmissionsContainer';
import StatisticsContainer from './containers/StatisticsContainer';
//containers
import Loadable from 'react-loadable';
import PushNotifications from './components/PushNotifications';
import withAuthentication from './components/withAuthentication';
// const StatisticsContainer = Loadable({
//   loader: () =>
//     import('./containers/StatisticsContainer' /* webpackChunkName: "StatisticsContainer" */),
//   loading: LoadingHat,
// });

const SubjectsContainer = Loadable({
  loader: () =>
    import('./containers/SubjectsContainer' /* webpackChunkName: "SubjectsContainer" */),
  loading: LoadingHat,
});

const AuthenticationContainer = Loadable({
  loader: () =>
    import('./containers/AuthenticationContainer' /* webpackChunkName: "AuthenticationContainer" */),
  loading: LoadingHat,
});

const ConversationsContainer = Loadable({
  loader: () =>
    import('./containers/ConversationsContainer' /* webpackChunkName: "ConversationsContainer" */),
  loading: LoadingHat,
});

const Landing = Loadable({
  loader: () =>
    import('./components/Landing' /* webpackChunkName: "Landing" */),
  loading: LoadingHat,
});

const MarketingContainer = Loadable({
  loader: () =>
    import('./containers/MarketingContainer' /* webpackChunkName: "MarketingContainer" */),
  loading: LoadingHat,
});

const ContentManagerContainer = Loadable({
  loader: () =>
    import('./containers/ContentManagerContainer' /* webpackChunkName: "ContentManagerContainer" */),
  loading: LoadingHat,
});

function App(props) {
  const currentUser = useAuthedUser();

  if (currentUser && currentUser.isLoading) return <LoadingHat />;

  const Theme = generateTheme(
    (currentUser && currentUser.adminPortal && currentUser.adminPortal.theme) ||
      'light',
    (currentUser &&
      currentUser.adminPortal &&
      currentUser.adminPortal.themeColor) ||
      ORANGE_COLOR
  );

  if (
    currentUser &&
    currentUser.adminPortal &&
    currentUser.adminPortal.theme === 'dark'
  ) {
    document.body.style.backgroundColor = Theme.palette.background.default;
  }

  let appStyle =
    currentUser &&
    currentUser.adminPortal &&
    currentUser.adminPortal.theme === 'dark'
      ? { backgroundColor: '#222' }
      : {};

  return (
    <MuiThemeProvider theme={Theme}>
      <Router>
        <div className="app" style={appStyle}>
          <Switch>
            <Route
              exact
              path={ROUTES.auth}
              component={() => <AuthenticationContainer {...props} />}
            />
            <Route
              exact
              path={ROUTES.stats}
              component={() => <StatisticsContainer {...props} />}
            />
            <Route
              exact
              path={ROUTES.subjects}
              component={() => <SubjectsContainer {...props} />}
            />
            <Route
              exact
              path={ROUTES.candidates}
              component={() => (
                <SubjectsContainer route={ROUTES.candidates} {...props} />
              )}
            />
            <Route
              exact
              path={ROUTES.clients}
              component={() => (
                <SubjectsContainer route={ROUTES.clients} {...props} />
              )}
            />
            <Route
              exact
              path={ROUTES.conversations}
              component={() => <ConversationsContainer {...props} />}
            />
            <Route
              exact
              path={ROUTES.submissions}
              component={() => <SubmissionsContainer {...props} />}
            />
            <Route
              exact
              path={ROUTES.marketingLeadGeneration}
              component={() => <MarketingContainer {...props} />}
            />
            <Route
              exact
              path={ROUTES.marketingEmail}
              component={() => <MarketingContainer {...props} />}
            />
            <Route
              exact
              path={ROUTES.pending}
              component={() => <SubmissionsContainer {...props} />}
            />
            <Route
              exact
              path={ROUTES.rejected}
              component={() => <SubmissionsContainer {...props} />}
            />
            <Route
              exact
              path={ROUTES.accepted}
              component={() => <SubmissionsContainer {...props} />}
            />

            <Route
              exact
              path={ROUTES.jobsManager || ROUTES.coursesManager}
              component={() => <ContentManagerContainer {...props} />}
            />
            <Route
              exact
              path={ROUTES.coursesManager}
              component={() => <ContentManagerContainer {...props} />}
            />
            <Route
              exact
              path={ROUTES.assessmentsManager}
              component={() => <ContentManagerContainer {...props} />}
            />
            <Route
              exact
              path={ROUTES.eventsManager}
              component={() => <ContentManagerContainer {...props} />}
            />
            <Route exact path={'/'} component={() => <Landing {...props} />} />
            <Route component={() => <div>404</div>} />
          </Switch>
        </div>
      </Router>
      <PushNotifications />
    </MuiThemeProvider>
  );
}

export default App;
