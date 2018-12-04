
import {firestore} from '../../store'
export const updateProperties = (collection,docId,properties) =>{
    firestore.collection(collection).doc(docId).update({...properties})
}
