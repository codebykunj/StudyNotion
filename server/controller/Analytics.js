const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");

exports.getInstructorAnalytics = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id });

        const courseData = await Promise.all(courseDetails.map(async (course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            // Calculate average progress
            let totalProgress = 0;
            let progressCount = 0;
            
            for (const studentId of course.studentsEnrolled) {
                const progress = await CourseProgress.findOne({
                    courseID: course._id,
                    userId: studentId,
                });
                
                if (progress && course.courseContent.length > 0) {
                    // Approximate progress based on completed videos vs total subsections
                    const completedVideos = progress.completedVideos.length;
                    // simplified total lectures for the sake of metric
                    let totalSubsections = 0;
                    // For a real calculation, we'd populate courseContent.subSection
                    // Here we just use a placeholder or basic metric
                    totalProgress += completedVideos;
                    progressCount++;
                }
            }

            const averageProgress = progressCount === 0 ? 0 : (totalProgress / progressCount);

            return {
                _id: course._id,
                courseName: course.courseName,
                totalStudentsEnrolled,
                totalAmountGenerated,
                averageProgress
            };
        }));

        res.status(200).json({
            success: true,
            courses: courseData,
            message: "Analytics fetched successfully"
        });
    } catch (error) {
        console.error("Analytics Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch analytics" });
    }
};
