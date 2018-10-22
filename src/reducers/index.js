import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import { firestoreReducer as firestore } from 'redux-firestore'
const rootReducer = combineReducers({
  firestore,
  sessionState: sessionReducer,
  userState: userReducer,
});
export default rootReducer;
