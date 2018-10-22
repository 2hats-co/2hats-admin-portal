import {cloudFunction,CLOUD_FUNCTIONS} from './functions'

import {auth} from '../store';


export const authAdmin = (r,callback) => cloudFunction(CLOUD_FUNCTIONS.auth,{r},
    (result) => {
        auth.signInWithCustomToken(result.data.token).then(()=>{
            callback(result.data.route);
        })
        console.log("Call authenticate3rdParty success: ", result);
    },(o)=>{console.log('fail',o)})



