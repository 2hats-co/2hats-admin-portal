import { callable, CLOUD_FUNCTIONS } from './functions';

import { auth } from '../store';

export const authAdmin = (r, callback) =>
  callable(
    CLOUD_FUNCTIONS.auth,
    { r },
    result => {
      auth.signInWithCustomToken(result.data.token).then(() => {
        callback(result.data.route);
      });
    },
    o => {
      //TODO: show snackbar 🥨🍿🍘🌰
      console.log('fail', o);
    }
  );
