import { firestore } from '../../store';
import { COLLECTIONS } from '../../constants/firestore';
import indexOf from 'ramda/es/indexOf';
import remove from 'ramda/es/remove';
export const markAsRead = async (adminId, conversationId) => {
  console.log(adminId, conversationId);
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
    console.log('newUndreadAdmin', newUndreadAdmin);
    firestore
      .collection(COLLECTIONS.conversations)
      .doc(conversationId)
      .update({ unreadAdmins: newUndreadAdmin });
  }
};

export const addNote = (adminId, conversationId, note) => {
  firestore
    .collection(COLLECTIONS.conversations)
    .doc(conversationId)
    .collection(COLLECTIONS.messages)
    .add({
      senderId: adminId,
      body: note,
      createdAt: new Date(),
      sentAt: new Date(),
      type: 'note',
    });
};

export const setAssignee = (adminId, conversationId) => {
  firestore
    .collection(COLLECTIONS.conversations)
    .doc(conversationId)
    .update({ assignee: adminId });
};
