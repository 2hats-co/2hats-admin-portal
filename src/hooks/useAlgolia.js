import { useEffect, useState } from 'react';
import { ALGOLIA_INDEX, createAlgoliaIndex } from '../config/algolia';
const hitsPerPage = 50;
function useAlgolia(initialQuery) {
  const index = createAlgoliaIndex(ALGOLIA_INDEX.users);
  const [results, setResults] = useState([]);
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState(initialQuery || '');
  const [page, setPage] = useState(0);
  const updateQuery = async () => {
    const results = await index.search(query, {
      hitsPerPage,
      page,
    });
    setResults(results);
    setHits([...hits, ...results.hits]);
  };
  const resetQuery = async () => {
    const results = await index.search(query, {
      hitsPerPage,
      page,
    });
    setResults(results);
    setHits(results.hits);
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

  return [hits, setQuery, results, loadMore];
}

export default useAlgolia;
