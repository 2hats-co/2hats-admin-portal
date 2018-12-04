import { functions } from "../store";
export const CLOUD_FUNCTIONS = {
  stats: "restApiQueryStageAndStatus",
  auth: "callablesAdminAuthentication",
  createSmartLink: "callablesCreateSmartLink"
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
