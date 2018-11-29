import {auth,firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useState, useEffect } from 'react';

export function useReturnKey() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleGetUserInfo = async(uid) => { 
    const user = await firestore.collection(COLLECTIONS.admins).doc(uid).get()
    setCurrentUser(user.data())    
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