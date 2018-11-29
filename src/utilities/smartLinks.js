
import {firestore} from '../store';
import {COLLECTIONS} from '../constants/firestore'
export const create = async(UID,route) =>{

   let slDoc = {
        UID: UID,
        expireTime: new Date(7 * 24 * 60 * 60 * 1000),
        route: route,
        startTime: new Date(),
        createdAt: new Date(),
        disable: false,
    };
  let smartLinkDoc = await firestore.collection(COLLECTIONS.smartLinks).add(slDoc);
    return smartLinkDoc.id
}


export default{create}