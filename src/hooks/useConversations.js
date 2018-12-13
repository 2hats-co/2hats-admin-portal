import {firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useEffect, useReducer } from 'react';
import * as R from 'ramda'
const generateFilters = () => {
    let filters = [];
   
   return filters
}

const getConversations = (filters,conversationDispatch) =>{
    //updates prev values
    conversationDispatch({prevFilters:filters})
    let query = firestore.collection(COLLECTIONS.conversations);
    filters.forEach((filter)=>{
        query = query.where(filter.field,filter.operator,filter.value)
    });
    query
    .orderBy('createdAt','asc')
    .limit(20)
    .onSnapshot(snapshot => {
       if(snapshot.docs.length > 0){
           const conversations = snapshot.docs.map((doc)=> {
               const data = doc.data()
               const id = doc.id
               return({...data,id})
           }
           )
        conversationDispatch({conversations})
        }
    });
} 

const conversationsReducer = (prevState, newProps) => {
    return({...prevState,...newProps})
}

export function useConversations() {
    const [conversationsState, conversationsDispatch] = useReducer(conversationsReducer,
        {conversations:null,prevFilters:null,filters:[]});
    useEffect(() => {
        const {prevFilters,filters} = conversationsState
        if(!R.equals(prevFilters,filters)){
            const filters = generateFilters()
            console.log('wow')
            getConversations(filters,conversationsDispatch)
        }
        return () => {firestore.collection(COLLECTIONS.conversations).onSnapshot(() => {});};
    },[conversationsState]);
    return [conversationsState, conversationsDispatch];
}
