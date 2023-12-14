import { configureStore } from "@reduxjs/toolkit";
import authorizedSlice from "../reducers/authorized";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    authorized: authorizedSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export default store;
