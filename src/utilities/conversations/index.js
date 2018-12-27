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
  console.log(indexOfadmin, conversationData.unreadAdmins);
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
