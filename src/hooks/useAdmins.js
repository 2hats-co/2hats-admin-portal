import {firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useState, useEffect } from 'react';
import assoc from 'ramda/es/assoc'
export function useAdmins(uid) {
  const [admins, setAdmins] = useState(null);
  const handleGetAdmins = async(uid) => { 
    firestore.collection(COLLECTIONS.admins)
    .onSnapshot(adminsSnapshot=>{
    const admins = adminsSnapshot.docs.map(doc=>{
      const currentUser = (uid === doc.id)
      const admin = assoc('UID',doc.id,doc.data())
      return assoc('currentUser',currentUser,admin)
    })
    console.log('setting admins',admins)
    setAdmins(admins) 
  })
  }
  useEffect(() => {
    if(!admins&&uid){
      handleGetAdmins(uid)
  }
  return () => {firestore.collection(COLLECTIONS.admins).onSnapshot(() => {});};
},[admins]);
  return [admins, setAdmins];
}
