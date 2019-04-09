// import React,
import { useState, useEffect } from 'react';
import { getDoc } from '../utilities/firestore';
import queryString from 'query-string';
import { COLLECTIONS } from '../constants/firestore';
const useClient = initialSearch => {
  const [client, setClient] = useState({});
  const [search, setSearch] = useState(initialSearch);
  const getClient = async clientId => {
    const clientDoc = await getDoc(COLLECTIONS.clients, clientId);
    setClient({ ...clientDoc, id: clientId });
  };
  useEffect(
    () => {
      const parsedQuery = queryString.parse(search);
      console.log('parsedQuery', parsedQuery);
      if (parsedQuery.clientId) {
        getClient(parsedQuery.clientId);
        setClient({ id: parsedQuery.clientId });
      } else {
        setClient({});
      }
    },
    [search]
  );

  return [client, setSearch];
};
export default useClient;
