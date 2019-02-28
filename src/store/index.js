import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import 'firebase/messaging';
import { productionConfig, stagingConfig } from '../config/firebase';
import { COLLECTIONS } from '../constants/firestore';
if (process.env.REACT_APP_ENV === 'PRODUCTION') {
  console.log('production');
  firebase.initializeApp(productionConfig);
  //  firebase.firestore().settings({ timestampsInSnapshots: true });
} else {
  console.log('staging');
  firebase.initializeApp(stagingConfig);
  //firebase.firestore().settings({ timestampsInSnapshots: true });
}
export const messaging = firebase.messaging();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const firebaseStorage = firebase.storage().ref();
export const functions = firebase.app().functions('asia-northeast1');
//export const functions = firebase.functions();
export function initializePushNotifications() {
  if (process.env.REACT_APP_ENV === 'PRODUCTION') {
    const uid = auth.currentUser.uid;
    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then(token => {
        firestore
          .collection(COLLECTIONS.admins)
          .doc(uid)
          .update({ FCMToken: token });
      })
      .catch(error => {
        if (error.code === 'messaging/permission-blocked') {
          alert('Please Unblock Notification Request Manually');
        } else {
          console.log('Error Occurred', error);
        }
      });
  }
}
