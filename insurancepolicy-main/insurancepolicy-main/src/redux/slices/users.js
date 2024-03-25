import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
  policyRequests: [],
};

export const userState = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload;
    },
    populateRequests: (state, action) => {
      state.policyRequests = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function .... fixed 11:54
export const { addUser, populateRequests } = userState.actions;

export default userState.reducer;
