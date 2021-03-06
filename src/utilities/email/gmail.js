import { firestore } from '../../store';
import { COLLECTIONS } from '../../constants/firestore';
import { removeHtmlTags, makeId } from '../index';

/**
 * @param {{UID:string,email:string}} recipient
 * @param {{UID:string,email:string}} sender
 * @param {{subject:string,body:string}} email
 */
export const sendEmail = async (conversationId, emailObject) => {
  const { recipient, sender, email, attachments } = emailObject;
  const messageId = makeId(12);
  const now = new Date();
  const gmailDoc = {
    conversationId,
    messageId,
    headers: {
      To: recipient.email,
      Cc: recipient.cc,
      From: sender.email,
      Subject: email.subject,
    },
    body: email.body,
    createdAt: now,
    attachments,
  };
  const messageDoc = {
    body: email.body,
    subject: email.subject,
    isIncoming: false,
    senderId: sender.id,
    createdAt: now,
    sentAt: now,
    type: 'email',
    cc: recipient.cc,
    attachments,
  };

  let messageText = email.body;
  if (email.body.includes('</head>')) {
    messageText = removeHtmlTags(email.body.split('</head>')[1]);
  }

  const lastMessage = { ...messageDoc, body: messageText };
  //console.log('gmailDoc', gmailDoc);
  //uncommenting will send out emails
  await firestore
    .collection(COLLECTIONS.conversations)
    .doc(conversationId)
    .collection(COLLECTIONS.messages)
    .doc(messageId)
    .set(messageDoc);
  await firestore
    .collection(COLLECTIONS.conversations)
    .doc(conversationId)
    .update({ lastMessage });
  return await firestore.collection(COLLECTIONS.gmailOutbox).add(gmailDoc);
};
