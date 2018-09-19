import React from 'react';
import { auth } from '../../firebase/app';
import LoadingCard from '../../components/LoadingCard'
import {withRouter} from 'react-router-dom'
import { ROUTES } from '../../constants/routes';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(){
      super()
      this.state={
        isLoading:true,
        user:null
      }
    }
    componentDidMount() {
    
      auth.onAuthStateChanged(authUser => {
        this.setState({isLoading:false,user:authUser})
      });
    }
    render() {
      const {isLoading,user} = this.state
      console.log('auth state',this.state)
      if(isLoading){
        return (
          <LoadingCard message='please wait' />
        );}
      else{
        if(user){
          return (
            <Component />
          );
        }else{
          this.props.history.replace(ROUTES.auth)
          return<div/>
        }
        
      }
      
    }
  }

  return withRouter(WithAuthentication)
}

export default withAuthentication;