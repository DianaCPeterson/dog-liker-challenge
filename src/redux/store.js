import { configureStore } from "@reduxjs/toolkit";
import dogsReducer from "./dogsSlice";
import filterReducer from "./filterSlice";
import emailsReducer from "./emailsSlice";
// here's the place we put all our reducers derived from our slices
export default configureStore({
  reducer: {
    dogs: dogsReducer,
    filter: filterReducer,
    emails: emailsReducer,
  },
});
