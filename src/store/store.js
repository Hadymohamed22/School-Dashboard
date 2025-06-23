import { configureStore } from "@reduxjs/toolkit";
import studentsSlice from "./slices/studentsSlice";
import teachersSlice from "./slices/teachersSlice";

const store = configureStore({
  reducer: {
    students: studentsSlice,
    teachers: teachersSlice,
  },
});

export default store;
