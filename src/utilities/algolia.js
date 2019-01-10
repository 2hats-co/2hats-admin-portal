import { ALGOLIA_INDEX, createAlgoliaIndex } from '../config/algolia';
const index = createAlgoliaIndex(ALGOLIA_INDEX.users);

export const calStageStatus = async filterParams => {
  const { stage, statusList, from, to } = filterParams;
  let query = {
    numericFilters: [],
    hitsPerPage: 0,
    page: 0,
    restrictSearchableAttributes: '',
    analytics: false,
    attributesToRetrieve: '*',
  };
  let filter = [];
  let response;

  // Generate search query.
  for (const status of statusList) {
    filter.push(`history.${stage}.${status}:${from} TO ${to}`);
  }
  query.numericFilters.push(filter);

  response = await index.search(query);
  return response.nbHits;
};

export const totalCandidates = async () => {
  let query = {
    numericFilters: [],
    hitsPerPage: 0,
    page: 0,
    restrictSearchableAttributes: '',
    analytics: false,
    attributesToRetrieve: '*',
  };
  const response = await index.search(query);
  return response.nbHits;
};
