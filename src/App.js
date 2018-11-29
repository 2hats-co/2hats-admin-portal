import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
//containers
import StatisticsContainer from './containers/StatisticsContainer'
import OldStatisticsContainer from './containers/oldStatisticsContainer'
import CandidatesContainer from './containers/CandidatesContainer'
import ResumesContainer from './containers/ResumesContainer'
import AuthenticationContainer from './containers/AuthenticationContainer'
import LeadsContainer from './containers/LeadsContainer'
import MailContainer from './containers/MailContainer'
import SubmissionsContainer from './containers/SubmissionsContainer';
//routing
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Theme from './Theme';
import {ROUTES} from './constants/routes'
import Landing from './components/Landing';
// containers
import withAuthentication from './utilities/Session/withAuthentication';
import TemplateGenerator from './components/TemplateGenerator'
function App() {

        return (
            <MuiThemeProvider theme={Theme}>
                <Router>
                    <div className="app"> 
                        <Route exact path={ROUTES.auth} component={() => <AuthenticationContainer/>} />
                        <Route exact path={ROUTES.stats} component={() => <StatisticsContainer/>} />
                        <Route exact path={'/oldStatistics'} component={() => <OldStatisticsContainer/>} />
                        <Route exact path={ROUTES.candidates} component={() => <CandidatesContainer/>} />
                        <Route exact path={ROUTES.resumes} component={() => <ResumesContainer/>} />
                        <Route exact path={ROUTES.leads} component={() => <LeadsContainer/>} />
                        <Route exact path={ROUTES.pending} component={() => <SubmissionsContainer />} />
                        <Route exact path={ROUTES.rejected} component={() => <SubmissionsContainer />} />
                        <Route exact path={ROUTES.accepted} component={() => <SubmissionsContainer />} />
                        <Route exact path={ROUTES.mail} component={() => <MailContainer/>} />
                        <Route exact path={'/'} component={() => <Landing/>} /> 
                    </div> 
                </Router>
            </MuiThemeProvider>
        );
    }


export default withAuthentication(App);
