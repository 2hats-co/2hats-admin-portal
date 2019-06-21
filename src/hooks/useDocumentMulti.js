import { firestore } from '../store';
import { useEffect, useReducer } from 'react';
import difference from 'ramda/es/difference';
// import equals from 'ramda/es/equals';

const documentReducer = (prevState, action) => {
  switch (action.type) {
    case 'deepAdd':
      const { field, id, data } = action;
      const newField = { ...prevState[field] };
      newField[id] = data;
      return { ...prevState, [field]: newField };

    // backwards-compatible - only updates props
    default:
      return { ...prevState, ...action };
  }
};
const documentIntialState = {
  path: null,
  prevPath: null,
  docIds: [],
  prevDocIds: [],
  docs: {},
  loading: true,
  // unsubscribes: {},
};

const useDocumentMulti = intialOverrides => {
  const [documentState, documentDispatch] = useReducer(documentReducer, {
    ...documentIntialState,
    ...intialOverrides,
  });

  const setDocumentListener = id => {
    const unsubscribe = firestore
      .doc(documentState.path + '/' + id)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          const data = snapshot.data();
          const id = snapshot.id;
          const doc = { ...data, id };
          documentDispatch({
            type: 'deepAdd',
            field: 'docs',
            id,
            data: doc,
          });
        }
      });

    // documentDispatch({
    //   type: 'deepAdd',
    //   field: 'unsubscribes',
    //   id,
    //   data: unsubscribe,
    // });
  };

  useEffect(
    () => {
      const {
        path,
        prevPath,
        // unsubscribes,
        docIds,
        prevDocIds,
        docs,
      } = documentState;

      if (
        (path && path !== prevPath) || // paths different
        docIds.length !== prevDocIds.length || // diff no. docIds
        difference(docIds, prevDocIds).length > 0 // diff docIds
      ) {
        const toDispatch = { prevPath: path, prevDocIds: docIds };
        const newDocs = { ...docs };
        // const newUnsubscribes = { ...unsubscribes };

        // unsubscribe documents not listened to anymore
        // and remove them from docs in state
        const docsToUnsubscribe = difference(prevDocIds, docIds);
        docsToUnsubscribe.forEach(id => {
          // if (unsubscribes[id]) unsubscribes[id]();
          delete newDocs[id];
          // delete newUnsubscribes[id];
          console.log('removed doc', id);
        });

        // check if there are new docs to subscribe to
        const docsToSubscribe = difference(docIds, prevDocIds);
        docsToSubscribe.forEach(id => {
          // newUnsubscribes[id] =
          setDocumentListener(id);
          console.log('subscribed to', id);
        });

        // prepare for dispatch
        if (Object.keys(newDocs).length !== Object.keys(docs).length)
          toDispatch.docs = newDocs;
        // if (!equals(Object.keys(newUnsubscribes), Object.keys(unsubscribes)))
        //   toDispatch.unsubscribes = newUnsubscribes;

        documentDispatch(toDispatch);
      }
    },
    [documentState]
  );

  // unsubscribe from all on unmount
  useEffect(
    () => () => {
      console.log('Unmount useDocumentMulti');
      // Object.entries(documentState.unsubscribes).forEach(([id, fn]) => {
      //   fn();
      //   console.log('Unsubscribed from', id, documentState.path);
      // });
    },
    []
  );

  return [documentState, documentDispatch];
};

export default useDocumentMulti;

/**
 * NOTE: unsubscribes is temporarily disabled since they will be stored
 * as undefined in the state even though useReducer has access to the functions
 * They might be garbage collected and have to be copied every time useReducer
 * is called
 */
