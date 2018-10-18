import React, { Component } from 'react';
import StatisticsContainer from './containers/StatisticsContainer'
import CandidatesContainer from './containers/CandidatesContainer'
import ResumesContainer from './containers/ResumesContainer'
import AuthenticationContainer from './containers/AuthenticationContainer'
import {initFirebaseApp} from './firebase/app'
//routing
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import {ROUTES} from './constants/routes'
import Landing from './components/Landing';

class App extends Component {
    componentDidMount(){
        initFirebaseApp()
    }
    render() {
    console.log(ROUTES)

        return (
            <Router>
            <div className="app"> 
                <Route exact path={ROUTES.stats} component={() => <StatisticsContainer/>} />
                <Route exact path={ROUTES.candidates} component={() => <CandidatesContainer/>} />
                <Route exact path={ROUTES.auth} component={() => <AuthenticationContainer/>} />
                <Route exact path={ROUTES.resumes} component={() => <ResumesContainer/>} />
                <Route exact path={'/'} component={() => <Landing/>} /> 
            </div>
        </Router>
        );
    }
}

export default App;
