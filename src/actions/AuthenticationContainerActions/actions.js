import {
MARK_USER_AS_STEPS_COMPLETED_ACTION
} from './actionTypes';

export function MarkUserAsStepsCompleteAction(MarkUserAsStepsComplete) {
  return {
    type: MARK_USER_AS_STEPS_COMPLETED_ACTION,
    payload: MarkUserAsStepsComplete
  };
}
