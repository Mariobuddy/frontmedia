import { takeLatest, put, fork } from "redux-saga/effects";
import axios from "axios";
import {
  fetchAuth,
  fetchAuthError,
  fetchAuthSuccess,
} from "../reducers/authorized";
import { base_url_front } from "./../../components/Base_Url/Base_Url";
import { fetchpost, fetchpostError, fetchpostSuccess } from "../reducers/post";







function* fetchAuthAsync() {
  try {
    const auth = yield axios.get(`${base_url_front}/user/profile`, {
      method: "GET",
      withCredentials: true,
    }); // Replace with your API call
    yield put(fetchAuthSuccess(auth.data.user)); // Dispatch a success action
  } catch (error) {
    yield put(fetchAuthError(error.message)); // Dispatch an error action
  }
}

export function* authSaga() {
  yield takeLatest(fetchAuth.type, fetchAuthAsync);
}

export const mainAuthSaga = [fork(authSaga)];







function* fetchPostAsync() {
  try {
    const post = yield axios.get(`${base_url_front}/post/getpost`, {
      method: "GET",
      withCredentials: true,
    });
    yield put(fetchpostSuccess(post.data.post)); // Dispatch a success action
  } catch (error) {
    yield put(fetchpostError(error.message)); // Dispatch an error action
  }
}

export function* postSaga() {
  yield takeLatest(fetchpost.type, fetchPostAsync);
}

export const mainPostSaga = [fork(postSaga)];






