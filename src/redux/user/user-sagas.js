import { takeLatest, put, all, call } from "redux-saga/effects";

import { UserActionTypes } from "./user.types";
import {
  auth,
  googleProvider,
  getDataFromRef,
  getCurrentUser,
  sendAuthenticatedPostRequest
} from "../../firebase";
import {
  signInFailure,
  signOutSuccess,
  signInSuccess,
  signOutFailure
} from "./user.actions";

import constants from "../../client-side-private-files";

export function* signIn() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const verifiedUser = yield createVerifiedUser(user);
    if (!verifiedUser) {
      yield auth.signOut();
      yield put(signInFailure({ message: "User is not an admin" }));
    } else {
      yield put(signInSuccess(verifiedUser));
    }
  } catch (err) {
    console.log(err)
    yield put(signInFailure(err));
  }
}

export function* createVerifiedUser(user) {
  let dashboardAccess = false
  if (!user || !user.emailVerified) return null;
  try {
    let allUsers = yield getDataFromRef("Users");

    let shouldAllow = Object.entries(allUsers).find(
      ([_, val]) => user.email === val.email
    )
    if (!shouldAllow) return null;
    if (shouldAllow[1].dashboardAccess) dashboardAccess = true
    if (shouldAllow[0] !== user.uid) {
      const url = constants.FIREBASE_CHANGE_USER_KEY_FUNCTION_URL;
      
      //Remove existing user
      const postBody = { oldKey: shouldAllow[0], newKey: user.uid };
      const response = yield sendAuthenticatedPostRequest(url, postBody);
      console.log(response);
    }
  } catch {
    return null;
  }
  return {
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    dashboardAccess: dashboardAccess
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
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) {
      yield put(signInFailure({ message: "No user is signed in" }));
      return
    }
    const verifiedUser = yield createVerifiedUser(userAuth);
    if (!verifiedUser) {
      yield auth.signOut();
      yield put(signInFailure({ message: "User is not an admin" }));
    } else {
      yield put(signInSuccess(verifiedUser));
    }
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onSignOutStart),
    call(onCheckUserSession)
  ]);
}
