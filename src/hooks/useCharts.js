import {firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useState, useEffect } from 'react';
import assoc from 'ramda/es/assoc'

export default function useCharts(uid) {
  const [charts, setCharts] = useState(null);
  const setChartsListner = (uid) => { 
    firestore.collection(COLLECTIONS.admins).doc(uid).collection(COLLECTIONS.charts)
    .onSnapshot(snapshot => {
        const charts = snapshot.docs.map(doc=> assoc('id',doc.id,doc.data()))
        setCharts(charts)
    })
  }
  useEffect(() => {
    if(!charts&&uid){
        setChartsListner(uid)
  }
  return () => {firestore.collection(COLLECTIONS.admins).doc(uid).collection(COLLECTIONS.charts).onSnapshot(() => {});};
},[charts]);
  return charts;
}
