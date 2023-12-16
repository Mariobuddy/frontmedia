import { configureStore } from "@reduxjs/toolkit";
import authorizedSlice from "../reducers/authorized";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import postSlice from "../reducers/post";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    authorized: authorizedSlice,
    post:postSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export default store;
