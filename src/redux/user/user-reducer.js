import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isFetching: false
};

const userReducer = (currentState = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UserActionTypes.CHECK_USER_SESSION:
    case UserActionTypes.SIGN_OUT_START:
    case UserActionTypes.SIGN_IN_START:
      return {
        ...currentState,
        error: null,
        isFetching: true
      }
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...currentState,
        currentUser: payload,
        isFetching: false,
        error: null
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...currentState,
        currentUser: null,
        isFetching: false,
        error: null
      };
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...currentState,
        currentUser: null,
        isFetching: false,
        error: payload
      };
    default:
      return currentState;
  }
};

export default userReducer;
