import { UserActionTypes } from './user.types'

const INITIAL_STATE = {
  currentUser: null
}

const userReducer = (currentState = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...currentState,
        currentUser: payload
      }
    default:
      return currentState
  }
}

export default userReducer
