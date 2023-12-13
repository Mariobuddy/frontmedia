import { configureStore } from "@reduxjs/toolkit";
import authorizedSlice from "../reducers/authorized";

const store = configureStore({
  reducer: {
    authorized:authorizedSlice
  },
});

export default store;
