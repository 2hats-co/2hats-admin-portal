import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { updateDoc } from './firestore';

export const markAllAsRead = (uid, notifications) => {
  const notificationsToMarkAsRead = notifications.filter(x => x.unread);

  notificationsToMarkAsRead.forEach(x => {
    markAsRead(uid, x);
  });
};

export const archive = (uid, notification) =>
  updateDoc(
    `${COLLECTIONS.admins}/${uid}/${COLLECTIONS.notifications}`,
    notification.id,
    { archived: true }
  );

export const markAsRead = (uid, notification) =>
  updateDoc(
    `${COLLECTIONS.admins}/${uid}/${COLLECTIONS.notifications}`,
    notification.id,
    { unread: false }
  );
