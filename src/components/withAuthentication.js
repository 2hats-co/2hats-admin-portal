import React, { useEffect, useState } from 'react';

import LoadingHat from '../components/LoadingHat';

import { auth, initializePushNotifications } from '../store';
import AuthenticationContainer from '../containers/AuthenticationContainer';

const withAuthentication = Component =>
  function WithAuthentication(props) {
    const [loading, setLoading] = useState(true);
    const [authedUser, setAuthedUser] = useState(null);
    let unsubscribe;
    useEffect(
      () => {
        if (!authedUser && loading) {
          unsubscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
              initializePushNotifications();
              setAuthedUser(authUser);
              setLoading(false);
            } else {
              setAuthedUser(null);
              setLoading(false);
            }
          });
          return () => {
            if (unsubscribe) unsubscribe();
          };
        }
      },
      [auth]
    );

    if (authedUser)
      return (
        <Component
          {...props} //currentUser={currentUser}
          uid={authedUser.uid}
          displayName={authedUser.displayName}
        />
      );
    else if (!authedUser && !loading) return <AuthenticationContainer />;
    else return <LoadingHat message="Authenticatingâ€¦" />;
  };

export default withAuthentication;

/*
import React, { Component } from 'react';

import LoadingHat from './LoadingHat';

import { auth, initializePushNotifications } from '../store';
import AuthenticationContainer from '../containers/AuthenticationContainer';
import { renderComponent } from 'recompose';

const withAuthentication = WrappedComponent =>
  class WithAuthentication extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        authedUser: null,
      };
    }
    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        if (authUser) {
          initializePushNotifications();
          this.setState({ authedUser: authUser, loading: false });
        } else {
          this.setState({ authedUser: null, loading: false });
        }
      });
    }
    componentWillUnmount() {
      auth.onAuthStateChanged(function(user) {
        // handle it
      });
    }
    render() {
      const { loading, authedUser } = this.state;

      if (authedUser)
        return (
          <WrappedComponent
            {...this.props} //currentUser={currentUser}
            uid={authedUser.uid}
            displayName={authedUser.displayName}
          />
        );
      else if (!authedUser && !loading) return <AuthenticationContainer />;
      else return <LoadingHat message="Authenticatingâ€¦" />;
    }
  };
export default withAuthentication;
*/
