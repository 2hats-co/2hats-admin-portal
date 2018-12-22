import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Loadable from 'react-loadable';
import Grid from '@material-ui/core/Grid';
//routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import generateTheme, { ORANGE_COLOR } from './Theme';
import { ROUTES } from './constants/routes';
import Landing from './components/Landing';
// import withAuthentication from './utilities/Session/withAuthentication';
import { useAuthedUser } from './hooks/useAuthedUser';
import LoadingHat from './components/LoadingHat';

//containers
const loadingCard = <LoadingHat />;

const StatisticsContainer = Loadable({
  loader: () => import('./containers/StatisticsContainer'),
  loading() {
    return loadingCard;
  },
});

const SubjectsContainer = Loadable({
  loader: () => import('./containers/SubjectsContainer'),
  loading() {
    return loadingCard;
  },
});

const AuthenticationContainer = Loadable({
  loader: () => import('./containers/AuthenticationContainer'),
  loading() {
    return loadingCard;
  },
});

const ConversationsContainer = Loadable({
  loader: () => import('./containers/ConversationsContainer'),
  loading() {
    return loadingCard;
  },
});

const SubmissionsContainer = Loadable({
  loader: () => import('./containers/SubmissionsContainer'),
  loading() {
    return loadingCard;
  },
});

const MarketingContainer = Loadable({
  loader: () => import('./containers/MarketingContainer'),
  loading() {
    return loadingCard;
  },
});

function App() {
  const currentUser = useAuthedUser();

  if (!currentUser || currentUser.isLoading) return loadingCard;

  const Theme = generateTheme(
    (currentUser.adminPortal && currentUser.adminPortal.theme) || 'light',
    (currentUser.adminPortal && currentUser.adminPortal.themeColor) ||
      ORANGE_COLOR
  );

  if (currentUser.adminPortal && currentUser.adminPortal.theme === 'dark') {
    document.body.style.backgroundColor = Theme.palette.background.default;
  }

  return (
    <MuiThemeProvider theme={Theme}>
      <Router>
        <div
          className="app"
          style={
            currentUser.adminPortal && currentUser.adminPortal.theme === 'dark'
              ? { backgroundColor: '#222' }
              : {}
          }
        >
          <Switch>
            <Route
              exact
              path={ROUTES.auth}
              component={() => <AuthenticationContainer />}
            />
            <Route
              exact
              path={ROUTES.stats}
              component={() => <StatisticsContainer />}
            />
            <Route
              exact
              path={ROUTES.subjects}
              component={() => <SubjectsContainer />}
            />
            <Route
              exact
              path={ROUTES.conversations}
              component={() => <ConversationsContainer />}
            />
            <Route
              exact
              path={ROUTES.submissions}
              component={() => <SubmissionsContainer />}
            />
            <Route
              exact
              path={ROUTES.marketingLeadGeneration}
              component={() => <MarketingContainer />}
            />
            <Route
              exact
              path={ROUTES.marketingEmail}
              component={() => <MarketingContainer />}
            />
            <Route
              exact
              path={ROUTES.pending}
              component={() => <SubmissionsContainer />}
            />
            <Route
              exact
              path={ROUTES.rejected}
              component={() => <SubmissionsContainer />}
            />
            <Route
              exact
              path={ROUTES.accepted}
              component={() => <SubmissionsContainer />}
            />
            <Route exact path={'/'} component={() => <Landing />} />
            <Route component={() => <div>404</div>} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
