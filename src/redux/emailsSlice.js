import { createSlice } from "@reduxjs/toolkit";

export const emailsSlice = createSlice({
  name: "emails",
  initialState: {
    list: [],
  },
  reducers: {
    addEmail: (state, { payload }) => {
      // .push is destructive so it is the same as setting a new state
      // this is because the @reduxjs-toolkit uses the Immer library!
      // more info here: https://github.com/immerjs/immer
      state.list.push(payload);
    },
  },
});

export const { addEmail } = emailsSlice.actions;
export const emailsState = (state) => state.emails.list;
export default emailsSlice.reducer;
