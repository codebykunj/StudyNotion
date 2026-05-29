const express = require("express");
const router = express.Router();
const { generateQuizAndFlashcards } = require("../controller/AITools");
const { auth, isInstructor } = require("../middleware/auth");

// Route for generating AI content (Instructors only)
router.post("/generate", auth, isInstructor, generateQuizAndFlashcards);

module.exports = router;
