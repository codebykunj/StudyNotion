const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { chat } = require("../controller/Chatbot");

// Only logged-in users can use the chatbot
router.post("/chat", auth, chat);

module.exports = router;
