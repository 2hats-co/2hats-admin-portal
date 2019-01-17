import { auth, firestore } from '../store';
import { COLLECTIONS } from '../constants/firestore';
import { useState, useEffect } from 'react';
import assoc from 'ramda/es/assoc';
export function useAuthedUser() {
  const [currentUser, setCurrentUser] = useState(null);
  let unsubscribe;
  const handleGetAuthedUser = async uid => {
    const user = await firestore
      .collection(COLLECTIONS.admins)
      .doc(uid)
      .get();
    const currentUser = assoc('UID', user.id, user.data());
    setCurrentUser({ ...currentUser, isLoading: false });
  };
  useEffect(
    () => {
      if (!currentUser) {
        unsubscribe = auth.onAuthStateChanged(authUser => {
          if (authUser) {
            setCurrentUser({
              UID: authUser.uid,
              givenName: authUser.displayName.split(' ')[0],
              displayName: authUser.displayName,
              isLoading: true,
              email: authUser.email,
            });
            handleGetAuthedUser(authUser.uid);
          }
        });
      }
      return () => {
        if (unsubscribe) unsubscribe();
      };
    },
    [currentUser]
  );
  return currentUser;
}
