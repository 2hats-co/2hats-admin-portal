import algoliasearch from 'algoliasearch'

export const ALGOLIA_INDEX = {
    CANDIDATE_SEARCH: 'candidate_search'
};

export const createAlgoliaIndex = ((indexName) => {
    const algolia = algoliasearch(
        process.env.REACT_APP_ALGOLIA_APP_ID,
        process.env.REACT_APP_ALGOLIA_API_KEY
    );
 
    return (indexName) => {
        const index = algolia.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME);
        return index;
    };
})();
