import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import withAuthentication from '../utilities/Session/withAuthentication';

import LoadingHat from '../components/LoadingHat';
import { useAuthedUser } from '../hooks/useAuthedUser';
//import { initializePushNotifications } from '../store';
function Landing(props) {
  const currentUser = useAuthedUser();
  useEffect(
    () => {
      if (currentUser && !currentUser.isLoading) {
        //    initializePushNotifications();
        if (currentUser.defaultRoute)
          props.history.push(currentUser.defaultRoute);
        else props.history.push(ROUTES.stats);
      }
    },
    [currentUser]
  );
  if (currentUser) {
    return <LoadingHat message="Routing…" />;
  } else {
    return <p />;
  }
}
export default withRouter(withAuthentication(Landing));
