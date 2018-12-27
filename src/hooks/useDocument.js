import { firestore } from '../store';
import { useEffect, useReducer } from 'react';

const documentReducer = (prevState, newProps) => {
  return { ...prevState, ...newProps };
};
const documentIntialState = {
  doc: null,
  loading: true,
};

const useDocument = (path, intialOverrides) => {
  const [documentState, documentDispatch] = useReducer(documentReducer, {
    ...documentIntialState,
    ...intialOverrides,
  });
  const setDocumentListner = path => {
    firestore.doc(path).onSnapshot(snapshot => {
      if (snapshot.doc) {
        const data = snapshot.doc.data();
        const id = snapshot.doc.id;
        const doc = { ...data, id };
        documentDispatch({
          doc,
          loading: false,
        });
      }
    });
  };
  useEffect(
    () => {
      if (!documentState.doc) setDocumentListner();
      return () => {
        firestore.doc(path).onSnapshot(() => {});
      };
    },
    [documentState]
  );
  return [documentState.doc];
};

export default useDocument;
