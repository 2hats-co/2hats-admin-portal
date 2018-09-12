import {functions } from './app'
export const CLOUD_FUNCTIONS = {
    STATS:'restApiQueryStageAndStatus'
};

export const cloudFunction = (name, input ,success, fail) =>{
    const callable = functions.httpsCallable(name);

    callable(input)
    .then((result) => {
        if(success){
            success(result);
        }
    })
    .catch((error) => {
        if(fail){
            fail(error);
            }
    });
};

