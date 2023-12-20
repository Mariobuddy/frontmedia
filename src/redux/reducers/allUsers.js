import { createSlice } from "@reduxjs/toolkit";

const allUsersSlice = createSlice({
  name: "allusers",
  initialState: {
    allUsersSucess: [],
    allUserLoading: false,
    allUserError: false,
  },
  reducers: {
    fetchAllUsers: (state) => {
      state.allUserLoading = true;
    },
    fetchAllUsersSuccess: (state, action) => {
      state.allUserLoading = false;
      state.allUsersSucess = action.payload;
    },
    fetchAllUsersError: (state) => {
      state.allUserLoading = false;
      state.allUserError = true;
    },
  },
});

export const { fetchAllUsers, fetchAllUsersError, fetchAllUsersSuccess } =
  allUsersSlice.actions;

export default allUsersSlice.reducer;
