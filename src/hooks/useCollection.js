import { firestore } from '../store';
// import { COLLECTIONS } from '../constants/firestore';
import { useEffect, useReducer } from 'react';
import equals from 'ramda/es/equals';
// const generateFilters = () => {
//   let filters = [];

//   return filters;
// };

const collectionReducer = (prevState, newProps) => {
  if (newProps.type) {
    switch (newProps.type) {
      case 'more':
        if (prevState.limit < 100)
          // document hardcap
          return { ...prevState, limit: prevState.limit + 10 };
        else return { ...prevState };
      default:
        break;
    }
  } else {
    return { ...prevState, ...newProps };
  }
};
const collectionIntialState = {
  documents: null,
  prevFilters: null,
  prevPath: null,
  filters: [],
  prevLimit: 0,
  limit: 20,
  loading: true,
};

const useCollection = (path, intialOverrides) => {
  const [collectionState, collectionDispatch] = useReducer(collectionReducer, {
    ...collectionIntialState,
    path,
    ...intialOverrides,
  });
  const getDocuments = (filters, limit, sort) => {
    //unsubscribe from old path
    if (
      collectionState.prevPath &&
      collectionState.path !== collectionState.prevPath
    ) {
      firestore.collection(collectionState.prevPath).onSnapshot(() => {});
    }
    //updates prev values
    collectionDispatch({
      prevFilters: filters,
      prevLimit: limit,
      prevPath: collectionState.path,
    });
    let query = firestore.collection(collectionState.path);

    filters.forEach(filter => {
      query = query.where(filter.field, filter.operator, filter.value);
    });
    if (sort) {
      query = query.orderBy(sort.field, sort.direction);
    }
    query.limit(limit).onSnapshot(snapshot => {
      if (snapshot.docs.length > 0) {
        const documents = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { ...data, id };
        });
        collectionDispatch({
          documents,
          loading: false,
        });
      } else {
        collectionDispatch({
          documents: [],
          loading: false,
        });
      }
    });
  };
  useEffect(
    () => {
      const {
        prevFilters,
        filters,
        prevLimit,
        limit,
        prevPath,
        path,
        sort,
      } = collectionState;
      if (
        !equals(prevFilters, filters) ||
        prevLimit !== limit ||
        prevPath !== path
      ) {
        getDocuments(filters, limit, sort);
      }
      return () => {
        firestore.collection(path).onSnapshot(() => {});
      };
    },
    [collectionState.filters, collectionState.limit, collectionState.path]
  );
  return [collectionState, collectionDispatch];
};

export default useCollection;
