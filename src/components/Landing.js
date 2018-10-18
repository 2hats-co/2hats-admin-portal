import React from 'react'
import { withRouter } from "react-router-dom";
import {ROUTES}  from '../constants/routes'
import AuthenticationContainer from '../containers/AuthenticationContainer'

class Landing extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    
    }
    componentDidMount() {
        if (this.props.authUser == ! null) {
                this.props.history.push(ROUTES.stats)
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.authUser !== this.props.authUser) {
             this.props.history.push(ROUTES.stats) 
        }
    }
    render() {
        return (<AuthenticationContainer />)
    }

}


export default withRouter(Landing)