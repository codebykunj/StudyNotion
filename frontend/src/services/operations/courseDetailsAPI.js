

import { apiconnector } from '../apiconnector';
import { toast } from 'react-hot-toast';
import { courseEndpoints } from '../apis';

const {
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API
   
} = courseEndpoints;

const authHeaders = (token, isMultipart = false) => ({
  Authorization: `${token?.replace(/"/g, "")}`,
  ...(isMultipart ? {} : { 'Content-Type': 'application/json' }),
});


export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Saving Course...");

  try {
    const response = await apiconnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `${token?.replace(/"/g, "")}`, // ✅ fixed this line
    });

    console.log("✅ CREATE COURSE API RESPONSE:", response);

    if (!response?.data?.success || !response?.data?.course) {
      throw new Error(response?.data?.message || "Could Not Add Course Details");
    }

    toast.success("Course Added Successfully");
    result = response.data.course;
  } catch (error) {
    console.log("❌ CREATE COURSE API ERROR:", error);
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};

// export const editCourseDetails = async (data, token) => {
//   let result = null;
//   try {
//     const response = await apiconnector('POST', EDIT_COURSE_API, data, authHeaders(token, true));
//     if (!response?.data?.success) throw new Error('Course update failed');
//     toast.success('Course updated successfully');
//     result = response?.data?.data;
//   } catch (err) {
//     toast.error('Could not update course');
//     console.error('EDIT_COURSE_DETAILS ERROR:', err);
//   }
//   return result;
// };
export const editCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `${token?.replace(/"/g, "")}`,
    })
    console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", CREATE_SECTION_API, data, {
      Authorization: `${token?.replace(/"/g, "")}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.updatedCourse
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
export const updateSection = async (data, token) => {
  let result = null;
  try {
    const response = await apiconnector('POST', UPDATE_SECTION_API, data, authHeaders(token));
    if (!response?.data?.success) throw new Error('Section update failed');
    toast.success('Section updated');
    result = response?.data?.data;
  } catch (err) {
    toast.error('Could not update section');
    console.error('UPDATE_SECTION ERROR:', err);
  }
  return result;
};

export const deleteSection = async (data, token) => {
  try {
    const response = await apiconnector('POST', DELETE_SECTION_API, data, authHeaders(token));
    if (!response?.data?.success) throw new Error('Section deletion failed');
    toast.success('Section deleted');
    return response?.data;
  } catch (err) {
    toast.error('Could not delete section');
    console.error('DELETE_SECTION ERROR:', err);
  }
};

export const createSubSection = async (data, token) => {
  let result = null
  console.log("My COurseDetailsAPI loading");
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `${token?.replace(/"/g, "")}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
export const updateSubSection = async (data, token) => {
  let result = null;
  try {
    const response = await apiconnector('POST', UPDATE_SUBSECTION_API, data, authHeaders(token, true));
    if (!response?.data?.success) throw new Error('Subsection update failed');
    toast.success('Subsection updated');
    result = response?.data?.data;
  } catch (err) {
    toast.error('Could not update subsection');
    console.error('UPDATE_SUBSECTION ERROR:', err);
  }
  return result;
};

export const deleteSubSection = async (data, token) => {
  try {
    const response = await apiconnector('POST', DELETE_SUBSECTION_API, data, authHeaders(token));
    if (!response?.data?.success) throw new Error('Subsection deletion failed');
    toast.success('Subsection deleted');
    return response?.data;
  } catch (err) {
    toast.error('Could not delete subsection');
    console.error('DELETE_SUBSECTION ERROR:', err);
  }
};

export const fetchCourseDetails = async (courseId, token) => {
  let result = null;
  try {
    const response = await apiconnector('POST', COURSE_DETAILS_API, { courseId }, authHeaders(token));
    if (!response?.data?.success) throw new Error('Course fetch failed');
    console.log("Responce",response);
    result = response?.data?.data;
  } catch (err) {
    console.error('FETCH_COURSE_DETAILS ERROR:', err);
  }
  return result;
};



// export const fetchInstructorCourses = async (token) => {
//   let result = [];
//   try {
//     const response = await apiconnector('GET', GET_ALL_COURSE_API, null, authHeaders(token));
//     if (!response?.data?.success) throw new Error('Fetch instructor courses failed');
//     result = response?.data?.data;
//   } catch (err) {
//     console.error('FETCH_INSTRUCTOR_COURSES ERROR:', err);
//     toast.error('Could not fetch courses');
//   }
//   return result;
// };

export const fetchCourseCategories = async () => {
  let result = []
  try {
    const response = await apiconnector("GET", COURSE_CATEGORIES_API)
    console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    // result = response?.data?.data
    result = response?.data?.allTags

  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

// export const deleteCourse = async (data, token) => {
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("DELETE", DELETE_COURSE_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     })
//     console.log("DELETE COURSE API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Delete Course")
//     }
//     toast.success("Course Deleted")
//   } catch (error) {
//     console.log("DELETE COURSE API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
// }






// export const fetchInstructorCourses = async (token) => {
//   let result = []
//   const toastId = toast.loading("Loading...")

//   try {
//     const response = await apiconnector(
//       "GET",
//       GET_ALL_INSTRUCTOR_COURSES_API,
//       {},  // ✅ FIXED: use empty object for GET
//       {
//         Authorization: `${token?.replace(/"/g, "")}`,
//       }
//     )
//     console.log("INSTRUCTOR COURSES API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Fetch Instructor Courses")
//     }
//     result = response?.data?.data
//   } catch (error) {
//     console.log("INSTRUCTOR COURSES API ERROR............", error)
//     toast.error(error.message)
//   }

//   toast.dismiss(toastId)
//   return result
// }




//AA CODE COMPLETE WORK KARE CHE
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiconnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `${token?.replace(/"/g, "")}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}




// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiconnector("POST", CREATE_RATING_API, data, {
      Authorization: `${token?.replace(/"/g, "")}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}


// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `${token?.replace(/"/g, "")}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = { success: true, xp: response.data.xp }
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = { success: false }
  }
  toast.dismiss(toastId)
  return result
}





















































































































// import { toast } from "react-hot-toast"

// import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// // import { setLoading } from "../../slices/profileSlice";
// import { apiconnector } from "../apiconnector"
// import { courseEndpoints } from "../apis"

// const {
//   COURSE_DETAILS_API,
//   COURSE_CATEGORIES_API,
//   GET_ALL_COURSE_API,
//   CREATE_COURSE_API,
//   EDIT_COURSE_API,
//   CREATE_SECTION_API,
//   CREATE_SUBSECTION_API,
//   UPDATE_SECTION_API,
//   UPDATE_SUBSECTION_API,
//   DELETE_SECTION_API,
//   DELETE_SUBSECTION_API,
//   GET_ALL_INSTRUCTOR_COURSES_API,
//   DELETE_COURSE_API,
//   GET_FULL_COURSE_DETAILS_AUTHENTICATED,
//   CREATE_RATING_API,
//   LECTURE_COMPLETION_API,
// } = courseEndpoints

// export const getAllCourses = async () => {
//   const toastId = toast.loading("Loading...")
//   let result = []
//   try {
//     const response = await apiconnector("GET", GET_ALL_COURSE_API)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Fetch Course Categories")
//     }
//     result = response?.data?.data
//   } catch (error) {
//     console.log("GET_ALL_COURSE_API API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// export const fetchCourseDetails = async (courseId) => {
//   const toastId = toast.loading("Loading...")
//   //   dispatch(setLoading(true));
//   let result = null
//   try {
//     const response = await apiconnector("POST", COURSE_DETAILS_API, {
//       courseId,
//     })
//     console.log("COURSE_DETAILS_API API RESPONSE............", response)

//     if (!response.data.success) {
//       throw new Error(response.data.message)
//     }
//     result = response.data
//   } catch (error) {
//     console.log("COURSE_DETAILS_API API ERROR............", error)
//     result = error.response.data
//     // toast.error(error.response.data.message);
//   }
//   toast.dismiss(toastId)
//   //   dispatch(setLoading(false));
//   return result
// }

// // fetching the available course categories
// export const fetchCourseCategories = async () => {
//   let result = []
//   try {
//     const response = await apiconnector("GET", COURSE_CATEGORIES_API)
//     console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Fetch Course Categories")
//     }
//     result = response?.data?.data
//   } catch (error) {
//     console.log("COURSE_CATEGORY_API API ERROR............", error)
//     toast.error(error.message)
//   }
//   return result
// }

// // add the course details
// export const addCourseDetails = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     // const response = await apiconnector("POST", CREATE_COURSE_API, data, {
//     //   "Content-Type": "multipart/form-data",
//     //   Authorization: `${token?.replace(/"/g, "")}`,
//     // })
//     // ✅ FIXED
// const response = await apiconnector("POST", CREATE_COURSE_API, data, {
//   Authorization: `${token?.replace(/"/g, "")}`,
// })

//     console.log("CREATE COURSE API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Add Course Details")
//     }
//     toast.success("Course Details Added Successfully")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("CREATE COURSE API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // edit the course details
// export const editCourseDetails = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("POST", EDIT_COURSE_API, data, {
//       "Content-Type": "multipart/form-data",
//       Authorization: `${token?.replace(/"/g, "")}`,
//     })
//     console.log("EDIT COURSE API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Update Course Details")
//     }
//     toast.success("Course Details Updated Successfully")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("EDIT COURSE API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // create a section
// export const createSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("POST", CREATE_SECTION_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     })
//     console.log("CREATE SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Create Section")
//     }
//     toast.success("Course Section Created")
//     result = response?.data?.updatedCourse
//   } catch (error) {
//     console.log("CREATE SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // create a subsection
// export const createSubSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("POST", CREATE_SUBSECTION_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     })
//     console.log("CREATE SUB-SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Add Lecture")
//     }
//     toast.success("Lecture Added")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("CREATE SUB-SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // update a section
// export const updateSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("POST", UPDATE_SECTION_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     })
//     console.log("UPDATE SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Update Section")
//     }
//     toast.success("Course Section Updated")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("UPDATE SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // update a subsection
// export const updateSubSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("POST", UPDATE_SUBSECTION_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     })
//     console.log("UPDATE SUB-SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Update Lecture")
//     }
//     toast.success("Lecture Updated")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("UPDATE SUB-SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // delete a section
// export const deleteSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("POST", DELETE_SECTION_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     })
//     console.log("DELETE SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Delete Section")
//     }
//     toast.success("Course Section Deleted")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("DELETE SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }
// // delete a subsection
// export const deleteSubSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("POST", DELETE_SUBSECTION_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     })
//     console.log("DELETE SUB-SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Delete Lecture")
//     }
//     toast.success("Lecture Deleted")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("DELETE SUB-SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // fetching all courses under a specific instructor
// export const fetchInstructorCourses = async (token) => {
//   let result = []
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector(
//       "GET",
//       GET_ALL_INSTRUCTOR_COURSES_API,
//       null,
//       {
//         Authorization: `${token?.replace(/"/g, "")}`,
//       }
//     )
//     console.log("INSTRUCTOR COURSES API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Fetch Instructor Courses")
//     }
//     result = response?.data?.data
//   } catch (error) {
//     console.log("INSTRUCTOR COURSES API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // delete a course
// export const deleteCourse = async (data, token) => {
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("DELETE", DELETE_COURSE_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     })
//     console.log("DELETE COURSE API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Delete Course")
//     }
//     toast.success("Course Deleted")
//   } catch (error) {
//     console.log("DELETE COURSE API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
// }

// // get full details of a course
// export const getFullDetailsOfCourse = async (courseId, token) => {
//   const toastId = toast.loading("Loading...")
//   //   dispatch(setLoading(true));
//   let result = null
//   try {
//     const response = await apiconnector(
//       "POST",
//       GET_FULL_COURSE_DETAILS_AUTHENTICATED,
//       {
//         courseId,
//       },
//       {
//         Authorization: `${token?.replace(/"/g, "")}`,
//       }
//     )
//     console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

//     if (!response.data.success) {
//       throw new Error(response.data.message)
//     }
//     result = response?.data?.data
//   } catch (error) {
//     console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
//     result = error.response.data
//     // toast.error(error.response.data.message);
//   }
//   toast.dismiss(toastId)
//   //   dispatch(setLoading(false));
//   return result
// }

// // mark a lecture as complete
// export const markLectureAsComplete = async (data, token) => {
//   let result = null
//   console.log("mark complete data", data)
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("POST", LECTURE_COMPLETION_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     })
//     console.log(
//       "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
//       response
//     )

//     if (!response.data.message) {
//       throw new Error(response.data.error)
//     }
//     toast.success("Lecture Completed")
//     result = true
//   } catch (error) {
//     console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
//     toast.error(error.message)
//     result = false
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // create a rating for course
// export const createRating = async (data, token) => {
//   const toastId = toast.loading("Loading...")
//   let success = false
//   try {
//     const response = await apiconnector("POST", CREATE_RATING_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     })
//     console.log("CREATE RATING API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Create Rating")
//     }
//     toast.success("Rating Created")
//     success = true
//   } catch (error) {
//     success = false
//     console.log("CREATE RATING API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return success
// }



















// courseDetailsAPI.js

// import { courseEndpoints } from '../apis';
// import { apiconnector } from '../apiconnector';
// import { toast } from 'react-hot-toast';

// const {
//   CREATE_COURSE_API,
//   EDIT_COURSE_API,
//   CREATE_SECTION_API,
//   UPDATE_SECTION_API,
//   DELETE_SECTION_API,
//   CREATE_SUBSECTION_API,
//   UPDATE_SUBSECTION_API,
//   DELETE_SUBSECTION_API,
//   GET_ALL_COURSE_API,
//   COURSE_DETAILS_API,
// } = courseEndpoints;

// const authHeaders = (token, isMultipart = false) => ({
//   Authorization: `${token?.replace(/"/g, "")}`,
//   ...(isMultipart ? {} : { 'Content-Type': 'application/json' }),
// });

// export const addCourseDetails = async (data, token) => {
//   let result = null;
//   try {
//     const response = await apiconnector('POST', CREATE_COURSE_API, data, authHeaders(token, true));
//     if (!response?.data?.success) throw new Error('Course creation failed');
//     toast.success('Course created successfully');
//     result = response?.data?.data;
//   } catch (err) {
//     toast.error('Could not create course');
//     console.error('ADD_COURSE_DETAILS ERROR:', err);
//   }
//   return result;
// };

// export const editCourseDetails = async (data, token) => {
//   let result = null;
//   try {
//     const response = await apiconnector('POST', EDIT_COURSE_API, data, authHeaders(token, true));
//     if (!response?.data?.success) throw new Error('Course update failed');
//     toast.success('Course updated successfully');
//     result = response?.data?.data;
//   } catch (err) {
//     toast.error('Could not update course');
//     console.error('EDIT_COURSE_DETAILS ERROR:', err);
//   }
//   return result;
// };

// export const createSection = async (data, token) => {
//   let result = null;
//   try {
//     const response = await apiconnector('POST', CREATE_SECTION_API, data, authHeaders(token));
//     if (!response?.data?.success) throw new Error('Section creation failed');
//     toast.success('Section created');
//     result = response?.data?.data;
//   } catch (err) {
//     toast.error('Could not create section');
//     console.error('CREATE_SECTION ERROR:', err);
//   }
//   return result;
// };

// export const updateSection = async (data, token) => {
//   let result = null;
//   try {
//     const response = await apiconnector('POST', UPDATE_SECTION_API, data, authHeaders(token));
//     if (!response?.data?.success) throw new Error('Section update failed');
//     toast.success('Section updated');
//     result = response?.data?.data;
//   } catch (err) {
//     toast.error('Could not update section');
//     console.error('UPDATE_SECTION ERROR:', err);
//   }
//   return result;
// };

// export const deleteSection = async (data, token) => {
//   try {
//     const response = await apiconnector('POST', DELETE_SECTION_API, data, authHeaders(token));
//     if (!response?.data?.success) throw new Error('Section deletion failed');
//     toast.success('Section deleted');
//     return response?.data;
//   } catch (err) {
//     toast.error('Could not delete section');
//     console.error('DELETE_SECTION ERROR:', err);
//   }
// };

// export const createSubSection = async (data, token) => {
//   let result = null;
//   try {
//     const response = await apiconnector('POST', CREATE_SUBSECTION_API, data, authHeaders(token, true));
//     if (!response?.data?.success) throw new Error('Subsection creation failed');
//     toast.success('Subsection created');
//     result = response?.data?.data;
//   } catch (err) {
//     toast.error('Could not create subsection');
//     console.error('CREATE_SUBSECTION ERROR:', err);
//   }
//   return result;
// };

// export const updateSubSection = async (data, token) => {
//   let result = null;
//   try {
//     const response = await apiconnector('POST', UPDATE_SUBSECTION_API, data, authHeaders(token, true));
//     if (!response?.data?.success) throw new Error('Subsection update failed');
//     toast.success('Subsection updated');
//     result = response?.data?.data;
//   } catch (err) {
//     toast.error('Could not update subsection');
//     console.error('UPDATE_SUBSECTION ERROR:', err);
//   }
//   return result;
// };

// export const deleteSubSection = async (data, token) => {
//   try {
//     const response = await apiconnector('POST', DELETE_SUBSECTION_API, data, authHeaders(token));
//     if (!response?.data?.success) throw new Error('Subsection deletion failed');
//     toast.success('Subsection deleted');
//     return response?.data;
//   } catch (err) {
//     toast.error('Could not delete subsection');
//     console.error('DELETE_SUBSECTION ERROR:', err);
//   }
// };

// export const fetchCourseDetails = async (courseId, token) => {
//   let result = null;
//   try {
//     const response = await apiconnector('POST', COURSE_DETAILS_API, { courseId }, authHeaders(token));
//     if (!response?.data?.success) throw new Error('Course fetch failed');
//     result = response?.data?.data;
//   } catch (err) {
//     console.error('FETCH_COURSE_DETAILS ERROR:', err);
//   }
//   return result;
// };

// export const fetchInstructorCourses = async (token) => {
//   let result = [];
//   try {
//     const response = await apiconnector('GET', GET_ALL_COURSE_API, null, authHeaders(token));
//     if (!response?.data?.success) throw new Error('Fetch instructor courses failed');
//     result = response?.data?.data;
//   } catch (err) {
//     console.error('FETCH_INSTRUCTOR_COURSES ERROR:', err);
//     toast.error('Could not fetch courses');
//   }
//   return result;
// };
























































//aa code thi course successfully create thai che and next page ma navigate pn thavay che.










































































































































































// import { toast } from "react-hot-toast";
// import { apiconnector } from "../apiconnector";
// import { courseEndpoints } from "../apis";

// const {
//   COURSE_DETAILS_API,
//   COURSE_CATEGORIES_API,
//   GET_ALL_COURSE_API,
//   CREATE_COURSE_API,
//   EDIT_COURSE_API,
//   CREATE_SECTION_API,
//   CREATE_SUBSECTION_API,
//   UPDATE_SECTION_API,
//   UPDATE_SUBSECTION_API,
//   DELETE_SECTION_API,
//   DELETE_SUBSECTION_API,
//   GET_ALL_INSTRUCTOR_COURSES_API,
//   DELETE_COURSE_API,
//   GET_FULL_COURSE_DETAILS_AUTHENTICATED,
//   CREATE_RATING_API,
//   LECTURE_COMPLETION_API,
// } = courseEndpoints;

// // GET all courses
// export const getAllCourses = async () => {
//   const toastId = toast.loading("Loading...");
//   let result = [];
//   try {
//     const response = await apiconnector("GET", GET_ALL_COURSE_API);
//     if (!response?.data?.success) {
//       throw new Error("Could not fetch courses");
//     }
//     result = response.data.data;
//   } catch (error) {
//     console.log("GET_ALL_COURSE_API ERROR:", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result;
// };

// // ADD new course
// export const addCourseDetails = async (data, token) => {
//   const toastId = toast.loading("Loading...");
//   let result = null;
//   try {
//     const response = await apiconnector("POST", CREATE_COURSE_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     });
//     console.log("CREATE COURSE RESPONSE:", response);
//     if (!response?.data?.success) {
//       throw new Error("Could not add course");
//     }
//     toast.success("Course added successfully");
//     result = response.data.data;
//   } catch (error) {
//     console.log("CREATE COURSE ERROR:", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result;
// };

// // EDIT course
// export const editCourseDetails = async (data, token) => {
//   const toastId = toast.loading("Updating...");
//   let result = null;
//   try {
//     const response = await apiconnector("POST", EDIT_COURSE_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     });
//     console.log("EDIT COURSE RESPONSE:", response);
//     if (!response?.data?.success) {
//       throw new Error("Could not update course");
//     }
//     toast.success("Course updated successfully");
//     result = response.data.data;
//   } catch (error) {
//     console.log("EDIT COURSE ERROR:", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result;
// };

// // DELETE course
// export const deleteCourse = async (data, token) => {
//   const toastId = toast.loading("Deleting...");
//   let result = null;
//   try {
//     const response = await apiconnector("DELETE", DELETE_COURSE_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     });
//     console.log("DELETE COURSE RESPONSE:", response);
//     if (!response?.data?.success) {
//       throw new Error("Could not delete course");
//     }
//     toast.success("Course deleted successfully");
//     result = response.data.data;
//   } catch (error) {
//     console.log("DELETE COURSE ERROR:", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result;
// };

// // CREATE section
// export const createSection = async (data, token) => {
//   let result = null;
//   const toastId = toast.loading("Creating section...");
//   try {
//     const response = await apiconnector("POST", CREATE_SECTION_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     });
//     if (!response?.data?.success) {
//       throw new Error("Could not create section");
//     }
//     toast.success("Section created");
//     result = response.data.data;
//   } catch (error) {
//     console.log("CREATE_SECTION_API ERROR:", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result;
// };

// // CREATE subsection
// export const createSubSection = async (data, token) => {
//   let result = null;
//   const toastId = toast.loading("Creating subsection...");
//   try {
//     const response = await apiconnector("POST", CREATE_SUBSECTION_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     });
//     if (!response?.data?.success) {
//       throw new Error("Could not create subsection");
//     }
//     toast.success("Subsection created");
//     result = response.data.data;
//   } catch (error) {
//     console.log("CREATE_SUBSECTION_API ERROR:", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result;
// };

// // UPDATE section
// export const updateSection = async (data, token) => {
//   let result = null;
//   const toastId = toast.loading("Updating section...");
//   try {
//     const response = await apiconnector("POST", UPDATE_SECTION_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     });
//     if (!response?.data?.success) {
//       throw new Error("Could not update section");
//     }
//     toast.success("Section updated");
//     result = response.data.data;
//   } catch (error) {
//     console.log("UPDATE_SECTION_API ERROR:", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result;
// };

// // DELETE section
// export const deleteSection = async (data, token) => {
//   let result = null;
//   const toastId = toast.loading("Deleting section...");
//   try {
//     const response = await apiconnector("DELETE", DELETE_SECTION_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     });
//     if (!response?.data?.success) {
//       throw new Error("Could not delete section");
//     }
//     toast.success("Section deleted");
//     result = response.data.data;
//   } catch (error) {
//     console.log("DELETE_SECTION_API ERROR:", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result;
// };

// // DELETE subsection
// export const deleteSubSection = async (data, token) => {
//   let result = null;
//   const toastId = toast.loading("Deleting subsection...");
//   try {
//     const response = await apiconnector("DELETE", DELETE_SUBSECTION_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     });
//     if (!response?.data?.success) {
//       throw new Error("Could not delete subsection");
//     }
//     toast.success("Subsection deleted");
//     result = response.data.data;
//   } catch (error) {
//     console.log("DELETE_SUBSECTION_API ERROR:", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result;
// };

// // CREATE rating
// export const createRating = async (data, token) => {
//   let result = null;
//   const toastId = toast.loading("Submitting rating...");
//   try {
//     const response = await apiconnector("POST", CREATE_RATING_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     });
//     if (!response?.data?.success) {
//       throw new Error("Could not submit rating");
//     }
//     toast.success("Rating submitted");
//     result = response.data.data;
//   } catch (error) {
//     console.log("CREATE_RATING_API ERROR:", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result;
// };

// // LECTURE completion
// export const markLectureAsComplete = async (data, token) => {
//   let result = null;
//   try {
//     const response = await apiconnector("POST", LECTURE_COMPLETION_API, data, {
//       Authorization: `${token?.replace(/"/g, "")}`,
//     });
//     if (!response?.data?.success) {
//       throw new Error("Could not mark lecture as complete");
//     }
//     result = response.data.data;
//   } catch (error) {
//     console.log("LECTURE_COMPLETION_API ERROR:", error);
//     toast.error(error.message);
//   }
//   return result;
// };


export const fetchInstructorCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  
  // **અહીં લોગ ઉમેરો:**
  console.log("Token received in API call:", token);

  try {
    const response = await apiconnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null, // GET request માટે bodyData null હોવું જોઈએ
      {
        Authorization: `Bearer ${token?.replace(/"/g, "")}`,
      }
    )
    console.log("INSTRUCTOR COURSES API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message)
    // **અહીં વધુ વિગતો લોગ કરો:**
    console.log("Error details:", error.response); // axios error હોય તો response ઓબ્જેક્ટ તપાસો
  }

  toast.dismiss(toastId)
  return result
}


export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", DELETE_COURSE_API, data, {
      Authorization: `${token?.replace(/"/g, "")}`,
    })
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}