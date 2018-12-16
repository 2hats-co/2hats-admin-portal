import {firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useEffect, useReducer } from 'react';
import * as R from 'ramda'
const generateFilters = () => {
    let filters = [];
   
   return filters
}

const getConversations = (filters,limit,conversationDispatch) =>{
    //updates prev values
    conversationDispatch({prevFilters:filters,prevLimit:limit,loading:true})
    let query = firestore.collection(COLLECTIONS.conversations);
    filters.forEach((filter)=>{
        query = query.where(filter.field,filter.operator,filter.value)
    });
    query
    .orderBy('lastMessage.sentAt','desc')
    .limit(limit)
    .onSnapshot(snapshot => {
       if(snapshot.docs.length > 0){
           const conversations = snapshot.docs.map((doc)=> {
               const data = doc.data()
               const id = doc.id
               return({...data,id})
           }
           )
        conversationDispatch({conversations,loading:false})
        }
    });
} 

const conversationsReducer = (prevState, newProps) => {
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

export function useConversations() {
    const [conversationsState, conversationsDispatch] = useReducer(conversationsReducer,
        {conversations:null,prevFilters:null,filters:[],prevLimit:0,limit:5});
    useEffect(() => {
        const {prevFilters,filters,prevLimit,limit} = conversationsState
        if(!R.equals(prevFilters,filters) || prevLimit !== limit){
            const filters = generateFilters()
            getConversations(filters,limit,conversationsDispatch)
        }
        return () => {firestore.collection(COLLECTIONS.conversations).onSnapshot(() => {});};
    },[conversationsState]);
    return [conversationsState, conversationsDispatch];
}
