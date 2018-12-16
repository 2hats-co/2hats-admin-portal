import {firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useState, useEffect } from 'react';
import assoc from 'ramda/es/assoc'
export function useAdmins() {
  const [admins, setAdmins] = useState(null);
  const handleGetAdmins = async(uid) => { 
    const adminsSnapshot = await firestore.collection(COLLECTIONS.admins).get()
    const admins = adminsSnapshot.docs.map(doc=>{return assoc('UID',doc.id,doc.data())})
    setAdmins(admins)    
  }
  useEffect(() => {
    if(!admins){
      handleGetAdmins()
  }
},[admins]);
  return admins;
}
