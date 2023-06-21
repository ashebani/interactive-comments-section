import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../context/dataSlice";

export default configureStore({
  reducer: {
    data: dataReducer,
  },
});
