import {firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useEffect, useReducer } from 'react';

const generateFilters = (route,uid) => {
    let filters = [{field:'outcome',operator:'==',value:route}];
    if(uid !== ''){
        filters.push( {field:'UID',operator:'==',value:uid})
    }else {
        switch (route) {
            case 'accepted':
            case 'rejected':filters.push({field:'feedbacked',operator:'==',value:false})
            break;
        }
    }
   return filters
}

const getSubmissions = (filters,skipOffset,uid,submissionDispatch) =>{
    //updates prev values
  submissionDispatch({prevSkipOffset:skipOffset,prevUid:uid})
    let query = firestore.collection(COLLECTIONS.submissions);
    filters.forEach((filter)=>{
        query = query.where(filter.field,filter.operator,filter.value)
    });
    query
    .orderBy('createdAt','asc')
    .limit(skipOffset+1)
    .onSnapshot(snapshot => {
       if(snapshot.docs.length > 0){
        const submission = {
            id: snapshot.docs[snapshot.docs.length - 1].id,
            ...snapshot.docs[snapshot.docs.length - 1].data()
        }
        submissionDispatch({submission})
        }
    });
} 

const submissionReducer = (prevState, state) => {
    switch (state.type) {
        case 'skip':if(prevState.uid ===''){
            //only inc if there's no uid
            return({...prevState,skipOffset:prevState.skipOffset+1}) 
        }
        case 'clear':return({...prevState,uid:'',prevUid:prevState.uid}) 
        default:return({...prevState,...state})
    }
}

export function useSubmission(route) {
    const [submissionState, submissionDispatch] = useReducer(submissionReducer,
        {submission: null, skipOffset: 0, prevSkipOffset: null, uid:'',prevUid:null});
    useEffect(() => {
        const {uid,prevUid,prevSkipOffset,skipOffset} = submissionState
        if(uid !== prevUid ||skipOffset!==prevSkipOffset){
            const filters = generateFilters(route,uid)
            getSubmissions(filters,skipOffset,uid,submissionDispatch)
        }
        return () => {
            firestore.collection(COLLECTIONS.submissions).onSnapshot(() => {});
        };
    },[submissionState]);
    return [submissionState, submissionDispatch];
}
