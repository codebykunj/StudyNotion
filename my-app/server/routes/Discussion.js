const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
    createDiscussion,
    getCourseDiscussions,
    addAnswer,
} = require("../controller/Discussion");

router.post("/create", auth, createDiscussion);
router.get("/course/:courseId", auth, getCourseDiscussions);
router.post("/answer", auth, addAnswer);

module.exports = router;
