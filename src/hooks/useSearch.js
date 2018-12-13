import { useEffect, useReducer } from 'react';
import { ALGOLIA_INDEX, createAlgoliaIndex } from '../config/algolia'

const searchReducer = (prevState, action) => {

    switch (action.type) {
        case 'more': return ({...prevState,limit:prevState.limit+10})
        default:return ({...prevState,...action})
         
    }
    
}

const updateQuery = async(index,search,filters,limit,searchDispatch) =>{
  searchDispatch({prevSearch:search,prevFilters:filters,prevLimit:limit})
  const results = await index.search(search,{
    "hitsPerPage": limit
  })
  searchDispatch({results})
}

export function useSearch() {
    const [searchState, searchDispatch] = useReducer(searchReducer,
         {search: '', filters:[],prevSearch: '', prevFilters:[],results:[],limit:10,prevLimit:10});
    const index = createAlgoliaIndex(ALGOLIA_INDEX.candidates)
    useEffect(() => {
        const {search, prevSearch,filters,limit,prevLimit, prevFilters} = searchState
        if(search !==prevSearch || filters !== prevFilters || prevLimit !== limit){
            updateQuery(index,search,filters,limit,searchDispatch)
        }
        return () => {
        };
    },[searchState]);

    return [searchState, searchDispatch] ;
}
