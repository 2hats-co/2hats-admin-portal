import React, { useState, Suspense, lazy, useEffect } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

//routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import generateTheme, { ORANGE_COLOR } from './Theme';
import { ROUTES } from './constants/routes';
import useAuthedUser from './hooks/useAuthedUser';
import LoadingHat from './components/LoadingHat';
import PushNotifications from './components/PushNotifications';
import ConversationsContainer from './containers/ConversationsContainer';
import TestContainer from './containers/TestContainer';
import ErrorBoundary from './components/ErrorBoundary';

import CurrentUserContext from './contexts/CurrentUserContext';
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
const CandidatesContainer = lazy(() =>
  import('./containers/CandidatesContainer' /* webpackChunkName: "CandidatesContainer" */)
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
  const [theme, setTheme] = useState({ type: 'light', color: ORANGE_COLOR });
  const currentUser = useAuthedUser();

  useEffect(
    () => {
      if (
        currentUser &&
        currentUser.adminPortal &&
        (currentUser.adminPortal.theme !== theme.type ||
          currentUser.adminPortal.themeColor !== theme.color)
      ) {
        console.log('update theme from currentUser');
        setTheme({
          type: currentUser.adminPortal.theme,
          color: currentUser.adminPortal.themeColor,
        });
      }
    },
    [currentUser]
  );

  console.log('App render');

  if (currentUser && currentUser.isLoading) return <LoadingHat />;

  const Theme = generateTheme(theme.type, theme.color);

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
      <CurrentUserContext.Provider
        value={{
          ...currentUser,
          theme,
          setTheme,
        }}
      >
        <Router>
          <ErrorBoundary>
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
                    component={() => <CandidatesContainer {...props} />}
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
                    path={ROUTES.marketingEmailBlast}
                    component={() => <MarketingContainer {...props} />}
                  />

                  <Route
                    exact
                    path={ROUTES.emailCampaigns}
                    component={() => (
                      <EmailTemplatesManagerContainer {...props} />
                    )}
                  />
                  <Route
                    exact
                    path={ROUTES.transactionalEmails}
                    component={() => (
                      <EmailTemplatesManagerContainer {...props} />
                    )}
                  />
                  <Route
                    exact
                    path={ROUTES.conversationEmails}
                    component={() => (
                      <EmailTemplatesManagerContainer {...props} />
                    )}
                  />
                  <Route
                    exact
                    path={'/test'}
                    component={() => <TestContainer {...props} />}
                  />
                  <Route
                    exact
                    path={'/'}
                    component={() => <Landing {...props} />}
                  />
                  <Route component={() => <div>404</div>} />
                </Switch>
              </Suspense>
            </div>{' '}
          </ErrorBoundary>
        </Router>
        <PushNotifications />
      </CurrentUserContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
