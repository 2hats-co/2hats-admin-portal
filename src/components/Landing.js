import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import withAuthentication from '../utilities/Session/withAuthentication';

import LoadingHat from '../components/LoadingHat';
import { useAuthedUser } from '../hooks/useAuthedUser';

function Landing(props) {
  const currentUser = useAuthedUser();
  console.log('currentUser', currentUser);
  useEffect(
    () => {
      if (currentUser && !currentUser.isLoading) {
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
