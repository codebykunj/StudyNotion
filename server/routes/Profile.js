const express = require("express")
const route = express();

const {auth,isInstructor} = require("../middleware/auth")


const{updateProfile,deleteAccount,updateDisplayPicture,  getEnrolledCourses,
  instructorDashboard,getAllUserDetails} = require("../controller/Profile")

route.post("/deleteAccount", auth, deleteAccount)
route.put("/updateDisplayPicture", auth, updateDisplayPicture)
route.put("/updateProfile", auth, updateProfile)
route.get("/getUserDetails", auth, getAllUserDetails)
route.get("/getEnrolledCourses", auth, getEnrolledCourses)
route.get("/instructorDashboard", auth, isInstructor, instructorDashboard)


module.exports = route
