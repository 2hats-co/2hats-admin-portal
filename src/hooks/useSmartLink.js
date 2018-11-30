import {firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useState, useEffect } from 'react';

export function useSmartLink(uid, route) {
  const [smartLink, setSmartLink] = useState(null);

  const handleCreateSmartLink = async() => {
    

    let slDoc = {
        UID: uid,
        expireTime: new Date(7 * 24 * 60 * 60 * 1000),
        route: route,
        startTime: new Date(),
        createdAt: new Date(),
        disable: false,
    };
  let smartLinkDoc = await firestore.collection(COLLECTIONS.smartLinks).add(slDoc);
    setSmartLink(smartLinkDoc.id)
    
  }

  useEffect(() => {
    if(!smartLink)handleCreateSmartLink()
},[smartLink])
}
