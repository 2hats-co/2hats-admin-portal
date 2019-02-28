import { callable, CLOUD_FUNCTIONS } from './functions';

import { auth } from '../store';

export const authAdmin = (r, callback, failCallback) =>
  callable(
    CLOUD_FUNCTIONS.auth,
    //PASS IN  uri: 'http://localhost:3000' if in localhost (without trailing /)
    {
      r,
      //uri: 'http://localhost:3000'
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
