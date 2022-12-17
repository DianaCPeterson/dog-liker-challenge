import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    // default value of current filter is all
    currentFilter: "all",
    // even though these wont change, redux is a good place to store strings
    allFilters: {
      "All Dogs": "all",
      "Good Dogs": "good",
      "OK Dogs": "ok",
    },
  },
  reducers: {
    setFilter: (state, { payload }) => {
      state.currentFilter = payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterState = (state) => state.filter.currentFilter;
export const allFilters = (state) => state.filter.allFilters;
export default filterSlice.reducer;
