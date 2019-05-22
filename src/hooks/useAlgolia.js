import { useEffect, useState } from 'react';
import { ALGOLIA_INDEX, createAlgoliaIndex } from '../config/algolia';
const hitsPerPage = 50;
function useAlgolia(initialQuery) {
  const index = createAlgoliaIndex(ALGOLIA_INDEX.users);
  const [results, setResults] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState(initialQuery || '');
  const [page, setPage] = useState(0);

  const setSelectedField = hits => {
    return hits.map(hit => {
      if (selectedIds.includes(hit.objectID)) return { ...hit, selected: true };
      else return { ...hit, selected: false };
    });
  };
  const updateQuery = async () => {
    const results = await index.search(query, {
      hitsPerPage,
      page,
    });
    setResults(results);
    const newHits = setSelectedField(results.hits);
    setHits([...hits, ...newHits]);
  };
  const resetQuery = async () => {
    const results = await index.search(query, {
      hitsPerPage,
      page,
    });
    setResults(results);
    const newHits = setSelectedField(results.hits);
    setHits(newHits);
  };
  useEffect(
    () => {
      resetQuery();
    },
    [query]
  );
  useEffect(
    () => {
      updateQuery();
    },
    [page]
  );
  const loadMore = () => {
    if (results.nbPages > page) setPage(page + 1);
  };
  const select = id => {
    setSelectedIds([...selectedIds, id]);
  };
  const unselect = (id, shouldReload) => {
    const newSelectedIds = selectedIds.filter(selectedId => selectedId !== id);
    setSelectedIds(newSelectedIds);
    if (shouldReload) {
      const newHits = setSelectedField(hits);
      setHits(newHits);
    }
  };
  return [hits, setQuery, results, loadMore, select, unselect, index];
}

export default useAlgolia;
