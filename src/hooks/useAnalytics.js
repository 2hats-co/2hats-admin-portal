import React, { useState, useEffect } from 'react';
import { CLOUD_FUNCTIONS, callable } from '../firebase/functions';
function useAnalytics(query) {
  const [counter, setCounter] = useState('--');
  useEffect(() => {
    loadQuery(query);
  }, []);
  const loadQuery = query => {
    callable(
      CLOUD_FUNCTIONS.stats,
      { filters: query.filters, collection: query.collection },
      o => {
        setCounter(o.data.value);
      },
      e => console.log('fail', e)
    );
  };
  return counter;
}
export default useAnalytics;
