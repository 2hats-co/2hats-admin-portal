import { functions } from '../store';

export const CLOUD_FUNCTIONS = {
  TAG_TRACKER: 'restApiEventTracker',
  RESUME_SCRAPER: 'callablesAlgoliaResumes',
  SPEEDY_SIGNUP: 'restApiSpeedySignup',
  AUTHENTICATE_3RD_PARTY: 'restApiAuthenticate3rdParty',
  AUTHENTICATE_GOOGLE: 'restApiAuthenticateGoogle',
  AUTHENTICATE_LINKEDIN: 'callablesAuthenticateLinkedIn',
  CHECK_EMAIL: 'restApiCheckEmail',
  SMART_LINK: 'restApiSmartLink',
  RESET_PASSWORD: 'restApiResetPassword',
  CREATE_PASSWORD: 'restApiCreatePassword',
  VALIDATE_EMAIL: 'restApiVaildateEmail',
  DISABLE_SMART_LINK: 'restApiDisableSmartLink',
  LEARN_WORLD_SSO: 'callablesLwSingleSignOn',
  CHARGE_STRIPE_TOKEN: 'callablesChargeStripeToken',
  LW_SINGLE_SIGN_ON: 'callablesLwSingleSignOn',
  WHATS_NEXT_AI: 'callablesWhatsNextAI',
  CREATE_SMART_LINK: 'callablesCreateSmartLink',
};

export const cloudFunction = (name, input, success, fail) => {
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
