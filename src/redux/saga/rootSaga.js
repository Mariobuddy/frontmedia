import { all } from "redux-saga/effects";
import { mainAuthSaga,mainPostSaga } from "./allGetRequest";

export default function* rootSaga() {
  yield all([...mainAuthSaga,...mainPostSaga]);
}
