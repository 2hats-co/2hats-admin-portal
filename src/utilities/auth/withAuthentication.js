import React from 'react';
import { connect } from 'react-redux';
import { auth,db } from '../../store';
import UAParser from 'ua-parser-js';
const storeDeviceInfo = async(uid) =>{
  console.log('uid',uid)
  const user = await db.collection("users").doc(uid).get()
  const userData = user.data()
  console.log('userData',userData)
 var parser = new UAParser();
 console.log(parser.getResult());
}

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onSetAuthUser } = this.props;
      auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setUser(authUser)
          : onSetAuthUser(null);
      });
    }
    setUser(authUser){
      const { onSetAuthUser } = this.props;
      onSetAuthUser(authUser)
      let user =  {
        app_id: "k8mrtb3h",
        name: authUser.displayName, // Full name
        email: authUser.email, // Email address
        created_at: authUser.metadata.creationTime, // Signup Date
       // horizontal_padding: 20,	
     vertical_padding: 120
      }
     window.intercomSettings =user;

     storeDeviceInfo(authUser.uid)
    }
    render() {
      return (
        <Component />
      );
    }
  }
  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
  });
  return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;