const express = require("express");
const router = express.Router();
const { getLeaderboard, addXP } = require("../controller/Gamification");
const { auth } = require("../middleware/auth");

// Route to get global leaderboard
router.get("/leaderboard", getLeaderboard);

// Route to add XP (requires authentication)
router.post("/add-xp", auth, addXP);

module.exports = router;
