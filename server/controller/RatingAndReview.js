const RatingAndReview = require("../models/RatingAndRaview")
const Course = require("../models/Course")
const User = require("../models/User");
const { request } = require("express");
const { default: mongoose } = require("mongoose");

// exports.createRating = async(request,response) =>{
//     try{

//         //fetch userId and courseId
//     const userId = request.user.id;
//     // const  courseId = request.body;

//     const { courseId ,rating , review} = request.body;

//     //comment
//     const userDetails = await User.findOne({_id:userId})    //or  biji method course ni anderthi uerId validate karvani  studentsEnrolled : {$eleMatch:{$ed:userId}
//     const courseDetails = await Course.findOne({_id:courseId,

//         //uncomment
//         // studentsEnrolled : {$eleMatch:{$ed:userId}}
//         })

//     //validate
//     if(!courseDetails && !userDetails)
//     {
//         return response.status(400).json({
//             success:false,
//             meaasge:"Student/user is not enrolled in the Course"
//         });
//     }
//     if(!rating && !review)
//     {
//         return response.status(400).json({
//             success:false,
//             meaasge:"All fields are required"
//         });
//     }

//     //user is alaready review the course
//     const alreadyReviewed = await RatingAndReview.findOne({
//         user:userId,
//         course:courseId,
//     })

//     if(alreadyReviewed)
//     {
//         return response.status(403).json({
//             success:false,
//             meaasge:"User Already Provide Rating/Review to the Course"
//         });
//     }
      

//     //create rating and review and store an entry in database
//     const ratingReview = await RatingAndReview.create({
//         rating,
//         review,
//         course:courseId,
//         user:userId
//     }).populate("")
   
//     //update course with rating and review

//     //aai RatingAndReview model ni ander course field ma Course(ref/referance) store karyo che..
//     // pn aapde aai course ne update karvanu jarur padse..because me  RatingAndReview ne Course model
//     // ma  use karyo che ...me Course na model ma ratingAndReviews field ni ander mr RatingAndReview
//     // no ref/referance store karyo che..athi mare course ne rating and reviwe thi update karvu padse  
//     const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},{
//         $push:{
//             ratingReview:ratingReview._id,
//         }
//     });

// //MTMP NOTE:
//     //aai RatingAndReview model ni ander user field ma User(ref/referance) store karyo che..
//     // pn aapde user ne update karvanu jarur nathi..because me  RatingAndReview ne User model
//     // ma kai pn use nathi karyo...
         

    
//     //return responce
//     return response.status(200).json({
//         success:true,
//         message:"Rating and Review Created Successfully",
//         updateUser,
//     })
//     }
//     catch(error)
//     {
//         console.log(error)
//         return response.status(500).json({
//             success:false,
//             message:"Something went wrong",
//         })
//     }
// }










//getAverageRating
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id
    const { rating, review, courseId } = req.body

    if (!rating || !review || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }

    const ratingReview = await RatingAndReview.create({
      user: userId,
      course: courseId,
      rating,
      review,
    })

    const populatedRatingReview = await RatingAndReview.findById(ratingReview._id)
      .populate("user")
      .populate("course")

    return res.status(200).json({
      success: true,
      message: "Rating created successfully",
      data: populatedRatingReview,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating rating",
      error: error.message,
    })
  }
}





exports.getAverageRating = async(request,response)=>{
try{
    //get courseid
    const courseId = request.body;

    // uncomment
    // const courseId = request.body.courseid;

    //calculate average rating
    const result = await RatingAndReview.aggregate([
        {
            $match:{
                course : new mongoose.Schema.Types.ObjectId(courseId),
            },
        },
        {
            $group:{
                _id:null,
                averageRating: {$avg:"$rating"},
            }
        }
    ])

    //return rating...here length is grater than 0 that means review is exists
    if(result.length>0)
    {
        return response.status(200).json({
            success:true,
            message:"Average of review calculate Successfully",
            averageRating:result[0].averageRating,
        });
    }
    //if review is not exists
    return response.status(200).json({
            success:true,
            message:"Average Review is 0,no rating given till now",
            
        });
}   
catch(error)
    {
        console.log(error)
        return response.status(500).json({
            success:false,
            message:"Something went wrong",
        });
    } 
}

//getAllRating 
exports.getAllRating = async(request,response)=>{
try
{

    //get all review
    const allReview = await RatingAndReview.find({}).sort({rating:"desc"})
                                                    .populate(
                                                    {path:"user",
                                                    select:"firstName lastName email image"})
                                                    .populate(
                                                    {path:"course",
                                                    select:"courseName",
                                                    })
                                                    .exec();

    //return responce
    return response.status(200).json({
        success:true,
        message:"All reviewed fetch Successfully",
        data:allReview,
    });                                               
                        


 }  
catch(error)
    {
        console.log(error)
        return response.status(500).json({
            success:false,
            message:"Something went wrong",
        });
    } 
 
}
// const RatingAndReview = require("../models/RatingAndRaview") // Corrected filename
// const Course = require("../models/Course")
// const User = require("../models/User");
// const mongoose = require("mongoose");

// exports.createRating = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const { courseId, rating, review } = req.body;

//         // Check if user is enrolled in the course
//         const courseDetails = await Course.findOne({
//             _id: courseId,
//             studentsEnrolled: { $elemMatch: { $eq: userId } } // Corrected elemMatch syntax
//         });

//         if (!courseDetails) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Student/user is not enrolled in the Course",
//             });
//         }

//         if (!rating || !review) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Rating and Review are required",
//             });
//         }

//         // Check if user has already reviewed the course
//         const alreadyReviewed = await RatingAndReview.findOne({
//             user: userId,
//             course: courseId,
//         });
//         if (alreadyReviewed) {
//             return res.status(403).json({
//                 success: false,
//                 message: "User Already Provided Rating/Review to the Course",
//             });
//         }

//         // Create rating and review entry
//         const ratingReview = await RatingAndReview.create({
//             rating,
//             review,
//             course: courseId,
//             user: userId
//         });

//         // Update course with rating and review
//         await Course.findByIdAndUpdate(
//             courseId,
//             { $push: { ratingAndReviews: ratingReview._id } }, // Corrected field name
//             { new: true }
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Rating and Review Created Successfully",
//             ratingReview, // Return the created rating review
//         });
//     } catch (error) {
//         console.error("Error creating rating:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while creating rating and review",
//             error: error.message,
//         });
//     }
// }

// // getAverageRating
// exports.getAverageRating = async (req, res) => {
//     try {
//         const { courseId } = req.body;

//         // Calculate average rating
//         const result = await RatingAndReview.aggregate([
//             {
//                 $match: {
//                     course: new mongoose.Types.ObjectId(courseId), // Convert string to ObjectId
//                 },
//             },
//             {
//                 $group: {
//                     _id: null, // Group all documents together
//                     averageRating: { $avg: "$rating" }, // Calculate average of 'rating' field
//                 },
//             },
//         ]);

//         if (result.length > 0) {
//             return res.status(200).json({
//                 success: true,
//                 averageRating: result[0].averageRating,
//                 message: "Average rating fetched successfully",
//             });
//         } else {
//             // No ratings found for the course
//             return res.status(200).json({
//                 success: true,
//                 averageRating: 0,
//                 message: "No ratings given yet for this course",
//             });
//         }
//     } catch (error) {
//         console.error("Error getting average rating:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while calculating average rating",
//             error: error.message,
//         });
//     }
// }