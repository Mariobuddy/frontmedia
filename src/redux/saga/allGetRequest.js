import { takeLatest, put, fork } from "redux-saga/effects";
import axios from "axios";
import {
  fetchAuth,
  fetchAuthError,
  fetchAuthSuccess,
  fetchSinglePostError,
  fetchSinglePostLoading,
  fetchSinglePostSuccess,
} from "../reducers/authorized";
import { base_url_front } from "./../../components/Base_Url/Base_Url";
import { fetchpost, fetchpostError, fetchpostSuccess } from "../reducers/post";
import {
  fetchAllUsers,
  fetchAllUsersError,
  fetchAllUsersSuccess,
} from "../reducers/allUsers";

import {
  fetchlikes,
  fetchlikesError,
  fetchlikesSuccess,
} from "../reducers/likes";

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

// ----------------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------------

function* fetchAllUsersAsync() {
  try {
    const allUsers = yield axios.get(`${base_url_front}/user/alluser`, {
      method: "GET",
      withCredentials: true,
    });
    yield put(fetchAllUsersSuccess(allUsers.data.user)); // Dispatch a success action
  } catch (error) {
    yield put(fetchAllUsersError(error.message)); // Dispatch an error action
  }
}

export function* allUsersSaga() {
  yield takeLatest(fetchAllUsers.type, fetchAllUsersAsync);
}

export const mainAllUsersSaga = [fork(allUsersSaga)];

// ----------------------------------------------------------------------------------------

function* fetchLikesAsync(action) {
  try {
    const likes = yield axios.get(
      `${base_url_front}/post/likeunlike/${action.payload}`,
      {
        method: "GET",
        withCredentials: true,
      }
    );
    yield put(fetchlikesSuccess(likes.data)); // Dispatch a success action
  } catch (error) {
    yield put(fetchlikesError(error.message)); // Dispatch an error action
  }
}

export function* likesSaga() {
  yield takeLatest(fetchlikes.type, fetchLikesAsync);
}

export const mainLikesSaga = [fork(likesSaga)];

// ------------------------------------------------------------------------------------------------


function* fetchSinglePostAsync() {
  try {
    const singlePost = yield axios.get(`${base_url_front}/post/getuserpost`, {
      method: "GET",
      withCredentials: true,
    });
    yield put(fetchSinglePostSuccess(singlePost.data.posts)); // Dispatch a success action
  } catch (error) {
    yield put(fetchSinglePostError(error.message)); // Dispatch an error action
  }
}

export function* singlePostSaga() {
  yield takeLatest(fetchSinglePostLoading.type, fetchSinglePostAsync);
}

export const mainSinglePostSaga = [fork(singlePostSaga)];