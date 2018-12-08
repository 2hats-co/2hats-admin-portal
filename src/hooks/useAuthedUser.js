import {auth,firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useState, useEffect } from 'react';
import assoc from 'ramda/es/assoc'
export function useAuthedUser() {
  const [currentUser, setCurrentUser] = useState(null);
  const handleGetAuthedUser = async(uid) => { 
    const user = await firestore.collection(COLLECTIONS.admins).doc(uid).get()
    const currentUser = assoc('UID',user.id,user.data())
    setCurrentUser(currentUser)    
  }
  useEffect(() => {
    if(!currentUser){
    auth.onAuthStateChanged(authUser => {
      handleGetAuthedUser(authUser.uid)
    });
  }
},[currentUser]);
  return currentUser;
}