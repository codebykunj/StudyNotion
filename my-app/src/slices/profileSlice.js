
// // import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   user: null,
// //   loading: false,
// // };

// // const profileSlice = createSlice({
// //   name: "profile",
// //   initialState,
// //   reducers: {
// //     setUser(state, action) {
// //       state.user = action.payload;
// //     },
// //     setLoading(state, action) {
// //       state.loading = action.payload;
// //     },
// //   },
// // });

// // export const { setUser, setLoading } = profileSlice.actions;
// // export default profileSlice.reducer;





// import {createSlice} from "@reduxjs/toolkit"

// const initialState = {
//     user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
//     loading: false,
// };

// const profileSlice = createSlice({
//     name:"profile",
//     initialState: initialState,
//     reducers: {
//         setUser(state, value) {
//             state.user = value.payload;
//         },
//         setLoading(state, value) {
//             state.loading = value.payload;
//           },
//     },
// });

// export const {setUser, setLoading} = profileSlice.actions;
// export default profileSlice.reducer;
















import { createSlice } from "@reduxjs/toolkit";

// ✅ Safe function to parse user from localStorage
function getUserFromLocalStorage() {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      return JSON.parse(storedUser);
    }
    return null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
}

const initialState = {
  user: getUserFromLocalStorage(),
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // ✅ Save only if user is defined
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, setLoading, logout } = profileSlice.actions;
export default profileSlice.reducer;
