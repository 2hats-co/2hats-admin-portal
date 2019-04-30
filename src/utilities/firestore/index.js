import { makeId } from '../index';
import firebase from 'firebase/app';

import { firestore, auth } from '../../store';
import { COLLECTIONS } from '../../constants/firestore';

export const updateAdminSubCollectionProps = (
  collection,
  docId,
  properties
) => {
  const uid = auth.currentUser.uid;
  firestore
    .collection(COLLECTIONS.admins)
    .doc(uid)
    .collection(collection)
    .doc(docId)
    .update({
      ...properties,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const generateSmartKey = (uid, route) => {
  const smartKey = makeId(36);
  let slDoc = {
    UID: uid,
    expireTime: new Date(7 * 24 * 60 * 60 * 1000),
    route: route,
    startTime: firebase.firestore.FieldValue.serverTimestamp(),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    disable: false,
  };
  firestore
    .collection(COLLECTIONS.smartLinks)
    .doc(smartKey)
    .set(slDoc);
  return smartKey;
};

export const updateUserDocs = (uid, docObjs) => {
  docObjs.forEach(docObj => {
    firestore
      .collection(docObj.collection)
      .doc(uid)
      .update({
        ...docObj.updates,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  });
};
export const getfirstIdOfQuery = async (collectionPath, filters) => {
  let query = firestore.collection(collectionPath);
  filters.forEach(filter => {
    query = query.where(filter.field, filter.operator, filter.value);
  });
  const results = await query.get();
  if (results.empty) {
    return false;
  } else {
    return results.docs[0].id;
  }
};

export const createDoc = (collection, docData, docId) => {
  const doc = {
    ...docData,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  if (docId) {
    firestore
      .collection(collection)
      .doc(docId)
      .set(doc);
  } else {
    firestore.collection(collection).add(doc);
  }
};
export const addDoc = createDoc;
export const deleteDoc = (collection, docId) =>
  firestore
    .collection(collection)
    .doc(docId)
    .delete();

export const updateDoc = (collection, docId, properties) =>
  firestore
    .collection(collection)
    .doc(docId)
    .update({
      ...properties,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

export const getDoc = async (collection, docId) => {
  const doc = await firestore
    .collection(collection)
    .doc(docId)
    .get();
  return doc.data();
};
export const queryCount = async (collection, filters) => {
  let query = firestore.collection(collection);
  filters.forEach(filter => {
    query = query.where(filter.field, filter.operator, filter.value);
  });
  const snapshot = await query.get();
  console.log(snapshot);
  return snapshot.docs.length || 0;
};
