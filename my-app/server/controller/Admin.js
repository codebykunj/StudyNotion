const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");

// ─── GET ALL PENDING INSTRUCTORS ─────────────────────────────────────────────
exports.getPendingInstructors = async (req, res) => {
    try {
        const pendingInstructors = await User.find({
            accountType: "Instructor",
            instructorStatus: "Pending",
        }).select("-password").populate("additionalDetails");

        return res.status(200).json({
            success: true,
            message: "Pending instructors fetched successfully",
            data: pendingInstructors,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch pending instructors",
            error: error.message,
        });
    }
};

// ─── APPROVE INSTRUCTOR ───────────────────────────────────────────────────────
exports.approveInstructor = async (req, res) => {
    try {
        const { instructorId } = req.params;

        const instructor = await User.findByIdAndUpdate(
            instructorId,
            { instructorStatus: "Approved" },
            { new: true }
        ).select("-password");

        if (!instructor) {
            return res.status(404).json({ success: false, message: "Instructor not found" });
        }

        // Send approval email
        try {
            await mailSender(
                instructor.email,
                "🎉 Your StudyNotion Instructor Account is Approved!",
            
            );
        } catch (mailError) {
            console.log("Approval mail error:", mailError.message);
        }

        return res.status(200).json({
            success: true,
            message: "Instructor approved successfully",
            data: instructor,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to approve instructor",
            error: error.message,
        });
    }
};

// ─── REJECT INSTRUCTOR ────────────────────────────────────────────────────────
exports.rejectInstructor = async (req, res) => {
    try {
        const { instructorId } = req.params;
        const { reason } = req.body;

        const instructor = await User.findByIdAndUpdate(
            instructorId,
            { instructorStatus: "Rejected" },
            { new: true }
        ).select("-password");

        if (!instructor) {
            return res.status(404).json({ success: false, message: "Instructor not found" });
        }

        // Send rejection email
        try {
            await mailSender(
                instructor.email,
                "Update on Your StudyNotion Instructor Application",
                `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0f172a; color: #e2e8f0; padding: 30px; border-radius: 12px;">
                    <h2 style="color: #ffd700;">Hello, ${instructor.firstName}</h2>
                    <p>Thank you for applying to be an instructor on <strong>StudyNotion</strong>.</p>
                    <p>After reviewing your application, we are unable to approve your account at this time.</p>
                    ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
                    <p>You may reapply after 30 days or contact our support team for more information.</p>
                    <p style="margin-top: 30px; font-size: 12px; color: #94a3b8;">StudyNotion Team</p>
                </div>`
            );
        } catch (mailError) {
            console.log("Rejection mail error:", mailError.message);
        }

        return res.status(200).json({
            success: true,
            message: "Instructor rejected successfully",
            data: instructor,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to reject instructor",
            error: error.message,
        });
    }
};

// ─── GET ALL USERS (Students + Instructors) ───────────────────────────────────
exports.getAllUsers = async (req, res) => {
    try {
        const { accountType, page = 1, limit = 20 } = req.query;
        const filter = accountType ? { accountType } : { accountType: { $in: ["Student", "Instructor"] } };

        const users = await User.find(filter)
            .select("-password")
            .populate("additionalDetails")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await User.countDocuments(filter);

        return res.status(200).json({
            success: true,
            data: users,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};

// ─── GET ALL COURSES ──────────────────────────────────────────────────────────
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("instructor", "firstName lastName email instructorStatus")
            .populate("category", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: courses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch courses",
            error: error.message,
        });
    }
};

// ─── DELETE COURSE (Admin can remove any course) ──────────────────────────────
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findByIdAndDelete(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete course",
            error: error.message,
        });
    }
};

// ─── DASHBOARD STATS ──────────────────────────────────────────────────────────
exports.getDashboardStats = async (req, res) => {
    try {
        const [totalStudents, totalInstructors, pendingInstructors, totalCourses, approvedInstructors] =
            await Promise.all([
                User.countDocuments({ accountType: "Student" }),
                User.countDocuments({ accountType: "Instructor" }),
                User.countDocuments({ accountType: "Instructor", instructorStatus: "Pending" }),
                Course.countDocuments(),
                User.countDocuments({ accountType: "Instructor", instructorStatus: "Approved" }),
            ]);

        return res.status(200).json({
            success: true,
            data: {
                totalStudents,
                totalInstructors,
                pendingInstructors,
                approvedInstructors,
                totalCourses,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch stats",
            error: error.message,
        });
    }
};
