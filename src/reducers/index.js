import { combineReducers } from "redux";
import userReducer from "./user";
import { firestoreReducer as firestore } from "redux-firestore";
const rootReducer = combineReducers({
  firestore,
  userState: userReducer
});
export default rootReducer;
