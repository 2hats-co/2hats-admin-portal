import React, { Component } from 'react';
import StatisticsContainer from './containers/StatisticsContainer'
import CandidatesContainer from './containers/CandidatesContainer'
import {initFirebaseApp} from './firebase/app'
//routing
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import {ROUTES} from './constants/routes'

class App extends Component {
    componentWillMount(){
        initFirebaseApp()
    }
    render() {
    console.log(ROUTES)

        return (
            <Router>
            <div className="app"> 
                <Route exact path={ROUTES.stats} component={() => <StatisticsContainer/>} />
                <Route exact path={ROUTES.candidates} component={() => <CandidatesContainer/>} />
            </div>
        </Router>
        );
    }
}

export default App;
