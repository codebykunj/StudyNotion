const express = require("express");
const router = express.Router();
const { getInstructorAnalytics } = require("../controller/Analytics");
const { auth, isInstructor } = require("../middleware/auth");

router.get("/instructor-dashboard", auth, isInstructor, getInstructorAnalytics);

module.exports = router;
