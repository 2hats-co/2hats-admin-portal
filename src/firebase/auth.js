import { callable, CLOUD_FUNCTIONS } from './functions';

import { auth } from '../store';

export const authAdmin = (r, callback, failCallback) => {
  let uri;

  if (window.location.hostname === 'localhost') {
    uri = 'http://localhost:3000';
  } else {
    uri = 'https://admin.2hats.com';
  }
  return callable(
    CLOUD_FUNCTIONS.auth,
    //PASS IN  uri: 'http://localhost:3000' if in localhost (without trailing /)
    {
      r,
      uri,
    },
    result => {
      auth.signInWithCustomToken(result.data.token).then(() => {
        callback(result.data.route);
      });
    },
    o => {
      console.log('fail', o);
      failCallback(o);
    }
  );
};
