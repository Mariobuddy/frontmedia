import { createSlice } from "@reduxjs/toolkit";

const authorizedSlice = createSlice({
  name: "authorized",
  initialState: {
    isAuth: localStorage.getItem("jwt"),
  },
  reducers: {
    getToken: (state) => {
      state.isAuth = localStorage.getItem("jwt");
    },
  },
});

export const { getToken } = authorizedSlice.actions;

export default authorizedSlice.reducer;
