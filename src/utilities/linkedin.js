import { firestore } from '../../store';
import { COLLECTIONS } from '../../constants/firestore';

/**
 * @param {{UID:string,email:string}} recipient
 * @param {{UID:string,email:string}} sender
 * @param {{subject:string,body:string}} email
 */
export const sendLinkedinMessage = async (
  conversationId,
  accountEmail,
  body
) => {
  const linkedinMessagesQueDoc = {
    conversationId,
    hasSent: false,
    body,
    accountEmail,
    createdAt: new Date(),
  };
  console.log('generated linkedinMessagesQueDoc doc', linkedinMessagesQueDoc);
  //uncommenting will send out linkedin Messages
  //return await firestore.collection(COLLECTIONS.lin).add(gmailDoc);
};
