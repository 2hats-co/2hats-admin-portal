import React,{useEffect} from "react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import AuthenticationContainer from "../containers/AuthenticationContainer";
import LoadingCard from "../components/LoadingCard";
import { useAuthedUser } from '../hooks/useAuthedUser';

function Landing(props){
  const currentUser = useAuthedUser()
  //   this.props.loadData();
  //   if (this.props.authUser == !null) {
  //     this.props.history.push(ROUTES.stats);
  //   }

  // componentDidUpdate(prevProps, prevState) {
  //   const { user } = this.props;
  //   if (user !== prevProps.user) {
  //     if (user[0].defaultRoute) {
  //       this.props.history.push(user[0].defaultRoute);
  //     } else {
  //       this.props.history.push("/statistics");
  //     }
  //   }
  //   if (!prevProps.uid && this.props.uid) {
  //     this.props.loadData();
  //   }
  // }
  useEffect(()=>{
    if (currentUser) {
        if(currentUser.defaultRoute)
           props.history.push(currentUser.defaultRoute);
        }else{
          props.history.push(ROUTES.stats);
        }
    console.log(currentUser)
  },[
    currentUser
  ])
    if (currentUser) {
      const { givenName } = currentUser;
      return (
        <LoadingCard
          message={`${givenName} you're appreciated 🤗`}
          width={350}
          height={260}
        />
      );
    } else {
      return <AuthenticationContainer />;
    }
  }




export default withRouter(Landing);
