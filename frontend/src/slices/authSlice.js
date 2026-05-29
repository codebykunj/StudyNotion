// import { createSlice } from "@reduxjs/toolkit";

// // ✅ Get token from localStorage (with debug logs)
// let token = null;
// try {
//   const storedToken = localStorage.getItem("token");
//   console.log("👉 Raw token from localStorage:", storedToken); // Log before parsing
//   token = storedToken ? JSON.parse(storedToken) : null;
//   console.log("✅ Token loaded from localStorage:", token); // Log after parsing
// } catch (error) {
//   console.error("❌ Error parsing token from localStorage:", error);
//   token = null;
// }

// // ✅ Initial state
// const initialState = {
//   token: token,
//   signupData: null,
//   loading: false,
// };

// // ✅ Create slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setToken: (state, action) => {
//       console.log("🟢 SET TOKEN CALLED", action.payload);
//       state.token = action.payload;
//       localStorage.setItem("token", JSON.stringify(action.payload)); // ✅ Save to localStorage
//     },
//     setSignupData: (state, action) => {
//       console.log("🟡 SET SIGNUP DATA", action.payload);
//       state.signupData = action.payload;
//     },
//     setLoading: (state, action) => {
//       console.log("🔵 SET LOADING", action.payload);
//       state.loading = action.payload;
//     },
//   },
// });

// // ✅ Export actions and reducer
// export const { setToken, setSignupData, setLoading } = authSlice.actions;
// export default authSlice.reducer;




// src/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

// ✅ Get token from localStorage (with debug logs)
let token = null;
try {
  const storedToken = localStorage.getItem("token");
  console.log("👉 Raw token from localStorage:", storedToken); // Log before parsing
  token = storedToken ? JSON.parse(storedToken) : null;
  console.log("✅ Token loaded from localStorage:", token); // Log after parsing
} catch (error) {
  console.error("❌ Error parsing token from localStorage:", error);
  token = null;
}

// ✅ Initial state
const initialState = {
  token: token,
  signupData: null,
  loading: false,
};

// ✅ Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      console.log("🟢 SET TOKEN CALLED", action.payload);
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload)); // ✅ Save to localStorage
    },
    setSignupData: (state, action) => {
      console.log("🟡 SET SIGNUP DATA", action.payload);
      state.signupData = action.payload;
    },
    setLoading: (state, action) => {
      console.log("🔵 SET LOADING", action.payload);
      state.loading = action.payload;
    },
  },
});

// ✅ Export actions and reducer
export const { setToken, setSignupData, setLoading } = authSlice.actions;
export default authSlice.reducer;
