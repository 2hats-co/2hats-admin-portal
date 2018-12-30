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
    firestore.doc(documentState.path).onSnapshot(snapshot => {
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
  };
  useEffect(
    () => {
      if (documentState.path !== documentState.prevPath) setDocumentListner();
      return () => {
        firestore.doc(documentState.path).onSnapshot(() => {});
      };
    },
    [documentState]
  );
  return [documentState, documentDispatch];
};

export default useDocument;
