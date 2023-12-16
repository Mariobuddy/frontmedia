import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postSucess: [],
    postLoading: false,
    postError: false,
  },
  reducers: {
    fetchpost: (state) => {
      state.postLoading = true;
    },
    fetchpostSuccess: (state, action) => {
    state.postLoading = false;
      state.postSucess = action.payload;
    },
    fetchpostError: (state) => {
      state.postLoading = false;
      state.postError = true;
    },
  },
});

export const { fetchpost, fetchpostError, fetchpostSuccess } =
  postSlice.actions;

export default postSlice.reducer;
