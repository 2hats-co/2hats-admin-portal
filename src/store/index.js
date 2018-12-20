import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import { productionConfig, stagingConfig } from '../config/firebase'
if (process.env.REACT_APP_ENV === 'PRODUCTION') {
	console.log('production')
	firebase.initializeApp(productionConfig);
	firebase.firestore().settings({timestampsInSnapshots: true});
} else {
	console.log('staging')
	firebase.initializeApp(stagingConfig);
	firebase.firestore().settings({timestampsInSnapshots: true});
}
export const auth = firebase.auth();
export const firestore = firebase.firestore()
export const functions = firebase.app().functions("asia-northeast1");