import { auth, firestore } from '../store';
import { COLLECTIONS } from '../constants/firestore';
import { useEffect, useReducer } from 'react';

const subjectFilterReducer = (state, action) => {
    switch (action.type) {
        case 'update':
            Object.assign(state, )
            return state;
    }
}

export function useSubjectFilter() {
    const [subjectFilter, subjectFilterDispatch] = useReducer(subjectFilterReducer, {});

    // useEffect(() => {}, []);

    return [subjectFilter, subjectFilterDispatch];
}


const setListener = (type,skipOffset,submissionDispatch) => {
    let filters = [];
    let sorts = [];
    switch (type) {
        case 'pending':
            filters = [{field:'screened',operator:'==',value:false}];
            break;

        case 'accepted':
            filters = [{field:'screened',operator:'==',value:true},
                {field:'confidence',operator:'>=',value:2}];
            sorts = [{ field:'confidence', direction:'asc' }];
            break;
        case 'rejected':
            filters = [{field:'screened',operator:'==',value:true},
                {field:'confidence',operator:'<=',value:1}];
            sorts = [{ field:'confidence', direction:'asc' }];
            break;

        default:
            break;
    }
    let query = firestore
    .collection(COLLECTIONS.submissions);
    filters.forEach((filter)=>{
        query = query.where(filter.field,filter.operator,filter.value)
    })
    sorts.forEach((sort)=>{
        query = query.orderBy(sort.field,sort.direction)
    })
    query
    .orderBy('createdAt','desc')
    .limit(skipOffset+1)
    .onSnapshot(snapshot => {
       if(snapshot.docs.length > 0){
        const submission = {
            id: snapshot.docs[snapshot.docs.length - 1].id,
            ...snapshot.docs[snapshot.docs.length - 1].data()
        }
        submissionDispatch({ type: 'set',submission });
        } else {
            return submissionDispatch({type:'complete'})
        }
    });
}
const submissionReducer = (state, action) => {

    switch (action.type) {
        case 'set': return ({...state,submission:action.submission,prevSkipOffset:state.skipOffset})
        case 'skip': return ({...state,prevSkipOffset:state.skipOffset,skipOffset:state.skipOffset+1})
        case 'complete' : return ({...state,submission:{complete:true}})
    }
}


function useSubmission(type) {
    const [submissionState, submissionDispatch] = useReducer(submissionReducer,
         { type, submission: null, skipOffset: 0 });

    useEffect(() => {
        if(!submissionState.submission || submissionState.prevSkipOffset !== submissionState.skipOffset){
            console.log(submissionState.prevSkipOffset !== submissionState.skipOffset)
            setListener(type,submissionState.skipOffset,submissionDispatch)
        }
  

        return () => {
            firestore.collection(COLLECTIONS.submissions).onSnapshot(() => {});
        };
    },[submissionState,submissionDispatch]);

    return [submissionState, submissionDispatch];
}
