import {auth,firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useState, useEffect } from 'react';
import * as R from 'ramda'
import {useUserInfo} from './useUserInfo'
export function useCharts(uid) {
  const [charts, setCharts] = useState(null);
  const currentUser = useUserInfo()
  useEffect(() => {
    console.log('userInfo',uid,currentUser)
    if(currentUser){
        console.log(currentUser)
  }
},[currentUser]);
  return charts;
}