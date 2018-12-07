import {firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { userReducer, useEffect } from 'react';


const smartKeyReducer = (state,action) =>{
  switch (action.type) {
    case 'create':return({...state,uid:action.uid,route:action.route})
    case 'set':return({...state,smartKey:action.smartKey})
    case 'delete':return({...state,smartKey:''})
    case 'requested':return({...state,prevUid:action.prevUid})
    default:
      break;
  }
}
const generateSmartKey =async(smartKey,uid,route,smartKeyDispatch)=>{
  smartKeyDispatch({type:'requested',prevUid:uid})
  let slDoc = {
    UID: uid,
    expireTime: new Date(7 * 24 * 60 * 60 * 1000),
    route: route,
    startTime: new Date(),
    createdAt: new Date(),
    disable: false,
};
let smartLinkDoc = await firestore.collection(COLLECTIONS.smartLinks).doc(smartKey).set(slDoc);
 return smartLinkDoc.id
}

export function useSmartKey(props) {
  const [smartKeyState, smartKeyDispatch] = userReducer(smartKeyReducer,{smartKey:'',uid:'',prevUid:'',route:''});
useEffect(() => {
    const {uid,prevUid,route} = smartKeyState
    if(uid !== prevUid && uid !=='' && route !==''){
      generateSmartKey(uid,route,smartKeyDispatch)
    }
},[smartKeyState])

return [smartKeyState, smartKeyDispatch]
}
