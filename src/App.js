import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Loadable from 'react-loadable';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
//routing
import {
    BrowserRouter as Router,
    Route, Switch,
} from 'react-router-dom';
import Theme from './Theme';
import {ROUTES} from './constants/routes'
import Landing from './components/Landing';
// containers
import withAuthentication from './utilities/Session/withAuthentication';
//import TemplateGenerator from './components/TemplateGenerator'

//containers
const loadingCard = (<Grid container alignItems="center" justify="center" style={{height:'100%',position:'absolute',top:0,left:0}}><CircularProgress size={64}/></Grid>)

const StatisticsContainer = Loadable({
    loader: () => import('./containers/StatisticsContainer'),
    loading() {
      return loadingCard
    }
});

const SubjectsContainer = Loadable({
    loader: () => import('./containers/SubjectsContainer'),
    loading() {
      return loadingCard
    }
});

const AuthenticationContainer = Loadable({
    loader: () => import('./containers/AuthenticationContainer'),
    loading() {
      return loadingCard
    }
});

const ConversationsContainer = Loadable({
    // loader: () => import('./containers/ConversationsContainer'),
    loader: () => import('./containers/LeadsContainer'),
    loading() {
      return loadingCard
    }
});

const LeadsContainer = Loadable({
    loader: () => import('./containers/LeadsContainer'),
    loading() {
      return loadingCard
    }
});

const SubmissionsContainer = Loadable({
    loader: () => import('./containers/SubmissionsContainer'),
    loading() {
      return loadingCard
    }
});


function App() {

        return (
            <MuiThemeProvider theme={Theme}>
                <Router>
                    <div className="app"> 
                        <Switch>
                            <Route exact path={ROUTES.auth} component={() => <AuthenticationContainer/>} />
                            <Route exact path={ROUTES.stats} component={() => <StatisticsContainer/>} />
                            <Route exact path={ROUTES.subjects} component={() => <SubjectsContainer/>} />
                            <Route exact path={ROUTES.conversations} component={() => <ConversationsContainer/>} />
                            <Route exact path={ROUTES.leads} component={() => <LeadsContainer/>} />
                            <Route exact path={ROUTES.submissions} component={() => <SubmissionsContainer />} />
                            <Route exact path={ROUTES.pending} component={() => <SubmissionsContainer />} />
                            <Route exact path={ROUTES.rejected} component={() => <SubmissionsContainer />} />
                            <Route exact path={ROUTES.accepted} component={() => <SubmissionsContainer />} />
                            <Route exact path={'/'} component={() => <Landing/>} /> 
                            <Route component={() => <div>404</div>} />
                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }


export default withAuthentication(App);
