import { toast } from "react-hot-toast"
import  setLoading  from "../../slices/profileSlice"
import  setUser  from "../../slices/profileSlice"

import { apiconnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API,PUT_UPDATEPROFILE } = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiconnector("GET", GET_USER_DETAILS_API, null, {
        // Authorization: `Bearer ${token}`,
        Authorization: `${token}`,

      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiconnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token?.replace(/"/g, "")}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    const response = await apiconnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token?.replace(/"/g, "")}`,
    })

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses
  }
  catch(error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    if (error.response?.status !== 401) {
      toast.error("Could not Get Instructor Data")
    }
  }
  toast.dismiss(toastId);
  return result;
}


// export async function updateProfile(dateOfBirth,gender,about,contactNumber){
//   const toastId = toast.loading("Loading...");

//   try{
//     const responce = await apiconnector("PUT",PUT_UPDATEPROFILE,{dateOfBirth,gender,about,contactNumber})
//     console.log("UPDATE PROFILE RESPONSE",responce);
//   }
//   catch(error){
//     console.log("RESET PASSWORD TOKEN Error", error);
//     toast.error("Unable to reset password");
//   }
//   toast.dismiss(toastId);

// }







// import { toast } from "react-hot-toast"
// import { setLoading, setUser } from "../../slices/profileSlice"
// import { apiConnector } from "../apiconnector"
// import { profileEndpoints } from "../apis"
// import { logout } from "./authAPI"

// const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API,PUT_UPDATEPROFILE } = profileEndpoints

// export function getUserDetails(token, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
//         // Authorization: `Bearer ${token}`,
//         Authorization: `${token}`,

//       })
//       console.log("GET_USER_DETAILS API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }
//       const userImage = response.data.data.image
//         ? response.data.data.image
//         : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
//       dispatch(setUser({ ...response.data.data, image: userImage }))
//     } catch (error) {
//       dispatch(logout(navigate))
//       console.log("GET_USER_DETAILS API ERROR............", error)
//       toast.error("Could Not Get User Details")
//     }
//     toast.dismiss(toastId)
//     dispatch(setLoading(false))
//   }
// }

// export async function getUserEnrolledCourses(token) {
//   const toastId = toast.loading("Loading...")
//   let result = []
//   try {
//     console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
//     const response = await apiConnector(
//       "GET",
//       GET_USER_ENROLLED_COURSES_API,
//       // null,
//       {
//         // Authorization: `Bearer ${token}`,
//         Authorization: `${token}`,

//       }
//     )
//     console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
//     // console.log(
//     //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
//     //   response
//     // )

//     if (!response.data.success) {
//       throw new Error(response.data.message)
//     }
//     result = response.data.data
//   } catch (error) {
//     console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
//     toast.error("Could Not Get Enrolled Courses")
//   }
//   toast.dismiss(toastId)
//   return result
// }

// export async function getInstructorData(token) {
//   const toastId = toast.loading("Loading...");
//   let result = [];
//   try{
//     const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API,
//     // null, 
//     {
//       // Authorization: `Bearer ${token}`,
//       Authorization: ` ${token}`,

//     })

//     console.log("GET_INSTRUCTOR_API_RESPONSE", response);
//     result = response?.data?.courses

//   }
//   catch(error) {
//     console.log("GET_INSTRUCTOR_API ERROR", error);
//     toast.error("Could not Get Instructor Data")
//   }
//   toast.dismiss(toastId);
//   return result;
// }


// export async function updateProfile(dateOfBirth,gender,about,contactNumber){
//   const toastId = toast.loading("Loading...");

//   try{
//     const responce = await apiConnector("PUT",PUT_UPDATEPROFILE,{dateOfBirth,gender,about,contactNumber})
//     console.log("UPDATE PROFILE RESPONSE",responce);
//   }
//   catch(error){
//     console.log("RESET PASSWORD TOKEN Error", error);
//     toast.error("Unable to reset password");
//   }
//   toast.dismiss(toastId);

// }

// export async function updateProfile(dateOfBirth, gender, about, contactNumber) {
//   const toastId = toast.loading("Loading...");

//   try {
//     const response = await apiconnector("PUT", PUT_UPDATEPROFILE, {
//       dateOfBirth,
//       gender,
//       about,
//       contactNumber,
//     });
//     console.log("UPDATE PROFILE RESPONSE", response);
//   } catch (error) {
//     console.log("UPDATE PROFILE ERROR", error);
//     toast.error("Unable to update profile");
//   }

//   toast.dismiss(toastId);
// }
