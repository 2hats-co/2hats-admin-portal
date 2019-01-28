import { makeId } from '../index';
import { firestore, auth } from '../../store';
import { COLLECTIONS } from '../../constants/firestore';
export const updateDoc = (collection, docId, properties) => {
  firestore
    .collection(collection)
    .doc(docId)
    .update({ ...properties });
};
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
    .update({ ...properties });
};

export const generateSmartKey = (uid, route) => {
  const smartKey = makeId(36);
  let slDoc = {
    UID: uid,
    expireTime: new Date(7 * 24 * 60 * 60 * 1000),
    route: route,
    startTime: new Date(),
    createdAt: new Date(),
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
      .update({ ...docObj.updates });
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

export const createDoc = (collection, docData) => {
  firestore.collection(collection).add(docData);
};
export const deleteDoc = (collection, docId) => {
  firestore
    .collection(collection)
    .doc(docId)
    .delete();
};
