import { configureStore } from "@reduxjs/toolkit";
import authorizedSlice from "../reducers/authorized";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import postSlice from "../reducers/post";
import allUsersSlice from "../reducers/allUsers";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    authorized: authorizedSlice,
    post:postSlice,
    allusers:allUsersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export default store;
