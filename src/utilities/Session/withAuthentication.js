import React, { useEffect, useState } from 'react';

import LoadingHat from '../../components/LoadingHat';

import { auth, initializePushNotifications } from '../../store';
import AuthenticationContainer from '../../containers/AuthenticationContainer';

const withAuthentication = Component =>
  function WithAuthentication(props) {
    const [loading, setLoading] = useState(true);
    const [authedUser, setAuthedUser] = useState(null);

    useEffect(
      () => {
        if (!authedUser && loading) {
          auth.onAuthStateChanged(authUser => {
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
            auth.onAuthStateChanged(() => {});
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
    else return <LoadingHat message="Authenticating…" />;
  };

export default withAuthentication;
