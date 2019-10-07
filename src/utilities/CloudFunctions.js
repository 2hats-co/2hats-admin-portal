import { functions } from '../store';

export const CLOUD_FUNCTIONS = {
  TAG_TRACKER: 'callablesEventTracker',
  RESUME_SCRAPER: 'callablesAlgoliaResumes',
  SPEEDY_SIGNUP: 'restApiSpeedySignup',
  AUTHENTICATE_3RD_PARTY: 'restApiAuthenticate3rdParty',
  AUTHENTICATE_GOOGLE: 'restApiAuthenticateGoogle',
  AUTHENTICATE_LINKEDIN: 'callablesAuthenticateLinkedIn',
  CHECK_EMAIL: 'restApiCheckEmail',
  SMART_LINK: 'smartLinkActivate',
  RESET_PASSWORD: 'restApiResetPassword',
  CREATE_PASSWORD: 'restApiCreatePassword',
  VALIDATE_EMAIL: 'restApiVaildateEmail',
  DISABLE_SMART_LINK: 'smartLinkDisable',
  LEARN_WORLD_SSO: 'callablesLwSingleSignOn',
  CHARGE_STRIPE_TOKEN: 'callablesChargeStripeToken',
  LW_SINGLE_SIGN_ON: 'callablesLwSingleSignOn',
  WHATS_NEXT_AI: 'callablesWhatsNextAI',
  CREATE_SMART_LINK: 'callablesCreateSmartLink',
  CLIENT_WELCOME_EMAIL: 'callablesClientSendWelcomeEmail',
  CAMPAIGN_SEND_TARGETED_BY_ID: 'callablesCampaignSendTargetedById', //cloudfunctionsts code
  EMAIL_SEND_BY_ID: 'emailSendById', //cloudfunctionsts2 code
  EMAIL_BLASTS_ACTIONS: 'emailBlastActions', //Changed from callablesEmailBlastActions to ts2 code
  EMAIL_TEMPLATE_SEND_TEST: 'callablesEmailTemplateSendTest',
};

export const cloudFunction = (name, input, success, fail) => {
  const callable = functions.httpsCallable(name);
  callable(JSON.parse(JSON.stringify(input)))
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
