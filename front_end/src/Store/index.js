import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./path/to/authSlice"; // Adjust the import path to your file

const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth reducer here
    // You can add other reducers here as needed
  }
});

export default store;
