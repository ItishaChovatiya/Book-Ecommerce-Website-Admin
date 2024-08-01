import { createSlice } from "@reduxjs/toolkit";

// Create a slice for authentication
const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState: { // Initial state of the slice
    isLoggedIn: false, // User is initially logged out
    role: "user" // Default role is "user"
  },
  reducers: { // Reducers to handle state changes
    // Action to log in the user
    login(state) {
      state.isLoggedIn = true; // Update the state to indicate user is logged in
    },
    // Action to log out the user
    logout(state) {
      state.isLoggedIn = false; // Update the state to indicate user is logged out
    },
    // Action to change the user's role
    changeRole(state, action) {
      const role = action.payload; // Get the new role from the action payload
      state.role = role; // Update the role in the state
    }
  }
});

// Export the actions to be used in components
export const authActions = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
