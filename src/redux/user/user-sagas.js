import { takeLatest, put, all, call } from "redux-saga/effects";

import { UserActionTypes } from "./user.types";
import {
  auth,
  googleProvider,
  getDataFromRef,
  getCurrentUser
} from "../../firebase";
import {
  signInFailure,
  signOutSuccess, signInSuccess,
  signOutFailure
} from "./user.actions";

export function* signIn() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const verifiedUser = yield createVerifiedUser(user);
    if (!verifiedUser) {
       yield auth.signOut()
       yield put(signInFailure({message: "User is not an admin"}))
    } else {
        yield put(signInSuccess(verifiedUser))
    }
    
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* createVerifiedUser(user) {
  if (!user || !user.emailVerified) return null;
  try {
    let allUsers = yield getDataFromRef("Users");

    let shouldAllow = Object.values(allUsers).find(
      e => user.email === e.email && e.dashboardAccess
    );
    if (!shouldAllow) return null;
  } catch {
    return null;
  }

  return {
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber
  };
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailure(err));
  }
}
export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    const verifiedUser = yield createVerifiedUser(userAuth);
    if (!verifiedUser) {
       yield auth.signOut()
       yield put(signInFailure({message: "User is not an admin"}))
    } else {
        yield put(signInSuccess(verifiedUser))
    }
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([call(onSignInStart), call(onSignOutStart), call(onCheckUserSession)]);
}
