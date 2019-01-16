import { firestore } from '../store';
import { useEffect, useReducer } from 'react';

const documentReducer = (prevState, newProps) => {
  return { ...prevState, ...newProps };
};
const documentIntialState = {
  path: null,
  prevPath: null,
  doc: null,
  loading: true,
};

const useDocument = intialOverrides => {
  const [documentState, documentDispatch] = useReducer(documentReducer, {
    ...documentIntialState,
    ...intialOverrides,
  });
  const setDocumentListner = () => {
    documentDispatch({ prevPath: documentState.path });
    const unsubscribe = firestore
      .doc(documentState.path)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          const data = snapshot.data();
          const id = snapshot.id;
          const doc = { ...data, id };
          documentDispatch({
            doc,
            loading: false,
          });
        }
      });
    documentDispatch({ unsubscribe });
  };
  useEffect(
    () => {
      const { path, prevPath, unsubscribe } = documentState;
      if (path && path !== prevPath) {
        if (unsubscribe) unsubscribe();
        setDocumentListner();
      }
      return () => {
        if (unsubscribe) unsubscribe();
      };
    },
    [documentState]
  );
  return [documentState, documentDispatch];
};

export default useDocument;
