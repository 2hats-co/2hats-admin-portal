import { useEffect, useReducer } from 'react';
import { ALGOLIA_INDEX, createAlgoliaIndex } from '../config/algolia'

const searchReducer = (prevState, state) => {
    console.log(prevState,state)
    return ({...prevState,...state})
}

const updateQuery = async(index,search,filters,searchDispatch) =>{
  searchDispatch({prevSearch:search,prevFilters:filters})
  const results = await index.search(search,{
    "hitsPerPage": 10
  })
  searchDispatch({results})
}

export function useSearch() {
    const [searchState, searchDispatch] = useReducer(searchReducer,
         {search: '', filters:[],prevSearch: '', prevFilters:[],results:[]});
    const index = createAlgoliaIndex(ALGOLIA_INDEX.candidates)
    useEffect(() => {
        const {search, prevSearch,filters, prevFilters} = searchState
        if(search !==prevSearch || filters !== prevFilters ){
            updateQuery(index,search,filters,searchDispatch)
        }
        return () => {
        };
    },[searchState]);

    return [searchState, searchDispatch] ;
}
