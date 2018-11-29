import {firestore} from '../../store';
import {COLLECTIONS} from '../../constants/firestore'

/**
 * 
 * @param {{UID:string,email:string}} user 
 * @param {{UID:string,email:string}} admin 
 * @param {{subject:string,body:string}} email 
 */
export const sendEmail = async (user,admin,email) => {
    const commDoc = {
       UID: user.UID,
       candidateEmail: user.email,
       type: "outbox",
       adminEmail: admin.email,
       adminUID: admin.UID,
       subject: email.subject,
       body: email.body,
       createdAt: new Date()
   };
   return await firestore.collection(COLLECTIONS.communications).add(commDoc);
}