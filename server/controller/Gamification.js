const User = require("../models/User");

exports.getLeaderboard = async (req, res) => {
    try {
        // Find top 10 students based on xp, then by streak
        const leaderboard = await User.find({ accountType: "Student" })
            .sort({ xp: -1, streak: -1 })
            .limit(10)
            .select("firstName lastName image xp streak");

        res.status(200).json({
            success: true,
            data: leaderboard,
            message: "Leaderboard fetched successfully",
        });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch leaderboard",
            error: error.message,
        });
    }
};

exports.addXP = async (req, res) => {
    try {
        const { xpToAdd } = req.body;
        const userId = req.user.id;
        
        if (!xpToAdd || isNaN(xpToAdd)) {
            return res.status(400).json({ success: false, message: "Invalid XP amount" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $inc: { xp: xpToAdd } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updatedUser,
            message: "XP added successfully",
        });
    } catch (error) {
        console.error("Error adding XP:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add XP",
        });
    }
};
