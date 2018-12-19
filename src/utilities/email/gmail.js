import {firestore} from '../../store';
import {COLLECTIONS} from '../../constants/firestore'

/**
 * 
 * @param {{UID:string,email:string}} recipient 
 * @param {{UID:string,email:string}} sender 
 * @param {{subject:string,body:string}} email 
 */
export const sendEmail = async (conversationId,emailObject) => {
    const {recipient, sender, email} = emailObject;
    const gmailDoc = {
       conversationId,
       headers: {To:recipient.email,From:sender.email,Subject:email.subject},
       body: email.body,
       createdAt: new Date()
   };
   console.log('generated gmail outbox doc',gmailDoc)
   //uncommenting will send out emails
  // return await firestore.collection(COLLECTIONS.gmailOutbox).add(gmailDoc);
}
