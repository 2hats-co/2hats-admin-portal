import React,{useEffect} from "react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import AuthenticationContainer from "../containers/AuthenticationContainer";
import LoadingCard from "../components/LoadingCard";
import { COLLECTIONS } from "../constants/firestore";
import { compose } from "redux";
import { withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../utilities/withFirestore";
import { useUserInfo } from '../hooks/useUserInfo';

function Landing(props){
  const currentUser = useUserInfo()
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
        }else
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
