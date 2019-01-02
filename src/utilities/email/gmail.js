import { firestore } from '../../store';
import { COLLECTIONS } from '../../constants/firestore';
import { removeHtmlTags } from '../index';

/**
 * @param {{UID:string,email:string}} recipient
 * @param {{UID:string,email:string}} sender
 * @param {{subject:string,body:string}} email
 */
export const sendEmail = async (conversationId, emailObject) => {
  const { recipient, sender, email } = emailObject;
  const now = new Date();
  const gmailDoc = {
    conversationId,
    headers: {
      To: recipient.email,
      Cc: recipient.cc,
      From: sender.email,
      Subject: email.subject,
    },
    body: email.body,
    createdAt: now,
  };
  const messageText = removeHtmlTags(email.body);
  const messageDoc = {
    body: email.body,
    subject: email.subject,
    isIncoming: false,
    senderId: sender.id,
    createdAt: now,
    sentAt: now,
    type: 'email',
    cc: recipient.cc,
  };
  const lastMessage = { ...messageDoc, body: messageText };
  console.log('gmailDoc', gmailDoc);
  //uncommenting will send out emails
  await firestore
    .collection(COLLECTIONS.conversations)
    .doc(conversationId)
    .collection(COLLECTIONS.messages)
    .add(messageDoc);
  await firestore
    .collection(COLLECTIONS.conversations)
    .doc(conversationId)
    .update({ lastMessage });
  return await firestore.collection(COLLECTIONS.gmailOutbox).add(gmailDoc);
};
