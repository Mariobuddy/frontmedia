import { createSlice } from "@reduxjs/toolkit";

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    likesSucess: {},
    likesLoading: false,
    likesError: false,
  },
  reducers: {
    fetchlikes: (state) => {
      state.likesLoading = true;
    },
    fetchlikesSuccess: (state, action) => {
      state.likesLoading = false;
      state.likesSucess = action.payload;
    },
    fetchlikesError: (state) => {
      state.likesLoading = false;
      state.likesError = true;
    },
  },
});

export const { fetchlikes,fetchlikesError,fetchlikesSuccess } =
likesSlice.actions;

export default likesSlice.reducer;
