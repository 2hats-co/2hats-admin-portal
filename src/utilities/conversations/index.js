import { firestore } from '../../store';
import { COLLECTIONS } from '../../constants/firestore';
import indexOf from 'ramda/es/indexOf';
import remove from 'ramda/es/remove';
export const markAsRead = async (adminId, conversationId) => {
  const conversation = await firestore
    .collection(COLLECTIONS.conversations)
    .doc(conversationId)
    .get();
  const conversationData = conversation.data();
  const indexOfadmin = indexOf(adminId, conversationData.unreadAdmins);
  if (indexOfadmin >= 0) {
    const newUndreadAdmin = remove(
      indexOfadmin,
      1,
      conversation.data().unreadAdmins
    );
    firestore
      .collection(COLLECTIONS.conversations)
      .doc(conversationId)
      .update({ unreadAdmins: newUndreadAdmin });
  }
};

export const addNote = (adminId, conversationId, note, notifyList) => {
  if (!notifyList) notifyList = [];
  firestore
    .collection(COLLECTIONS.conversations)
    .doc(conversationId)
    .collection(COLLECTIONS.messages)
    .add({
      senderId: adminId,
      body: note,
      notifyList,
      createdAt: new Date(),
      sentAt: new Date(),
      type: 'note',
      isIncoming: false,
    });
};

export const addEvent = (adminId, conversationId, event) => {
  firestore
    .collection(COLLECTIONS.conversations)
    .doc(conversationId)
    .collection(COLLECTIONS.messages)
    .add({
      senderId: adminId,
      createdAt: new Date(),
      sentAt: new Date(),
      type: 'event',
      data: event,
    });
};

export const addReminder = (adminId, conversationId, data) => {
  firestore
    .collection(COLLECTIONS.conversations)
    .doc(conversationId)
    .collection(COLLECTIONS.messages)
    .add({
      senderId: adminId,
      createdAt: new Date(),
      sentAt: new Date(),
      type: 'reminder',
      data,
    });
};

export const setAssignee = (adminId, conversationId) => {
  firestore
    .collection(COLLECTIONS.conversations)
    .doc(conversationId)
    .update({ assignee: adminId });
};

export const createConversation = async (uid, assignee) => {
  const candidateDoc = await firestore
    .collection('candidates')
    .doc(uid)
    .get();
  if (candidateDoc.exists) {
    const data = candidateDoc.data();
    const UID = candidateDoc.id;
    const conversationDoc = {
      UID,
      assignee: assignee || '',
      displayName: `${data.firstName} ${data.lastName}`,
      firstName: data.firstName,
      lastName: data.lastName,
      type: 'candidate',
      subscribedAdmins: [],
      unreadAdmins: [],
      lastMessage: {
        body: 'New conversation',
        createdAt: new Date(),
        sentAt: new Date(),
        isIncoming: false,
        type: 'system',
      },
      channels: { email: data.email, phoneNumber: data.phoneNumber || '' },
      createdAt: new Date(),
    };
    const conversation = await firestore
      .collection('conversations')
      .add(conversationDoc);
    return conversation.id;
  }
};
