const Discussion = require("../models/Discussion");
const Course = require("../models/Course");

exports.createDiscussion = async (req, res) => {
    try {
        const { courseId, question } = req.body;
        const userId = req.user.id;

        if (!courseId || !question) {
            return res.status(400).json({ success: false, message: "Course ID and Question are required" });
        }

        const newDiscussion = await Discussion.create({
            course: courseId,
            user: userId,
            question,
        });

        // Return populated to show on UI immediately
        const populatedDiscussion = await Discussion.findById(newDiscussion._id)
            .populate("user", "firstName lastName image");

        return res.status(201).json({
            success: true,
            message: "Discussion created successfully",
            data: populatedDiscussion,
        });
    } catch (error) {
        console.log("Create discussion err:", error);
        return res.status(500).json({ success: false, message: "Failed to create discussion" });
    }
};

exports.getCourseDiscussions = async (req, res) => {
    try {
        const { courseId } = req.params;

        const discussions = await Discussion.find({ course: courseId })
            .populate("user", "firstName lastName image")
            .populate("answers.user", "firstName lastName image accountType")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: discussions,
        });
    } catch (error) {
        console.log("Get discussions err:", error);
        return res.status(500).json({ success: false, message: "Failed to get discussions" });
    }
};

exports.addAnswer = async (req, res) => {
    try {
        const { discussionId, answer } = req.body;
        const userId = req.user.id;

        if (!discussionId || !answer) {
            return res.status(400).json({ success: false, message: "Discussion ID and Answer are required" });
        }

        const updatedDiscussion = await Discussion.findByIdAndUpdate(
            discussionId,
            {
                $push: {
                    answers: { user: userId, answer },
                },
            },
            { new: true }
        )
        .populate("user", "firstName lastName image")
        .populate("answers.user", "firstName lastName image accountType");

        return res.status(200).json({
            success: true,
            message: "Answer added successfully",
            data: updatedDiscussion,
        });
    } catch (error) {
        console.log("Add answer err:", error);
        return res.status(500).json({ success: false, message: "Failed to add answer" });
    }
};
