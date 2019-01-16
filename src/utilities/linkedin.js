import { firestore } from '../store';
import { COLLECTIONS } from '../constants/firestore';

/**
 * @param {{UID:string,email:string}} recipient
 * @param {{UID:string,email:string}} sender
 * @param {{subject:string,body:string}} email
 */
export const sendLinkedinMessage = async (
  senderId,
  conversationId,
  linkedin,
  body
) => {
  const conversationsMessageDoc = {
    senderId,
    body,
    createdAt: new Date(),
    isIncoming: false,
    sentAt: new Date(),
    type: 'linkedin',
  };
  firestore
    .collection(COLLECTIONS.conversations)
    .doc(conversationId)
    .update({ lastMessage: conversationsMessageDoc });
  firestore
    .collection(COLLECTIONS.conversations)
    .doc(conversationId)
    .collection(COLLECTIONS.messages)
    .add(conversationsMessageDoc);

  const linkedinMessagesQueueDoc = {
    conversationId,
    hasSent: false,
    body,
    ...linkedin,
    createdAt: new Date(),
  };
  return await firestore
    .collection(COLLECTIONS.linkedinMessageQueue)
    .add(linkedinMessagesQueueDoc);
};
