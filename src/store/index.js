import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/messaging';
import { productionConfig, stagingConfig } from '../config/firebase';
import { COLLECTIONS } from '../constants/firestore';
if (process.env.REACT_APP_ENV === 'PRODUCTION') {
  console.log('production');
  firebase.initializeApp(productionConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true });
} else {
  console.log('staging');
  firebase.initializeApp(stagingConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true });
}
export const messaging = firebase.messaging();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export function initializePushNotifications() {
  const uid = auth.currentUser.uid;
  console.log('auth', uid);
  //   messaging.usePublicVapidKey(
  //     'BIlTAY0QyfNpixrdf2Wr7pJps1nKBIFTkwkjtBU4Cm86ACiGtvDCPOFKb2HjG3v_NS0NomR-E2B6R9oXXSHTUTM'
  //   );
  messaging
    .requestPermission()
    .then(() => {
      return messaging.getToken();
    })
    .then(token => {
      console.log('FCM Token:', token);
      firestore
        .collection(COLLECTIONS.admins)
        .doc(uid)
        .update({ FCMToken: token });
    })
    .catch(error => {
      if (error.code === 'messaging/permission-blocked') {
        console.log('Please Unblock Notification Request Manually');
      } else {
        console.log('Error Occurred', error);
      }
    });
}

export const functions = firebase.app().functions('asia-northeast1');
