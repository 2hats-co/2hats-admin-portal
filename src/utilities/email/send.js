import {firestore} from '../../store';
import {COLLECTIONS} from '../../constants/firestore'

/**
 * 
 * @param {{UID:string,email:string}} recipient 
 * @param {{UID:string,email:string}} sender 
 * @param {{subject:string,body:string}} email 
 */
export const sendEmail = async (emailObject) => {
    const {recipient, sender, email} = emailObject;

    const commDoc = {
       UID: recipient.UID,
       candidateEmail: recipient.email,
       type: "outbox",
       adminEmail: sender.email,
       adminUID: sender.UID,
       subject: email.subject,
       body: email.body,
       createdAt: new Date()
   };
   return await firestore.collection(COLLECTIONS.communications).add(commDoc);
}
