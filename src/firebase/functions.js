import { functions } from '../store';

export const CLOUD_FUNCTIONS = {
  tracker: 'restApiEventTracker',
  stats: 'callablesCachedStats',
  auth: 'callablesAdminAuthentication',
  refreshAccessToken: 'callablesRefreshAccessToken',
  grantDrivePermissions: 'callablesGrantDrivePermissions',
  callablesSendTargeted: 'callablesSendTargeted',
};

export const callable = (name, input, success, fail) => {
  const callable = functions.httpsCallable(name);

  callable(input)
    .then(result => {
      if (success) {
        success(result);
      }
    })
    .catch(error => {
      if (fail) {
        fail(error);
      }
    });
};
