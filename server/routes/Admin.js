const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const {
    getPendingInstructors,
    approveInstructor,
    rejectInstructor,
    getAllUsers,
    getAllCourses,
    deleteCourse,
    getDashboardStats,
} = require("../controller/Admin");

// All admin routes require authentication + Admin role
router.use(auth, isAdmin);

// Dashboard stats
router.get("/stats", getDashboardStats);

// Instructor management
router.get("/pending-instructors", getPendingInstructors);
router.put("/approve-instructor/:instructorId", approveInstructor);
router.put("/reject-instructor/:instructorId", rejectInstructor);

// User management
router.get("/users", getAllUsers);

// Course management
router.get("/courses", getAllCourses);
router.delete("/course/:courseId", deleteCourse);

module.exports = router;
