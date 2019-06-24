import { functions } from '../store';

export const CLOUD_FUNCTIONS = {
  tracker: 'callablesEventTracker',
  stats: 'callablesCachedStats',
  auth: 'callablesAuthAdmin',
  refreshAccessToken: 'callablesRefreshAccessToken',
  grantDrivePermissions: 'callablesDriveGrantPermissions',
  callablesSendTargeted: 'callablesCampaignSendTargeted',
  smartLinkCreate: 'smartLinkCreate',
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

export const callCallable = (callable, data) =>
  functions.httpsCallable(callable)(data);
