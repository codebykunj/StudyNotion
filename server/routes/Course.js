const express = require("express")
const route = express.Router()

// const {auth} = require("../middleware/auth")

// const {createCourse,showAllCourse,getCourseDetails} = require("../controller/Course")
const {createCategory,getAllCategory,categoryPageDetails} = require("../controller/Category")
const {createSection,updateSection,deleteSection }= require("../controller/Section")
const{createSubSection,updateSubSection,deleteSubSection}=require("../controller/SubSection")
const{createRating,getAverageRating,getAllRating}=require("../controller/RatingAndReview")
// const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth");
const { createCourse, showAllCourse, getCourseDetails,editCourse,getInstructorCourses,getFullCourseDetails,
  deleteCourse} = require("../controller/Course");

  const {updateCourseProgress} = require("../controller/CourseProgress")


// const {
//   updateCourseProgress
// } = require("../controllers/CourseProgress");

console.log("auth",  auth);             // function હોવું જોઈએ
console.log("isInstructor",  isInstructor); // function હોવું જોઈએ
console.log("createCourse",  createCourse); // function હોવું જોઈએ

//course
route.post("/createCourse", auth, isInstructor, createCourse)
route.get("/showAllCourse",showAllCourse)
route.post("/getCourseDetails",getCourseDetails)
route.post("/editCourse", auth, isInstructor, editCourse)
route.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// route.delete("/deleteCourse", deleteCourse); // અથવા auth, isInstructor, deleteCourse જો ફક્ત ઇન્સ્ટ્રક્ટર જ ડિલીટ કરી શકે
route.post("/deleteCourse", deleteCourse); // અથવા auth, isInstructor, deleteCourse જો ફક્ત ઇન્સ્ટ્રક્ટર જ ડિલીટ કરી શકે

// route.delete("/deleteCourse", deleteCourse)
route.post("/getFullCourseDetails", auth, getFullCourseDetails)



route.post("/createCategory",createCategory)
// route.post("/createCategory", auth, isAdmin, createCategory)

route.get("/getAllCategory", getAllCategory)
// route.get("/getAllCategory",auth,isAdmin, getAllCategory)

route.post("/getCategoryPageDetails", categoryPageDetails)
// route.post("/getCategoryPageDetails",auth,isAdmin, categoryPageDetails)

route.post("/updateCourseProgress",auth,isStudent,updateCourseProgress)




//section
route.post("/createSection", auth, isInstructor, createSection)
// route.post("/addSection", auth, isInstructor, createSection)
route.post("/updateSection", auth, isInstructor, updateSection)
route.post("/deleteSection", auth, isInstructor, deleteSection)

//subsection

// route.post("/createSubSection", auth, isInstructor, createSubSection)
// route.post("/updateSubSection", auth, isInstructor, updateSubSection)
// route.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
route.post("/createSubSection", auth,  createSubSection)
route.post("/updateSubSection", auth,  updateSubSection)
route.post("/deleteSubSection", auth,  deleteSubSection)

//RatingAndReview
route.post("/createRating", auth, isStudent, createRating)
route.get("/getAverageRating", getAverageRating)
route.get("/getReviews", getAllRating)

//courseProgress
// router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);


module.exports = route


