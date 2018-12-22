import { useEffect, useReducer } from 'react';
import { ALGOLIA_INDEX, createAlgoliaIndex } from '../config/algolia';

const searchReducer = (prevState, action) => {
  switch (action.type) {
    case 'more':
      // console.log('useSearch MORE ',prevState.limit);
      return { ...prevState, limit: prevState.limit + 10 };
    default:
      return { ...prevState, ...action };
  }
};

const updateQuery = async (index, search, filters, limit, searchDispatch) => {
  searchDispatch({
    prevSearch: search,
    prevFilters: filters,
    prevLimit: limit,
    limit,
    loading: true,
  });
  const results = await index.search(search, {
    hitsPerPage: limit,
  });
  searchDispatch({ results, loading: false });
};

export function useSearch() {
  const [searchState, searchDispatch] = useReducer(searchReducer, {
    search: '',
    filters: [],
    prevSearch: '',
    prevFilters: [],
    results: [],
    limit: 20,
    prevLimit: 20,
  });
  const index = createAlgoliaIndex(ALGOLIA_INDEX.candidates);
  useEffect(
    () => {
      const {
        search,
        prevSearch,
        filters,
        limit,
        prevLimit,
        prevFilters,
      } = searchState;
      if (search !== prevSearch || filters !== prevFilters) {
        // console.log('update query and reset limit', 20);
        updateQuery(index, search, filters, 20, searchDispatch);
      } else if (prevLimit !== limit) {
        // console.log('update query with new limit', limit);
        updateQuery(index, search, filters, limit, searchDispatch);
      }
      return () => {};
    },
    [searchState]
  );

  console.log('searchState', searchState);
  return [searchState, searchDispatch];
}
