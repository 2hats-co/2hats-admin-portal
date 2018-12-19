import React,{useEffect} from "react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import withAuthentication from '../utilities/Session/withAuthentication';

import LoadingCard from "../components/LoadingCard";
import { useAuthedUser } from '../hooks/useAuthedUser';

function Landing(props){
  const currentUser = useAuthedUser()
  console.log('currentUser',currentUser)
  useEffect(()=>{
    if (currentUser && !currentUser.isLoading) {
        if(currentUser.defaultRoute) props.history.push(currentUser.defaultRoute);
        else props.history.push(ROUTES.stats);
        }
  },[currentUser])
    if (currentUser) {
      const { givenName } = currentUser;
      return (
        <LoadingCard
          message={`Howdy, ${givenName} 🤠! Routing you now… Yee haw!`}
          width={480}
          height={260}
        />
      );
    }else{
      return <p></p>
    } 
  }
export default withRouter(withAuthentication(Landing));
