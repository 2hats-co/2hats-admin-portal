import { applyMiddleware, createStore, compose } from 'redux'
import { reduxFirestore } from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import logger from 'redux-logger'


import { productionConfig, stagingConfig } from '../config/firebase'

import rootReducer from '../reducers'
							
if (process.env.REACT_APP_ENV === 'PRODUCTION') {
	console.log('production')
	firebase.initializeApp(productionConfig)
} else {
	console.log('staging')
	firebase.initializeApp(stagingConfig)
}

export function configureStore(initialState, history) {
	const enhancers = []
	// Provide timestamp settings to silence warning about deprecation
	//firebase.firestore().settings({ timestampsInSnapshots: true })
	// Dev tools store enhancer
	const devToolsExtension = window.devToolsExtension;
	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension());
	}

	// const persistConfig = {
	// 	key: 'root',
	// 	storage,
	// }
	//const persistedReducer = persistReducer(persistConfig, rootReducer)
	const createStoreWithMiddleware = compose(
		// Add redux firestore store enhancer
		reduxFirestore(firebase),
		applyMiddleware(logger),
		...enhancers
	)(createStore)

	const store = createStoreWithMiddleware(rootReducer);

	return store;
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();