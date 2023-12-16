import { createSlice } from "@reduxjs/toolkit";

const authorizedSlice = createSlice({
  name: "authorized",
  initialState: {
    authSucess: {},
    authLoading: false,
    authError: false,
    isAuth: localStorage.getItem("jwt"),
  },
  reducers: {
    getToken: (state) => {
      state.isAuth = localStorage.getItem("jwt");
    },
    fetchAuth: (state) => {
      state.authLoading = true;
    },
    fetchAuthSuccess: (state, action) => {
      state.authLoading = false;
      state.authSucess = action.payload;
    },
    fetchAuthError: (state) => {
      state.authLoading = false;
      state.authError = true;
    },
  },
});

export const { getToken, fetchAuth, fetchAuthError, fetchAuthSuccess } =
  authorizedSlice.actions;

export default authorizedSlice.reducer;
