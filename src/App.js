import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import StatisticsContainer from './containers/StatisticsContainer'
import CandidatesContainer from './containers/CandidatesContainer'
import ResumesContainer from './containers/ResumesContainer'
import AuthenticationContainer from './containers/AuthenticationContainer'
import MailContainer from './containers/MailContainer'
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

class App extends Component {
    componentDidMount(){
    }
    render() {
    console.log(ROUTES)
        return (
            <MuiThemeProvider theme={Theme}>
                <Router>
                    <div className="app"> 
                        <Route exact path={ROUTES.stats} component={() => <StatisticsContainer/>} />
                        <Route exact path={ROUTES.candidates} component={() => <CandidatesContainer/>} />
                        <Route exact path={ROUTES.auth} component={() => <AuthenticationContainer/>} />
                        <Route exact path={ROUTES.resumes} component={() => <ResumesContainer/>} />
                        <Route exact path={ROUTES.mail} component={() => <MailContainer/>} />
                        <Route exact path={'/'} component={() => <Landing/>} /> 
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default withAuthentication(App);