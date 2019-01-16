import algoliasearch from 'algoliasearch';

export const ALGOLIA_INDEX = {
  candidates: 'candidate_search',
  users: 'users',
};

export const createAlgoliaIndex = (indexName => {
  const algolia = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY
  );

  return indexName => {
    const index = algolia.initIndex(indexName);
    return index;
  };
})();
