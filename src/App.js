import React, { Suspense, lazy } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

//routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import generateTheme, { ORANGE_COLOR } from './Theme';
import { ROUTES } from './constants/routes';
import useAuthedUser from './hooks/useAuthedUser';
import LoadingHat from './components/LoadingHat';
import PushNotifications from './components/PushNotifications';
import ConversationsContainer from './containers/ConversationsContainer';
//containers
const Submissions2Container = lazy(() =>
  import('./containers/Submissions2Container' /* webpackChunkName: "Submissions2Container" */)
);
//import StatisticsContainer from './containers/StatisticsContainer';
const StatisticsContainer = lazy(() =>
  import('./containers/StatisticsContainer' /* webpackChunkName: "StatisticsContainer" */)
);
const SubjectsContainer = lazy(() =>
  import('./containers/SubjectsContainer' /* webpackChunkName: "SubjectsContainer" */)
);
const AuthenticationContainer = lazy(() =>
  import('./containers/AuthenticationContainer' /* webpackChunkName: "AuthenticationContainer" */)
);
// const ConversationsContainer = lazy(() =>
//   import('./containers/ConversationsContainer' /* webpackChunkName: "ConversationsContainer" */)
// );
const Landing = lazy(() =>
  import('./components/Landing' /* webpackChunkName: "Landing" */)
);
const MarketingContainer = lazy(() =>
  import('./containers/MarketingContainer' /* webpackChunkName: "MarketingContainer" */)
);
const ContentManagerContainer = lazy(() =>
  import('./containers/ContentManagerContainer' /* webpackChunkName: "ContentManagerContainer" */)
);
const EmailTemplatesManagerContainer = lazy(() =>
  import('./containers/EmailTemplatesManagerContainer' /* webpackChunkName: "EmailTemplatesManagerContainer" */)
);

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
          <Suspense fallback={<LoadingHat message="Loading container…" />}>
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
                path={ROUTES.submissions2}
                component={() => <Submissions2Container {...props} />}
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
              <Route
                exact
                path={ROUTES.announcementsManager}
                component={() => <ContentManagerContainer {...props} />}
              />

              <Route
                exact
                path={ROUTES.marketingLeadGeneration}
                component={() => <MarketingContainer {...props} />}
              />

              <Route
                exact
                path={ROUTES.emailCampaigns}
                component={() => <EmailTemplatesManagerContainer {...props} />}
              />
              <Route
                exact
                path={ROUTES.transactionalEmails}
                component={() => <EmailTemplatesManagerContainer {...props} />}
              />
              <Route
                exact
                path={ROUTES.conversationEmails}
                component={() => <EmailTemplatesManagerContainer {...props} />}
              />

              <Route
                exact
                path={'/'}
                component={() => <Landing {...props} />}
              />
              <Route component={() => <div>404</div>} />
            </Switch>
          </Suspense>
        </div>
      </Router>
      <PushNotifications />
    </MuiThemeProvider>
  );
}

export default App;
