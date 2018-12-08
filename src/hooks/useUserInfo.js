import {auth,firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useState, useEffect } from 'react';
import assoc from 'ramda/es/assoc'
export function useUserInfo() {
  const [currentUser, setCurrentUser] = useState(null);
  const handleGetUserInfo = async(uid) => { 
    const user = await firestore.collection(COLLECTIONS.admins).doc(uid).get()
    const currentUser = assoc('UID',user.id,user.data())
    setCurrentUser(currentUser)    
  }
  useEffect(() => {
    if(!currentUser){
    auth.onAuthStateChanged(authUser => {
      handleGetUserInfo(authUser.uid)
    });
  }
},[currentUser]);
  return currentUser;
}