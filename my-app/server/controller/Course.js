const Course = require("../models/Course")
const { populate } = require("../models/SubSection")
const User = require("../models/User")
// const Tag = require("../models/tags")
const Category = require("../models/Category")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection"); 
const { convertSecondsToDuration } = require("../utils/secToDuration")
const CourseProgress = require("../models/CourseProgress") 



require("dotenv").config();

const{uploadImageToCloudinary} = require("../utils/imageUploader")
const mongoose = require("mongoose");



//original code
// exports.createCourse = async (req, res) => {
//   try {
//     const {
//       courseName,
//       courseDescription,
//       whatYouWillLearn,
//       price,
//       tags, // ["JavaScript", "Frontend"]
//       category, // Category Id (ObjectId)
//       instructions,
//       status,
//     } = req.body;

//     const thumbnail = req.files?.thumbnailImage;

//     console.log("Body:", req.body);
//     console.log("Files:", req.files);

//     // Validation
//     if (
//       !courseName ||
//       !courseDescription ||
//       !whatYouWillLearn ||
//       !price ||
//       !tags ||
//       !category ||
//       !instructions ||
//       !status
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     if (!thumbnail) {
//       return res.status(400).json({
//         success: false,
//         message: "Thumbnail image is required",
//       });
//     }

//     const userId = req.user.id;

//     const instructorDetails = await User.findById(userId);
//     if (!instructorDetails) {
//       return res.status(401).json({
//         success: false,
//         message: "Instructor not found",
//       });
//     }

//     // ✅ category એક valid ObjectId છે કે નહીં તે ચેક કરો
//     if (!mongoose.Types.ObjectId.isValid(category)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Category ID",
//       });
//     }

//     const categoryDetails = await Category.findById(category);
//     if (!categoryDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     const uploadedImage = await uploadImageToCloudinary(
//       thumbnail,
//       process.env.FOLDER_NAME
//     );

//     const newCourse = await Course.create({
//       courseName,
//       courseDescription,
//       instructor: instructorDetails._id,
//       whatYouWillLearn,
//       price,
//       category: categoryDetails._id, // now fixed
//       thumbnail: uploadedImage.secure_url,
//       tags, // directly use ["JavaScript", "Frontend"]
//       instructions,
//       status,
//     });

//     await User.findByIdAndUpdate(
//       instructorDetails._id,
//       { $push: { courses: newCourse._id } },
//       { new: true }
//     );

//     await Category.findByIdAndUpdate(
//       categoryDetails._id,
//       { $push: { courses: newCourse._id } },
//       { new: true }
//     );

//     return res.status(201).json({
//       success: true,
//       message: "Course created successfully",
//       course: newCourse,
//     });
//   } catch (error) {
//     console.error("Error in createCourse:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create course",
//       error: error.message,
//     });
//   }
// };


// aa code pn correct run kare che
exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag, // ["JavaScript", "Frontend"]
      category, // Category Id (ObjectId)
      instructions,
      status,
    } = req.body;

    const thumbnail = req.files?.thumbnailImage;

    console.log("Body:", req.body);
    console.log("Files:", req.files);

    // Validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !category ||
      !instructions ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    
    let parsedTags, parsedInstructions;
    try {
      parsedTags = JSON.parse(tag);
      parsedInstructions = JSON.parse(instructions);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error parsing tags or instructions",
      });
    }
    if (!thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required",
      });
    }

    const userId = req.user.id;

    const instructorDetails = await User.findById(userId);
    if (!instructorDetails) {
      return res.status(401).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // ✅ category એક valid ObjectId છે કે નહીં તે ચેક કરો
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Category ID",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const uploadedImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      category: categoryDetails._id, // now fixed
      thumbnail: uploadedImage.secure_url,
      tag: parsedTags, // directly use ["JavaScript", "Frontend"]
      instructions: parsedInstructions,
      status,
    });

    await User.findByIdAndUpdate(
      instructorDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      categoryDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error in createCourse:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

exports.showAllCourse = async(request,response)=>{
    try
    {
        
    //fetch all course
        const allCourse = await Course.find({})

    //return responce
    return response.status(200).json({
        success:true,
        message:"Data for all courses find Successfully",
        allCourse,
    });

    }

    catch(error)
    {
        console.log(error);
        return response.status(500).json({
            success:false,
            message:"Cannot fetch Course Data"
        })
    }
}

//getCourseDetails---------->AA PELA NO CHE
// exports.getCourseDetails = async(request,response)=>{
// try{

//     //fetch course
//     const {courseId} = request.body;
    
//     //fetch all course daetails

//     //NOTE:     nested populate ma pela instructor  aavyu aathi pela tene populate karyu 
//     // and instructor ni ander User no ref(refarance) hato..aap User model ni ander pela
//     //additionalDetail no ref hato....aam aapde instruct and additionalDetail nu grop karisu
//     //  User ne nai populate kariye...
//                                 // .populate(
//                                 //     {
//                                 //         path:"instructor",
//                                 //         populate:{
//                                 //             path:"additionalDetails",
//                                 //         },
//                                 //     }
//                                 // )


//     //aam jai Course nr je pn field ma ref hase  tene upper mujab na logic thi implement karisu
//     const courseDetails = await Course.findById({_id:courseId})
//                                 .populate(
//                                     {
//                                         path:"instructor",
//                                         populate:{
//                                             path:"additionalDetails",
//                                         },
//                                     }
//                                 )
//                                 .populate("category")  
//                                 // .populate("ratingAndreviews")
//                                 .populate({
//                                        path:"courseContent",
//                                        populate:{
//                                         path:"subSection"
//                                        }
//                                 })     
//                                 .exec();
                                
//     //validation
//     if(!courseDetails)
//     {
//         return response.status(400).json({
//             success:false,
//             message:`Could not find the Course with ${courseId}`,
//         })
//     }       
    
//     //return responce
//     return response.status(200).json({
//         success:true,
//         message:"Course Details fetched Successfully",
//         courseDetails,
//     })

// }
// catch(error)
// {
//         console.log(error);
//         return response.status(500).json({
//             success:false,
//             message:"Something went wrong..Course Not Found",
//             error: error.message
//         })
// }
// }

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}



exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}






// exports.deleteCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body

//     // Find the course
//     const course = await Course.findById(courseId)
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" })
//     }

//     // Unenroll students from the course
//     const studentsEnrolled = course.studentsEnroled
//     for (const studentId of studentsEnrolled) {
//       await User.findByIdAndUpdate(studentId, {
//         $pull: { courses: courseId },
//       })
//     }

//     // Delete sections and sub-sections
//     const courseSections = course.courseContent
//     for (const sectionId of courseSections) {
//       // Delete sub-sections of the section
//       const section = await Section.findById(sectionId)
//       if (section) {
//         const subSections = section.subSection
//         for (const subSectionId of subSections) {
//           await SubSection.findByIdAndDelete(subSectionId)
//         }
//       }

//       // Delete the section
//       await Section.findByIdAndDelete(sectionId)
//     }

//     // Delete the course
//     await Course.findByIdAndDelete(courseId)

//     return res.status(200).json({
//       success: true,
//       message: "Course deleted successfully",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     })
//   }
// }

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ success: false, message: "courseId is required" });
    }

    const updates = req.body;

    // Fetch course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Optional: Debug
    console.log("📦 Request body:", req.body);
    console.log("📷 Request files:", req.files);

    // Handle thumbnail upload if provided
    if (req.files && req.files.thumbnailImage) {
      try {
        const thumbnail = req.files.thumbnailImage;
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        );
        course.thumbnail = thumbnailImage.secure_url;
      } catch (uploadErr) {
        console.error("❌ Cloudinary error:", uploadErr);
        return res.status(500).json({
          success: false,
          message: "Thumbnail upload failed",
          error: uploadErr.message,
        });
      }
    }

    // Apply updates from body
    for (const key in updates) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        try {
          if (key === "tag" || key === "instructions") {
            course[key] = typeof updates[key] === "string"
              ? JSON.parse(updates[key])
              : updates[key];
          } else {
            course[key] = updates[key];
          }
        } catch (err) {
          console.error(`❌ JSON parse error in ${key}:`, err);
          return res.status(400).json({
            success: false,
            message: `Invalid format in ${key}`,
          });
        }
      }
    }

    // Save course
    await course.save();

    // Populate full course
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("❌ editCourse fatal error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}



exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideo
          ? courseProgressCount?.completedVideo
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

// exports.deleteCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body

//     // Find the course
//     const course = await Course.findById(courseId)
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" })
//     }

//     // Unenroll students from the course
//     const studentsEnrolled = course.studentsEnroled
//     for (const studentId of studentsEnrolled) {
//       await User.findByIdAndUpdate(studentId, {
//         $pull: { courses: courseId },
//       })
//     }

//     // Delete sections and sub-sections
//     const courseSections = course.courseContent
//     for (const sectionId of courseSections) {
//       // Delete sub-sections of the section
//       const section = await Section.findById(sectionId)
//       if (section) {
//         const subSections = section.subSection
//         for (const subSectionId of subSections) {
//           await SubSection.findByIdAndDelete(subSectionId)
//         }
//       }

//       // Delete the section
//       await Section.findByIdAndDelete(sectionId)
//     }

//     // Delete the course
//     await Course.findByIdAndDelete(courseId)

//     return res.status(200).json({
//       success: true,
//       message: "Course deleted successfully",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     })
//   }
// }

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      // Find the section to get its sub-sections
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection;
        for (const subSectionId of subSections) {
          // Check if subSectionId is a valid ObjectId before deleting
          if (subSectionId) {
            await SubSection.findByIdAndDelete(subSectionId);
          }
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId);
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};