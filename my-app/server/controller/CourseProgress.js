const mongoose = require("mongoose")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;

  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById(subSectionId)
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" })
    }

    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    if (!courseProgress) {
      // If course progress doesn't exist, create a new one with this video already completed
      courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideo: [subSectionId],
      })
      await courseProgress.save()
      return res.status(200).json({ message: "Course progress updated" })
    } else {
      // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideo.includes(subSectionId)) {
        return res.status(400).json({ error: "Subsection already completed" })
      }

      // Push the subsection into the completedVideos array
      courseProgress.completedVideo.push(subSectionId)
    }

    // Save the updated course progress
    await courseProgress.save()

    // Add 10 XP to user
    const User = require("../models/User");
    const updatedUser = await User.findByIdAndUpdate(userId, { $inc: { xp: 10 } }, { new: true });

    return res.status(200).json({ message: "Course progress updated", xp: updatedUser.xp })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}