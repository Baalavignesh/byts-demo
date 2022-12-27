import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "Baalavignesh",
  level: "Flow Control",
  sublevel: "0",
};

export const userSlice = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    updateLevel: (state, action) => {
      console.log("slice data : " + action.payload);
      state.level = action.payload;
    },
  },
});

export const { updateLevel } = userSlice.actions;

export default userSlice.reducer;
