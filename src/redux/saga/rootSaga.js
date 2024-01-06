import { all } from "redux-saga/effects";
import {
  mainAuthSaga,
  mainPostSaga,
  mainAllUsersSaga,
  mainLikesSaga,
  mainSinglePostSaga
} from "./allGetRequest";

export default function* rootSaga() {
  yield all([
    ...mainAuthSaga,
    ...mainPostSaga,
    ...mainAllUsersSaga,
    ...mainLikesSaga,
    ...mainSinglePostSaga
  ]);
}
