import { createSlice } from "@reduxjs/toolkit";

const authorizedSlice = createSlice({
  name: "authorized",
  initialState: {
    authSucess: {},
    authLoading: false,
    authError: false,
    singlePostLoading: false,
    singlePostSucess: [],
    singlePostError: false,
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
    fetchSinglePostLoading: (state) => {
      state.singlePostLoading = true;
    },
    fetchSinglePostSuccess: (state, action) => {
      state.singlePostLoading = false;
      state.singlePostSucess = action.payload;
    },
    fetchSinglePostError: (state) => {
      state.singlePostLoading = false;
      state.singlePostError = true;
    },
  },
});

export const {
  getToken,
  fetchAuth,
  fetchAuthError,
  fetchAuthSuccess,
  fetchSinglePostError,
  fetchSinglePostLoading,
  fetchSinglePostSuccess,
} = authorizedSlice.actions;

export default authorizedSlice.reducer;
