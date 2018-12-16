import {firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useEffect, useReducer } from 'react';
import * as R from 'ramda'
const generateFilters = () => {
    let filters = [];
   
   return filters
}

const getMessages = (conversationId,filters,limit,conversationDispatch) =>{
   console.log('conversationId',conversationId)
    conversationDispatch({prevFilters:filters,prevLimit:limit,prevConversationId:conversationId})
    let query = firestore.collection(COLLECTIONS.conversations).doc(conversationId).collection('messages');
    filters.forEach((filter)=>{
        query = query.where(filter.field,filter.operator,filter.value)
    });
    query
    .orderBy('sentAt','desc')
    .limit(limit)
    .onSnapshot(snapshot => {
       if(snapshot.docs.length > 0){
           const messages = snapshot.docs.map((doc)=> {
               const data = doc.data()
               const id = doc.id
               return({...data,id})
           }
           )
        conversationDispatch({messages})
        }
    });
} 

const messagesReducer = (prevState, newProps) => {
    if(newProps.type){
        switch (newProps.type) {
            case 'more': return({...prevState,limit:prevState.limit+10})   
            default:
                break;
        }
    }else{
        return({...prevState,...newProps})
    }
}

export function useMessages(conversationId) {
    const [messagesState, messagesDispatch] = useReducer(messagesReducer,
        {prevConversationId:null,conversationId:conversationId,messages:null,prevFilters:null,filters:[],prevLimit:0,limit:5});
    useEffect(() => {
        const {prevConversationId,conversationId,prevFilters,filters,prevLimit,limit} = messagesState
        if(!R.equals(prevFilters,filters) || prevLimit !== limit ||prevConversationId !== conversationId){
            const filters = generateFilters()
            getMessages(conversationId,filters,limit,messagesDispatch)
        }
        return () => {firestore.collection(COLLECTIONS.conversations).doc(conversationId).collection(COLLECTIONS.messages).onSnapshot(() => {});};
    },[messagesState]);
    return [messagesState, messagesDispatch];
}
