import {auth,firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useEffect, useState, useReducer } from 'react';

import * as R from 'ramda'

const setFilters = (type,route,submissionDispatch) => {
    let filters = [];
    switch (type) {
        case 'pending':
            filters = [{field:'outcome',operator:'==',value:type}];
            break;
        case 'accepted':
            filters = [{field:'outcome',operator:'==',value:type},
                {field:'feedbacked',operator:'==',value:false}];
            break;
        case 'rejected':
            filters = [{field:'outcome',operator:'==',value:type},
                {field:'feedbacked',operator:'==',value:false}];
            break;
        default:
            filters = [
                {field:'outcome',operator:'==',value:route},
                {field:'UID',operator:'==',value:type}
            ];
            if (route === 'accepted' || route === 'rejected')
                filters.push({field:'feedbacked',operator:'==',value:false});
        break;
    }
    submissionDispatch({type:'filters',filters})
}

const getSubmissions = (filters,skipOffset,equalOffsets,submissionDispatch) =>{
    console.log(filters)
    if(!equalOffsets){
    submissionDispatch({ type:'setPrevSkip',prevSkipOffset:skipOffset});
    }

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
        if (skipOffset >= snapshot.docs.length) {
            submissionDispatch({ type:'clear',prevFilters:filters,prevSkipOffset:skipOffset});
        } else {
            submissionDispatch({ type:'set', submission , prevFilters:filters,prevSkipOffset:skipOffset});
        }
        }else{
             submissionDispatch({type:'complete',prevFilters:filters,prevSkipOffset:skipOffset})
        }
    });
} 
const submissionReducer = (state, action) => {
    let props = {...action}
    delete props.type
    switch (action.type) {
  
    }
}

export function useSubmission(route) {
    
    const [submissionState, submissionDispatch] = useReducer(submissionReducer,{submission: null, 
            skipOffset: 0, prevSkipOffset: 0,
            uid:null,prevUid:null,
            filters:[{field:'outcome',operator:'==',value:route}],prevFilters:[]});


    useEffect(() => {
        const {uid,prevUid,filters,prevFilters,prevSkipOffset,skipOffset,submission} = submissionState
        
        return () => {
            firestore.collection(COLLECTIONS.submissions).onSnapshot(() => {});
        };
    },[submissionState]);

    return [submissionState, submissionDispatch];
}
