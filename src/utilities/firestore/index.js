
import {firestore,auth} from '../../store'
import{COLLECTIONS} from '../../constants/firestore'
export const updateProperties = (collection,docId,properties) =>{
    firestore.collection(collection).doc(docId).update({...properties})
}
export const updateAdminSubCollectionProps = (collection,docId,properties) =>{
    const uid = auth.currentUser.uid
    firestore.collection(COLLECTIONS.admins).doc(uid).collection(collection).doc(docId).update({...properties})
}
export const deleteDoc = (collection,docId) =>{
    firestore.collection(collection).doc(docId).delete()
}