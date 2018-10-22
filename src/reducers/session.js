import { actionsTypes }from '../actions/AuthenticationContainerActions';

const INITIAL_STATE = {
    authUser: null,
  };
  const applySetAuthUser = (state, action) => ({
    ...state,
    authUser: action.authUser,
    userCompleteInitialSteps: false
  });
  function sessionReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
      case 'AUTH_USER_SET' : {
        return applySetAuthUser(state, action);
      }
      case actionsTypes.MARK_USER_AS_STEPS_COMPLETED_ACTION:
        return {
          ...state,
          userCompleteInitialSteps: action.payload
        }
      break;
      default : return state;
    }
  }
  export default sessionReducer;