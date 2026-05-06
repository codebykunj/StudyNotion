
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
  SENDOTP_API: BASE_URL + "/users/sendOTP",  // Corrected to match your actual route
  SIGNUP_API: BASE_URL + "/users/signup",    // Assuming signup also uses /users
  LOGIN_API: BASE_URL + "/users/login",      // Assuming login also uses /users
  RESETPASSTOKEN_API: BASE_URL + "/users/resetPasswordToken",
  RESETPASSWORD_API: BASE_URL + "/users/resetPassword",  
  CATEGORIES_API: BASE_URL + "/courses/getAllCategory",
};

export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/courses/getCategoryPageDetails",
}
// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
  // PUT_UPDATEPROFILE:BASE_URL + "/profile/updateProfile"
}

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/contact/createContact",
}

export const courseEndpoints = {
  // CATEGORIES_API: BASE_URL + "/courses/getAllCategory",
  GET_ALL_COURSE_API: BASE_URL + "/courses/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/courses/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/courses/editCourse",
  CREATE_COURSE_API: BASE_URL + "/courses/createCourse",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/courses/getInstructorCourses",
  DELETE_COURSE_API: BASE_URL + "/courses/deleteCourse",



  COURSE_CATEGORIES_API: BASE_URL + "/courses/getAllCategory",


  CREATE_SECTION_API: BASE_URL + "/courses/createSection",
  UPDATE_SECTION_API: BASE_URL + "/courses/updateSection",
  DELETE_SECTION_API: BASE_URL + "/courses/deleteSection",


  UPDATE_SUBSECTION_API: BASE_URL + "/courses/updateSubSection",
  DELETE_SUBSECTION_API: BASE_URL + "/courses/deleteSubSection",
  CREATE_SUBSECTION_API: BASE_URL + "/courses/createSubSection",


  GET_FULL_COURSE_DETAILS_AUTHENTICATED:BASE_URL + "/courses/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/courses/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/courses/createRating",
}


export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payments/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payments/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payments/sendPaymentSuccessEmail",
}

export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/courses/getReviews",
}

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/profile/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteAccount",
}

// ADMIN ENDPOINTS
export const adminEndpoints = {
  GET_ADMIN_STATS_API: BASE_URL + "/admin/stats",
  GET_PENDING_INSTRUCTORS_API: BASE_URL + "/admin/pending-instructors",
  APPROVE_INSTRUCTOR_API: BASE_URL + "/admin/approve-instructor",
  REJECT_INSTRUCTOR_API: BASE_URL + "/admin/reject-instructor",
  GET_ALL_USERS_API: BASE_URL + "/admin/users",
  GET_ALL_COURSES_ADMIN_API: BASE_URL + "/admin/courses",
  DELETE_COURSE_ADMIN_API: BASE_URL + "/admin/course",
}

// QUIZ ENDPOINTS
export const quizEndpoints = {
  CREATE_QUIZ_API: BASE_URL + "/quiz/create",
  GET_QUIZ_BY_SECTION_API: BASE_URL + "/quiz/section",
  SUBMIT_QUIZ_API: BASE_URL + "/quiz/submit",
  GET_MY_ATTEMPTS_API: BASE_URL + "/quiz/attempts",
  CHECK_SECTION_QUIZ_PASSED_API: BASE_URL + "/quiz/section",
  DELETE_QUIZ_API: BASE_URL + "/quiz",
}

// DISCUSSION ENDPOINTS
export const discussionEndpoints = {
  CREATE_DISCUSSION_API: BASE_URL + "/discussion/create",
  GET_COURSE_DISCUSSIONS_API: BASE_URL + "/discussion/course",
  ADD_ANSWER_API: BASE_URL + "/discussion/answer",
}







// const BASE_URL=process.env.REACT_APP_BASE_URL

// // AUTH ENDPOINTS
// export const categories = {
//   SENDOTP_API: BASE_URL + "/auth/sendotp",
//   SIGNUP_API: BASE_URL + "/auth/signup",
//   LOGIN_API: BASE_URL + "/auth/login",

// }




































// // api.js
// const BASE_URL = process.env.REACT_APP_BASE_URL;
// console.log("BASE_URL CHECK:", process.env.REACT_APP_BASE_URL);

// export const categories = {CATEGORIES_API: BASE_URL + "/course/users/getAllCategory",};
// console.log("BASE_URL:", BASE_URL);

// export const SENDOTP_API = `${BASE_URL}/auth/sendOTP`;
// // export const SENDOTP_API = `${BASE_URL}/users/sendOTP`;

// export const SIGNUP_API = `${BASE_URL}/auth/signup`;
// // export const SIGNUP_API = `${BASE_URL}/auth/users/signup`;

// export const LOGIN_API = `${BASE_URL}/auth/login`;
// // export const LOGIN_API = `${BASE_URL}/auth/users/login`;





// const BASE_URL = "https://localhost:4000/api/v1"








// src/services/apis.js
// export const categories = {
//   SENDOTP_API: "/auth/users/sendOTP",
//   SIGNUP_API: "/auth/users/signup",
//   LOGIN_API: "/auth/users/login",
// };



















































// const BASE_URL = "https://localhost:4000/api/v1"

// // AUTH ENDPOINTS
// export const endpoints = {
//   SENDOTP_API: BASE_URL + "/auth/sendotp",
//   SIGNUP_API: BASE_URL + "/auth/signup",
//   LOGIN_API: BASE_URL + "/auth/login",
// }






