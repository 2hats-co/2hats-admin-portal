import {auth,firestore} from '../store'
import {COLLECTIONS} from '../constants/firestore'
import { useEffect, useState } from 'react';

export function useSubmission(type) {
    const [submission, setSubmission] = useState(null);

    const handleSetSubmission = (submission) => { 
        setSubmission(submission)
    }

    useEffect(() => {
        
        if (!submission) {
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
            .collection(COLLECTIONS.submissions)
             ;
            filters.forEach((filter)=>{
                query = query.where(filter.field,filter.operator,filter.value)
            })
            sorts.forEach((sort)=>{
                query = query.orderBy(sort.field,sort.direction)
            })

            query
            .orderBy('createdAt','desc')
            .limit(1)
            .onSnapshot(snapshot => {
               if(snapshot.docs.length > 0){
                handleSetSubmission({
                    id: snapshot.docs[0].id,
                    ...snapshot.docs[0].data()
                });
               }else{
                handleSetSubmission({complete:true})
               }
               
            });

            return () => {
                firestore.collection(COLLECTIONS.submissions).onSnapshot(() => {});
            };
        }
    }, [submission]);

    return submission;
}
