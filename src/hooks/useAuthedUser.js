import {auth,firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useState, useEffect } from 'react';
import assoc from 'ramda/es/assoc'
export function useAuthedUser() {
  const [currentUser, setCurrentUser] = useState(null);
  const handleGetAuthedUser = async(uid) => { 
    const user = await firestore.collection(COLLECTIONS.admins).doc(uid).get()
    const currentUser = assoc('UID',user.id,user.data())
    setCurrentUser({...currentUser,isLoading:false})    
  }
  useEffect(() => {
    if(!currentUser){
    auth.onAuthStateChanged(authUser => {
     setCurrentUser({UID:authUser.uid,givenName:authUser.displayName.split(' ')[0],isLoading:true,email:authUser.email})
      handleGetAuthedUser(authUser.uid)
    });
  }
},[currentUser]);
  return currentUser;
}
