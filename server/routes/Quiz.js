const express = require("express");
const router = express.Router();
const { auth, isInstructor, isStudent } = require("../middleware/auth");
const {
    createQuiz,
    getQuizBySection,
    submitQuiz,
    getMyAttempts,
    checkSectionQuizPassed,
    deleteQuiz,
} = require("../controller/Quiz");

// Instructor routes
router.post("/create", auth, isInstructor, createQuiz);
router.delete("/:quizId", auth, isInstructor, deleteQuiz);

// Student routes
router.post("/submit", auth, isStudent, submitQuiz);
router.get("/attempts/:quizId", auth, isStudent, getMyAttempts);

// Shared routes (both instructor preview + student access)
router.get("/section/:sectionId", auth, getQuizBySection);
router.get("/section/:sectionId/check", auth, checkSectionQuizPassed);

module.exports = router;
