import { ALGOLIA_INDEX, createAlgoliaIndex } from '../config/algolia'

export const calStageStatus = (filterParams) => {
    const index = createAlgoliaIndex(ALGOLIA_INDEX.CANDIDATE_SEARCH);
    
}