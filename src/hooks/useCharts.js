import {auth,firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useState, useEffect } from 'react';
import {useAuthedUser} from './useAuthedUser'
export function useCharts(uid) {
  const [charts, setCharts] = useState(null);
  const currentUser = useAuthedUser()
  useEffect(() => {
    console.log('authedUser',uid,currentUser)
    if(currentUser){
        console.log(currentUser)
  }
},[currentUser]);
  return charts;
}