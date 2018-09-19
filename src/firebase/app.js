import firebase from 'firebase/app'
import 'firebase/functions'
import 'firebase/auth'
const STAGING_PROJECT_NAME = 'staging2hats'
const PRODUCTION_PROJECT_NAME = 'production2hats'
const staging2hatsKey = "AIzaSyC5X6WfsorYvEG_wZacfhg7Y6QP4IgJ9DI"
const production2hatsKey = "AIzaSyD9EnwYfFxTvnaDMA7r6MbKoXmZbQmukrg"

const stagingConfig = {
  apiKey: staging2hatsKey,
  authDomain: `${STAGING_PROJECT_NAME}.firebaseapp.com`,
  databaseURL: `https://${STAGING_PROJECT_NAME}.firebaseio.com`,
  projectId: STAGING_PROJECT_NAME,
  storageBucket: `${STAGING_PROJECT_NAME}.appspot.com`,
  messagingSenderId: "188089188588"
};
const productionConfig = {
  apiKey: production2hatsKey,
  authDomain: `${PRODUCTION_PROJECT_NAME}.firebaseapp.com`,
  databaseURL: `https://${PRODUCTION_PROJECT_NAME}.firebaseio.com`,
  projectId: PRODUCTION_PROJECT_NAME,
  storageBucket: `${PRODUCTION_PROJECT_NAME}.appspot.com`,
  messagingSenderId: "188089188588"
};

if (process.env.REACT_APP_ENV === 'PRODUCTION') {
    console.log('production')
    firebase.initializeApp(productionConfig)
} else {
    console.log('staging')
    firebase.initializeApp(stagingConfig)
}

export const initFirebaseApp =()=>{
  
}					

export const functions = firebase.functions();
export const auth = firebase.auth();