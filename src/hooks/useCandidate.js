import {auth,firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useState, useEffect } from 'react';

export function useCandidate(uid) {
  const [candidate, setCandidate] = useState(null);

  const handleGetCandidate = async(uid) => {
    const user = await firestore.collection(COLLECTIONS.candidates).doc(uid).get()
    const candidate = { UID: user.id, ...user.data() }
    setCandidate(candidate)
  }

  useEffect(() => {
    console.log('useCandidate ', uid);
    handleGetCandidate(uid);
  }, [uid]);
  
  return candidate;
}
