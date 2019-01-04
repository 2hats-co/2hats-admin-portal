import { COLLECTIONS } from '../constants/firestore';
import { updateProperties } from './firestore';

export const markAsRead = (uid, notifications) => {
  const notificationsToMarkAsRead = notifications.filter(
    x => x.unreadSubscribers.indexOf(uid) > -1
  );

  notificationsToMarkAsRead.forEach(x => {
    const unreadSubscribers = [...x.unreadSubscribers];
    unreadSubscribers.splice(unreadSubscribers.indexOf(uid), 1);
    updateProperties(COLLECTIONS.notifications, x.id, { unreadSubscribers });
  });
};
