// Profile pote and jai pn Profile no ref store karyo hoi te badha model[User na P rofile no ref store karyo che] ne aai import karo..
const Profile = require("../models/Profile");
const { findByIdAndUpdate } = require("../models/Section");
const User = require("../models/User");
const { request } = require("../routes/User");
const Course = require("../models/Course")

const{ uploadImageToCloudinary} = require("../utils/imageUploader")

exports.updateProfile = async (request, response) => {
  try {
    // ✅ Fix: Ensure body exists before destructuring
    if (!request.body || Object.keys(request.body).length === 0) {
      return response.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    const { firstName, lastName, dateOfBirth, about, contactNumber, gender } = request.body;
    const id = request.user?.id; // Optional chaining just in case

    // ✅ Validation check
    if (!dateOfBirth || !about || !contactNumber || !gender || !id || !firstName || !lastName) {
      return response.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userDetails = await User.findById(id);
    if (!userDetails) {
      return response.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    if (!profileDetails) {
      return response.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // ✅ Update profile fields
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;

    await profileDetails.save();

    // ✅ Update User model's firstName and lastName
    const updatedUserDetails = await User.findByIdAndUpdate(
      id,
      { firstName, lastName },
      { new: true }
    ).populate("additionalDetails").exec();

    return response.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      updatedUserDetails,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};

exports.deleteAccount = async(request,response)=>{
    try{
      //get user id
      const id = request.user.id;

      //validation
      const userDetails = await  User.findById(id)
      if(!userDetails)
      {  
        return response.status(404).json({
            success:false,
            message:"User Not Found",
        }); 
      }

      //delete profile
      await Profile.findByIdAndDelete({_id:userDetails.additionalDetails._id});

      //HW------> Unenroll user from all enrolled course

      //delete user
      await User.findByIdAndDelete(id)

      //return responce
      return response.status(200).json({
            success:true,
            message:"User Deleted Successfully",
        });

    }
    catch(error)
    {
    return response.status(500).json({
            success:false,
            message:"Somethig Went wrong",
            error:error.message,
        });
    }

}

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()
    console.log(userDetails)
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })
      .populate({
        path: "studentsEnrolled",
        select: "firstName lastName email image",
      })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        price: course.price,
        status: course.status,
        thumbnail: course.thumbnail,
        totalStudentsEnrolled,
        totalAmountGenerated,
        studentsEnrolled: course.studentsEnrolled, // populated user objects
      }

      return courseDataWithStats
    })

    res.status(200).json({
      success: true,
      message: "Data Calculated Successfully",
      courses: courseData,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

const CourseProgress = require("../models/CourseProgress");
const { response } = require("express");

function convertSecondsToDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0")
  ].join(":")
}

//AA CODE NE RUN KARTA OUTPUT AAVE CHE
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    let userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    // If user not found
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    userDetails = userDetails.toObject();
    var SubsectionLength = 0;

    // Check if courses exist
    if (!userDetails.courses || userDetails.courses.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    // Filter out null courses (deleted courses)
    userDetails.courses = userDetails.courses.filter((course) => course !== null);

    for (let i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;

      for (let j = 0; j < (userDetails.courses[i].courseContent?.length || 0); j++) {
        const subSections = userDetails.courses[i].courseContent[j]?.subSection || [];

        totalDurationInSeconds += subSections.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration || 0),
          0
        );

        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );

        SubsectionLength += subSections.length;
      }

      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });

      courseProgressCount = courseProgressCount?.completedVideo?.length || 0;

      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) /
          multiplier;
      }
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    console.error("GET_ENROLLED_COURSES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDisplayPicture = async (request, response) => {
    try {
        const updatedImage = request.files?.displayPicture || request.files?.file;
        const userId = request.user.id; // Make sure auth middleware sets request.user

        if (!updatedImage) {
            return response.status(400).json({
                success: false,
                message: "Please provide an image to update.",
            });
        }

        const uploadedResponse = await uploadImageToCloudinary(
            updatedImage,
            process.env.FOLDER_NAME
        );

        if (!uploadedResponse || !uploadedResponse.secure_url) {
            return response.status(500).json({
                success: false,
                message: "Image upload failed.",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { image: updatedImage.secure_url },
            { new: true }
        ).populate("additionalDetails").exec();

        return response.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data: updatedUser,
        });

    } catch (error) {
        console.error("Update display picture error:", error);
        return response.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};



// Profile pote and jai pn Profile no ref store karyo hoi te badha model[User na P rofile no ref store karyo che] ne aai import karo..
// const Profile = require("../models/Profile");
// const { findByIdAndUpdate } = require("../models/Section");
// const User = require("../models/User");
// const { request } = require("../routes/User");
// const Course = require("../models/Course")

// const{ uploadImageToCloudinary} = require("../utils/imageUploader")

// exports.updateProfile = async (request, response) => {
//   try {
//     // ✅ Fix: Ensure body exists before destructuring
//     if (!request.body || Object.keys(request.body).length === 0) {
//       return response.status(400).json({
//         success: false,
//         message: "Request body is missing",
//       });
//     }

//     const { dateOfBirth, about, contactNumber, gender ,firstName,lastName} = request.body;
//     const id = request.user?.id; // Optional chaining just in case

//     // ✅ Validation check
//     if (!dateOfBirth || !about || !contactNumber || !gender || !id || !firstName | !lastName) {
//       return response.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const userDetails = await User.findById(id);
//     if (!userDetails) {
//       return response.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const profileId = userDetails.additionalDetails;
//     const profileDetails = await Profile.findById(profileId);
//     if (!profileDetails) {
//       return response.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }

//     // ✅ Update profile fields
//     profileDetails.dateOfBirth = dateOfBirth;
//     profileDetails.about = about;
//     profileDetails.gender = gender;
//     profileDetails.contactNumber = contactNumber;
//     profileDetails.firstName = firstName;
//     profileDetails.lastName = lastName;

//     await profileDetails.save();

//     return response.status(200).json({
//       success: true,
//       message: "Profile Updated Successfully",
//       user: userDetails,
//       profileDetails,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       success: false,
//       message: "Something Went wrong",
//       error: error.message,
//     });
//   }
// };

// exports.deleteAccount = async(request,response)=>{
//     try{
//       //get user id
//       const id = request.user.id;

//       //validation
//       const userDetails = await  User.findById(id)
//       if(!userDetails)
//       {  
//         return response.status(404).json({
//             success:false,
//             message:"User Not Found",
//         }); 
//       }

//       //delete profile
//       await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

//       //HW------> Unenroll user from all enrolled course

//       //delete user
//       await User.findByIdAndDelete(id)

//       //return responce
//       return response.status(200).json({
//             success:true,
//             message:"User Deleted Successfully",
//         });

//     }
//     catch(error)
//     {
//     return response.status(500).json({
//             success:false,
//             message:"Somethig Went wrong",
//             error:error.message,
//         });
//     }

// }

// exports.getAllUserDetails = async (req, res) => {
//   try {
//     const id = req.user.id
//     const userDetails = await User.findById(id)
//       .populate("additionalDetails")
//       .exec()
//     console.log(userDetails)
//     res.status(200).json({
//       success: true,
//       message: "User Data fetched successfully",
//       data: userDetails,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// exports.instructorDashboard = async (req, res) => {
//   try {
//     const courseDetails = await Course.find({ instructor: req.user.id })

//     const courseData = courseDetails.map((course) => {
//       const totalStudentsEnrolled = course.studentsEnrolled.length
//       const totalAmountGenerated = totalStudentsEnrolled * course.price

//       // Create a new object with the additional fields
//       const courseDataWithStats = {
//         _id: course._id,
//         courseName: course.courseName,
//         courseDescription: course.courseDescription,
//         // Include other course properties as needed
//         totalStudentsEnrolled,
//         totalAmountGenerated,
//       }

//       return courseDataWithStats
//     })

//     res.status(200).json({ 
//       success:true,
//       message:"Data Calculated Successfully",
//       courses: courseData })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: "Server Error" })
//   }
// }

// const CourseProgress = require("../models/CourseProgress");
// const { response } = require("express");

// function convertSecondsToDuration(totalSeconds) {
//   const hours = Math.floor(totalSeconds / 3600)
//   const minutes = Math.floor((totalSeconds % 3600) / 60)
//   const seconds = totalSeconds % 60

//   return [
//     hours.toString().padStart(2, "0"),
//     minutes.toString().padStart(2, "0"),
//     seconds.toString().padStart(2, "0")
//   ].join(":")
// }

// //AA CODE NE RUN KARTA OUTPUT AAVE CHE
// exports.getEnrolledCourses = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     let userDetails = await User.findOne({ _id: userId })
//       .populate({
//         path: "courses",
//         populate: {
//           path: "courseContent",
//           populate: {
//             path: "subSection",
//           },
//         },
//       })
//       .exec();

//     // If user not found
//     if (!userDetails) {
//       return res.status(404).json({
//         success: false,
//         message: `Could not find user with id: ${userId}`,
//       });
//     }

//     userDetails = userDetails.toObject();
//     var SubsectionLength = 0;

//     // Check if courses exist
//     if (!userDetails.courses || userDetails.courses.length === 0) {
//       return res.status(200).json({
//         success: true,
//         data: [],
//       });
//     }

//     for (let i = 0; i < userDetails.courses.length; i++) {
//       let totalDurationInSeconds = 0;
//       SubsectionLength = 0;

//       for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {
//         const subSections = userDetails.courses[i].courseContent[j].subSection || [];

//         totalDurationInSeconds += subSections.reduce(
//           (acc, curr) => acc + parseInt(curr.timeDuration || 0),
//           0
//         );

//         userDetails.courses[i].totalDuration = convertSecondsToDuration(
//           totalDurationInSeconds
//         );

//         SubsectionLength += subSections.length;
//       }

//       let courseProgressCount = await CourseProgress.findOne({
//         courseID: userDetails.courses[i]._id,
//         userId: userId,
//       });

//       courseProgressCount = courseProgressCount?.completedVideos?.length || 0;

//       if (SubsectionLength === 0) {
//         userDetails.courses[i].progressPercentage = 100;
//       } else {
//         const multiplier = Math.pow(10, 2);
//         userDetails.courses[i].progressPercentage =
//           Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) /
//           multiplier;
//       }
//     }

//     return res.status(200).json({
//       success: true,
//       data: userDetails.courses,
//     });
//   } catch (error) {
//     console.error("GET_ENROLLED_COURSES ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.updateDisplayPicture = async (request, response) => {
//     try {
      
//         // const updatedImage = request.files?.file;
//         const updatedImage = request.files?.imageFile;

//         const userId = request.user.id; // Make sure auth middleware sets request.user

//         if (!updatedImage && !userId) {
//             return response.status(400).json({
//                 success: false,
//                 message: "Please provide an image or userId to update.",
//             });
//         }

//         const uploadedResponse = await uploadImageToCloudinary(
//             updatedImage,
//             process.env.FOLDER_NAME
//         );

//         if (!uploadedResponse || !uploadedResponse.secure_url) {
//             return response.status(500).json({
//                 success: false,
//                 message: "Image upload failed.",
//             });
//         }

//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { image: updatedImage.secure_url },
//             { new: true }
//         );

//         return response.status(200).json({
//             success: true,
//             message: "Profile picture updated successfully",
//             updatedUser,
//         });

//     } catch (error) {
//         console.error("Update display picture error:", error);
//         return response.status(500).json({
//             success: false,
//             message: "Something went wrong",
//             error: error.message,
//         });
//     }
// };



