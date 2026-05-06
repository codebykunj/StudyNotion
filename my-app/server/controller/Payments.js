// // // const { instance } = require("../config/razorpay");
// // // const User = require("../models/User");
// // // const Course = require("../models/Course");
// // // const mailSender = require("../utils/mailSender");
// // // const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
// // // const { default: mongoose } = require("mongoose");
// // // const { response } = require("express");
// // // require("dotenv").config();

// // // // Capture (create) the payment and initiate the Razorpay order
// // // exports.capturePayment = async (request, response) => {
// // //     try {
// // //         // Get user ID and course ID
// // //         const userId = request.user.id;
// // //         const { course_id } = request.body;

// // //         // Validate course ID
// // //         if (!course_id) {
// // //             return response.status(400).json({
// // //                 success: false,
// // //                 message: "Please provide CourseId",
// // //             });
// // //         }

// // //         // Validate course details
// // //         let course;
// // //         try {
// // //             course = await Course.findById(course_id);
// // //             if (!course) {
// // //                 return response.status(404).json({
// // //                     success: false,
// // //                     message: "Could not find the course",
// // //                 });
// // //             }

// // //             // Check if user already enrolled in the course
// // //             const uid = new mongoose.Schema.Types.ObjectId(userId);
// // //             if (course.studentEnrolled.includes(uid)) {
// // //                 return response.status(200).json({
// // //                     success: false,
// // //                     message: "Student is already enrolled",
// // //                 });
// // //             }
// // //         } catch (error) {
// // //             return response.status(500).json({
// // //                 success: false,
// // //                 message: error.message,
// // //             });
// // //         }

// // //         // Create Razorpay order

// // //         // try{
// // // //     //      //create payment/ordered payment
// // // //     //     const paymentResponce =  await instance.orders.create({
// // // //     //         "amount": amount * 100,
// // // //     //         "currency": "INR",
// // // //     //         "receipt": Math.random(Date.now().toString()),
// // // //     //         "notes": { userId, course_id: course_id },
// // // //     //     })
// // // //     //    }catch(error){
// // //             // console.log(error);
// // //             // return response.status(500).json({
// // //             //     success: false,
// // //             //     message: "Could not initiate order"
// // //             // });
// // // //     //    }

// // //                         // or

// // //         const amount = course.price;
// // //         const currency = "INR";

// // //         const options = {
// // //             amount: amount * 100,
// // //             currency,
// // //             receipt: Date.now().toString(),
// // //             notes: {
// // //                 userId,
// // //                 course_id: course_id
// // //             }
// // //         };

// // //         try {
// // //             const paymentResponse = await instance.orders.create(options);
// // //             console.log(paymentResponse);

// // //             // Return payment details
// // //             return response.status(200).json({
// // //                 success: true,
// // //                 courseName: course.courseName,
// // //                 courseDescription: course.courseDescription,
// // //                 thumbnail: course.thumbnail,
// // //                 orderId: paymentResponse.id,
// // //                 currency: paymentResponse.currency,
// // //                 amount: paymentResponse.amount,
// // //             });
// // //         } catch (error) {
// // //             console.log(error);
// // //             return response.status(500).json({
// // //                 success: false,
// // //                 message: "Could not initiate order"
// // //             });
// // //         }

// // //     } catch (error) {
// // //         return response.status(500).json({
// // //             success: false,
// // //             message: "Payment Failed",
// // //         });
// // //     }
// // // };


// // // //varify Signature of RazorPay and Server
// // // exports.verifySignature = async(request,response)=>{
   
// // //         //aa webhook/signature aapa database ma aapde define karisu
// // //         const webhookSecret = "12345678"

// // //         //aa razorpay ni signature hase hene aapde aa syntax:request.headers["x-razorpay-signature"] thi fetch kari llavisu
// // //         const signature = request.headers["x-razorpay-signature"]

// // //         //hash webhookSecret signature
// // //         const shasum = crypto.createHmac("sha256",webhookSecret);
// // //         shasum.update(JSON.stringify(request.body));
// // //         const digest = shasum.digest("hex");

// // //         if(signature === digest)
// // //         {
// // //             console.log("Payment is Authorised");

// // //             const {courseId,userId}=request.body.payload.payment.entity.notes;

// // //     try
// // //     {
// // //                 //find the course and enrolled the student init.
// // //                 const enrolledCourse = await Course.findOneAndUpdate(
// // //                                                 {_id:courseId,
// // //                                                     $push:{
// // //                                                        studentEnrolled:userId, 
// // //                                                     }
// // //                                                 },{new:true}
// // //                                             );

// // //                 if(!enrolledCourse)
// // //                 {
// // //                    return response.status(500).json({
// // //                     sucess:false,
// // //                     message:"Course not Found"
// // //                    });
// // //                 }     
// // //                 console.log(enrolledCourse);  
                
// // //                 //find the student and add the course to thair list enrolled course me

// // //                 const enrolledStudent = await User.findOneAndUpdate({_id:userId},{
// // //                                                             $push:{
// // //                                                                courses:courseId 
// // //                                                             }},{new:true}, );
// // //                 console.log(enrolledStudent);    
                
// // //                 //mail send karlo conformation wala
// // //                 const mailResponce = await mailSender(enrolledStudent.email,"Congratulations, from CodeHelp","Congratulations,you are onboard into new CodeHelp Course")
// // //                 console.log(mailResponce);

// // //                 //return responce
// // //                 return response.status(200).json({
// // //                     sucess:true,
// // //                     message:"Signature verified and Course Added..and Payment Successfully"
// // //                    });
// // //     }
// // // catch(error){
// // //     console.log(error);
// // //     return response.status(500).json({
// // //                     sucess:false,
// // //                     message:"Course not initiate Order"
// // //                    });
// // // }
// // // }
// // //  else{
// // //     return response.status(400).json({
// // //                     sucess:false,
// // //                     message:"Invalid Request"
// // //                    });
// // //  }

// // // }


// // // //AAnicheno extra function che remove kari sako cho
// // // exports.sendPaymentSuccessEmail = async (req, res) => {
// // //   const { orderId, paymentId, amount } = req.body

// // //   const userId = req.user.id

// // //   if (!orderId || !paymentId || !amount || !userId) {
// // //     return res
// // //       .status(400)
// // //       .json({ success: false, message: "Please provide all the details" })
// // //   }

// // //   try {
// // //     const enrolledStudent = await User.findById(userId)

// // //     await mailSender(
// // //       enrolledStudent.email,
// // //       `Payment Received`,
// // //       paymentSuccessEmail(
// // //         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
// // //         amount / 100,
// // //         orderId,
// // //         paymentId
// // //       )
// // //     )
// // //   } catch (error) {
// // //     console.log("error in sending mail", error)
// // //     return res
// // //       .status(400)
// // //       .json({ success: false, message: "Could not send email" })
// // //   }
// // // }

// // const { instance } = require("../config/razorpay")
// // const Course = require("../models/Course")
// // const crypto = require("crypto")
// // const User = require("../models/User")
// // const mailSender = require("../utils/mailSender")
// // const mongoose = require("mongoose")
// // const {
// //   courseEnrollmentEmail,
// // } = require("../mail/templates/courseEnrollmentEmail")
// // const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
// // const CourseProgress = require("../models/CourseProgress")

// // // Capture the payment and initiate the Razorpay order
// // exports.capturePayment = async (req, res) => {
// //   const { courses } = req.body
// //   const userId = req.user.id
// //   if (courses.length === 0) {
// //     return res.json({ success: false, message: "Please Provide Course ID" })
// //   }

// //   let total_amount = 0

// //   for (const course_id of courses) {
// //     let course
// //     try {
// //       // Find the course by its ID
// //       course = await Course.findById(course_id)

// //       // If the course is not found, return an error
// //       if (!course) {
// //         return res
// //           .status(200)
// //           .json({ success: false, message: "Could not find the Course" })
// //       }

// //       // Check if the user is already enrolled in the course
// //       const uid = new mongoose.Types.ObjectId(userId)
// //       if (course.studentsEnroled.includes(uid)) {
// //         return res
// //           .status(200)
// //           .json({ success: false, message: "Student is already Enrolled" })
// //       }

// //       // Add the price of the course to the total amount
// //       total_amount += course.price
// //     } catch (error) {
// //       console.log(error)
// //       return res.status(500).json({ success: false, message: error.message })
// //     }
// //   }

// //   const options = {
// //     amount: total_amount * 100,
// //     currency: "INR",
// //     receipt: Math.random(Date.now()).toString(),
// //   }

// //   try {
// //     // Initiate the payment using Razorpay
// //     const paymentResponse = await instance.orders.create(options)
// //     console.log(paymentResponse)
// //     res.json({
// //       success: true,
// //       data: paymentResponse,
// //     })
// //   } catch (error) {
// //     console.log(error)
// //     res
// //       .status(500)
// //       .json({ success: false, message: "Could not initiate order." })
// //   }
// // }

// // // verify the payment
// // exports.verifyPayment = async (req, res) => {
// //   const razorpay_order_id = req.body?.razorpay_order_id
// //   const razorpay_payment_id = req.body?.razorpay_payment_id
// //   const razorpay_signature = req.body?.razorpay_signature
// //   const courses = req.body?.courses

// //   const userId = req.user.id

// //   if (
// //     !razorpay_order_id ||
// //     !razorpay_payment_id ||
// //     !razorpay_signature ||
// //     !courses ||
// //     !userId
// //   ) {
// //     return res.status(200).json({ success: false, message: "Payment Failed" })
// //   }

// //   let body = razorpay_order_id + "|" + razorpay_payment_id

// //   const expectedSignature = crypto
// //     .createHmac("sha256", process.env.RAZORPAY_SECRET)
// //     .update(body.toString())
// //     .digest("hex")

// //   if (expectedSignature === razorpay_signature) {
// //     await enrollStudents(courses, userId, res)
// //     return res.status(200).json({ success: true, message: "Payment Verified" })
// //   }

// //   return res.status(200).json({ success: false, message: "Payment Failed" })
// // }

// // // Send Payment Success Email
// // exports.sendPaymentSuccessEmail = async (req, res) => {
// //   const { orderId, paymentId, amount } = req.body

// //   const userId = req.user.id

// //   if (!orderId || !paymentId || !amount || !userId) {
// //     return res
// //       .status(400)
// //       .json({ success: false, message: "Please provide all the details" })
// //   }

// //   try {
// //     const enrolledStudent = await User.findById(userId)

// //     await mailSender(
// //       enrolledStudent.email,
// //       `Payment Received`,
// //       paymentSuccessEmail(
// //         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
// //         amount / 100,
// //         orderId,
// //         paymentId
// //       )
// //     )
// //   } catch (error) {
// //     console.log("error in sending mail", error)
// //     return res
// //       .status(400)
// //       .json({ success: false, message: "Could not send email" })
// //   }
// // }

// // // enroll the student in the courses
// // const enrollStudents = async (courses, userId, res) => {
// //   if (!courses || !userId) {
// //     return res
// //       .status(400)
// //       .json({ success: false, message: "Please Provide Course ID and User ID" })
// //   }

// //   for (const courseId of courses) {
// //     try {
// //       // Find the course and enroll the student in it
// //       const enrolledCourse = await Course.findOneAndUpdate(
// //         { _id: courseId },
// //         { $push: { studentsEnrolled: userId } },
// //         { new: true }
// //       )

// //       if (!enrolledCourse) {
// //         return res
// //           .status(500)
// //           .json({ success: false, error: "Course not found" })
// //       }
// //       console.log("Updated course: ", enrolledCourse)

// //       const courseProgress = await CourseProgress.create({
// //         courseID: courseId,
// //         userId: userId,
// //         completedVideos: [],
// //       })
// //       // Find the student and add the course to their list of enrolled courses
// //       const enrolledStudent = await User.findByIdAndUpdate(
// //         userId,
// //         {
// //           $push: {
// //             courses: courseId,
// //             courseProgress: courseProgress._id,
// //           },
// //         },
// //         { new: true }
// //       )

// //       console.log("Enrolled student: ", enrolledStudent)
// //       // Send an email notification to the enrolled student
// //       const emailResponse = await mailSender(
// //         enrolledStudent.email,
// //         `Successfully Enrolled into ${enrolledCourse.courseName}`,
// //         courseEnrollmentEmail(
// //           enrolledCourse.courseName,
// //           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
// //         )
// //       )

// //       console.log("Email sent successfully: ", emailResponse.response)
// //     } catch (error) {
// //       console.log(error)
// //       return res.status(400).json({ success: false, error: error.message })
// //     }
// //   }
// // }


// // controllers/Payments.js

// const { instance } = require("../config/razorpay");
// const Course = require("../models/Course");
// const crypto = require("crypto");
// const User = require("../models/User");
// const mailSender = require("../utils/mailSender");
// const mongoose = require("mongoose");
// const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
// const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
// const CourseProgress = require("../models/CourseProgress");

// // -------------------- CAPTURE PAYMENT --------------------
// exports.capturePayment = async (req, res) => {
//   try {
//     const { courses } = req.body;
//     const userId = req.user.id;

//     if (!courses || courses.length === 0) {
//       return res.status(400).json({ success: false, message: "Please Provide Course ID" });
//     }

//     let total_amount = 0;

//     for (const course_id of courses) {
//       const course = await Course.findById(course_id);
//       if (!course) {
//         return res.status(404).json({ success: false, message: "Course not found" });
//       }

//       if (!Array.isArray(course.studentsEnrolled)) {
//         course.studentsEnrolled = [];
//       }

//       const uid = new mongoose.Types.ObjectId(userId);
//       if (course.studentsEnrolled.some(id => id.equals(uid))) {
//         return res.status(400).json({ success: false, message: "Already Enrolled" });
//       }

//       total_amount += course.price;
//     }

//     if (total_amount <= 0) {
//       return res.status(400).json({ success: false, message: "Invalid amount" });
//     }

//     const options = {
//       amount: Math.round(total_amount * 100), // in paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     if (!instance || !instance.orders) {
//       throw new Error("Razorpay instance not configured properly");
//     }

//     const paymentResponse = await instance.orders.create(options);
//     return res.status(200).json({ success: true, data: paymentResponse });
//   } catch (error) {
//     console.error("Payment Initiation Error:", error);
//     return res.status(500).json({ success: false, message: "Could not initiate order.", error: error.message });
//   }
// };

// // -------------------- VERIFY PAYMENT --------------------
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
//     const userId = req.user.id;

//     // Step 1: Verify Razorpay signature
//     const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
//     shasum.update(razorpay_order_id + "|" + razorpay_payment_id);
//     const digest = shasum.digest("hex");

//     if (digest !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Payment verification failed" });
//     }

//     // Step 2: Enroll the user into all purchased courses
//     for (const courseId of courses) {
//       const enrolledCourse = await Course.findByIdAndUpdate(
//         courseId,
//         { $push: { studentsEnrolled: userId } },
//         { new: true }
//       );

//       // Create empty course progress
//       await CourseProgress.create({
//         courseID: courseId,
//         userId: userId,
//         completedVideos: [],
//       });

//       // Add course to user's list
//       await User.findByIdAndUpdate(
//         userId,
//         { $push: { courses: courseId } },
//         { new: true }
//       );

//       // Send enrollment email
//       await mailSender(
//         req.user.email,
//         `Successfully Enrolled into ${enrolledCourse.courseName}`,
//         courseEnrollmentEmail(enrolledCourse.courseName, req.user.firstName)
//       );
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified and courses enrolled successfully",
//     });
//   } catch (error) {
//     console.error("Payment Verification Error:", error);
//     return res.status(500).json({ success: false, message: "Could not verify payment", error: error.message });
//   }
// };

// // -------------------- SEND PAYMENT SUCCESS EMAIL --------------------
// exports.sendPaymentSuccessEmail = async (req, res) => {
//   try {
//     const { orderId, paymentId, amount } = req.body;
//     await mailSender(
//       req.user.email,
//       "Payment Successful",
//       paymentSuccessEmail(req.user.firstName, amount / 100, orderId, paymentId)
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Payment success email sent successfully",
//     });
//   } catch (error) {
//     console.error("Payment Success Email Error:", error);
//     return res.status(500).json({ success: false, message: "Could not send payment success email", error: error.message });
//   }
// };
// controllers/Payments.js














// const { instance } = require("../config/razorpay");
// const Course = require("../models/Course");
// const crypto = require("crypto");
// const User = require("../models/User");
// const mailSender = require("../utils/mailSender");
// const mongoose = require("mongoose");
// const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
// const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
// const CourseProgress = require("../models/CourseProgress");

// // -------------------- CAPTURE PAYMENT --------------------
// exports.capturePayment = async (req, res) => {
//   try {
//     const { courses } = req.body;
//     const userId = req.user.id;

//     if (!courses || courses.length === 0) {
//       return res.status(400).json({ success: false, message: "Please Provide Course ID" });
//     }

//     let total_amount = 0;

//     for (const course_id of courses) {
//       const course = await Course.findById(course_id);
//       if (!course) {
//         return res.status(404).json({ success: false, message: "Course not found" });
//       }

//       if (!Array.isArray(course.studentsEnrolled)) {
//         course.studentsEnrolled = [];
//       }

//       const uid = new mongoose.Types.ObjectId(userId);
//       if (course.studentsEnrolled.some(id => id.equals(uid))) {
//         return res.status(400).json({ success: false, message: "Already Enrolled" });
//       }

//       total_amount += course.price;
//     }

//     if (total_amount <= 0) {
//       return res.status(400).json({ success: false, message: "Invalid amount" });
//     }

//     const options = {
//       amount: Math.round(total_amount * 100), // <---- અહીં સુધારો કરવામાં આવ્યો છે.
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     if (!instance || !instance.orders) {
//       throw new Error("Razorpay instance not configured properly");
//     }

//     const paymentResponse = await instance.orders.create(options);
//     return res.status(200).json({ success: true, data: paymentResponse });
//   } catch (error) {
//     console.error("Payment Initiation Error:", error);
//     return res.status(500).json({ success: false, message: "Could not initiate order.", error: error.message });
//   }
// };

// // -------------------- VERIFY PAYMENT --------------------
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
//     const userId = req.user.id;

//     // Step 1: Verify Razorpay signature
//     const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
//     shasum.update(razorpay_order_id + "|" + razorpay_payment_id);
//     const digest = shasum.digest("hex");

//     if (digest !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Payment verification failed" });
//     }

//     // Step 2: Enroll the user into all purchased courses
//     for (const courseId of courses) {
//       const enrolledCourse = await Course.findByIdAndUpdate(
//         courseId,
//         { $push: { studentsEnrolled: userId } },
//         { new: true }
//       );

//       // Create empty course progress
//       await CourseProgress.create({
//         courseID: courseId,
//         userId: userId,
//         completedVideos: [],
//       });

//       // Add course to user's list
//       await User.findByIdAndUpdate(
//         userId,
//         { $push: { courses: courseId } },
//         { new: true }
//       );

//       // Send enrollment email
//       await mailSender(
//         req.user.email,
//         `Successfully Enrolled into ${enrolledCourse.courseName}`,
//         courseEnrollmentEmail(enrolledCourse.courseName, req.user.firstName)
//       );
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified and courses enrolled successfully",
//     });
//   } catch (error) {
//     console.error("Payment Verification Error:", error);
//     return res.status(500).json({ success: false, message: "Could not verify payment", error: error.message });
//   }
// };

// // -------------------- SEND PAYMENT SUCCESS EMAIL --------------------
// exports.sendPaymentSuccessEmail = async (req, res) => {
//   try {
//     const { orderId, paymentId, amount } = req.body;
//     await mailSender(
//       req.user.email,
//       "Payment Successful",
//       paymentSuccessEmail(req.user.firstName, amount / 100, orderId, paymentId)
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Payment success email sent successfully",
//     });
//   } catch (error) {
//     console.error("Payment Success Email Error:", error);
//     return res.status(500).json({ success: false, message: "Could not send payment success email", error: error.message });
//   }
// };











const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body
  const userId = req.user.id
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0

  for (const course_id of courses) {
    let course;
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId)
      if (course.studentsEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}





























































































//aa code un-comment kari devo jo koi problem aave to...
// enroll the student in the courses
// const enrollStudents = async (courses, userId, res) => {
//   if (!courses || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please Provide Course ID and User ID" })
//   }

//   for (const courseId of courses) {
//     try {
//       // Find the course and enroll the student in it
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentsEnroled: userId } },
//         { new: true }
//       )

//       if (!enrolledCourse) {
//         return res
//           .status(500)
//           .json({ success: false, error: "Course not found" })
//       }
//       console.log("Updated course: ", enrolledCourse)

//       const courseProgress = await CourseProgress.create({
//         courseID: courseId,
//         userId: userId,
//         completedVideos: [],
//       })
//       // Find the student and add the course to their list of enrolled courses
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             courses: courseId,
//             courseProgress: courseProgress._id,
//           },
//         },
//         { new: true }
//       )

//       console.log("Enrolled student: ", enrolledStudent)
//       // Send an email notification to the enrolled student
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         `Successfully Enrolled into ${enrolledCourse.courseName}`,
//         courseEnrollmentEmail(
//           enrolledCourse.courseName,
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         )
//       )

//       console.log("Email sent successfully: ", emailResponse.response)
//     } catch (error) {
//       console.log(error)
//       return res.status(400).json({ success: false, error: error.message })
//     }
//   }
// }




// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ success: false, error: "Course not found" })
      }

      // ✅ Check again if already enrolled
      if (course.studentsEnrolled.some((id) => id.equals(userId))) {
        console.log(`User ${userId} is already enrolled in ${course.courseName}`)
        continue // skip this course
      }

      // Enroll user in course
      const enrolledCourse = await Course.findByIdAndUpdate(
        courseId,
        { $addToSet: { studentsEnrolled: userId } }, // no duplicates
        { new: true }
      )

      // Create course progress
      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideo: [],
      })

      // Add course to user document
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      // Send enrollment email
      await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, error: error.message })
    }
  }
}








// const { instance } = require("../config/razorpay")
// const Course = require("../models/Course")
// const crypto = require("crypto")
// const User = require("../models/User")
// const mailSender = require("../utils/mailSender")
// const mongoose = require("mongoose")
// const {
//   courseEnrollmentEmail,
// } = require("../mail/templates/courseEnrollmentEmail")
// const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
// const CourseProgress = require("../models/CourseProgress")

// // Capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//   const { courses } = req.body
//   const userId = req.user.id
//   if (!courses || courses.length === 0) {
//     return res.json({ success: false, message: "Please Provide Course ID" })
//   }

//   let total_amount = 0

//   for (const course_id of courses) {
//     let course
//     try {
//       // Find the course by its ID
//       course = await Course.findById(course_id)

//       // If the course is not found, return an error
//       if (!course) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Could not find the Course" })
//       }

//       // Check if the user is already enrolled in the course
//       const uid = new mongoose.Types.ObjectId(userId)
//       if (course.studentsEnrolled.some((id) => id.equals(uid))) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Student is already Enrolled" })
//       }

//       // Add the price of the course to the total amount
//       total_amount += course.price
//     } catch (error) {
//       console.log(error)
//       return res.status(500).json({ success: false, message: error.message })
//     }
//   }

//   const options = {
//     amount: total_amount * 100,
//     currency: "INR",
//     receipt: Math.random(Date.now()).toString(),
//   }

//   try {
//     // Initiate the payment using Razorpay
//     const paymentResponse = await instance.orders.create(options)
//     console.log(paymentResponse)
//     res.json({
//       success: true,
//       data: paymentResponse,
//     })
//   } catch (error) {
//     console.log(error)
//     res
//       .status(500)
//       .json({ success: false, message: "Could not initiate order." })
//   }
// }

// // verify the payment
// exports.verifyPayment = async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } =
//     req.body
//   const userId = req.user.id

//   if (
//     !razorpay_order_id ||
//     !razorpay_payment_id ||
//     !razorpay_signature ||
//     !courses ||
//     !userId
//   ) {
//     return res.status(400).json({ success: false, message: "Payment Failed" })
//   }

//   let body = razorpay_order_id + "|" + razorpay_payment_id

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(body.toString())
//     .digest("hex")

//   if (expectedSignature === razorpay_signature) {
//     await enrollStudents(courses, userId, res)
//     return res.status(200).json({ success: true, message: "Payment Verified" })
//   }

//   return res.status(400).json({ success: false, message: "Payment Failed" })
// }

// // Send Payment Success Email
// exports.sendPaymentSuccessEmail = async (req, res) => {
//   const { orderId, paymentId, amount } = req.body

//   const userId = req.user.id

//   if (!orderId || !paymentId || !amount || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide all the details" })
//   }

//   try {
//     const enrolledStudent = await User.findById(userId)

//     await mailSender(
//       enrolledStudent.email,
//       `Payment Received`,
//       paymentSuccessEmail(
//         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//         amount / 100,
//         orderId,
//         paymentId
//       )
//     )
//   } catch (error) {
//     console.log("error in sending mail", error)
//     return res
//       .status(500)
//       .json({ success: false, message: "Could not send email" })
//   }
// }

// // enroll the student in the courses
// // enroll the student in the courses
// const enrollStudents = async (courses, userId, res) => {
//   if (!courses || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please Provide Course ID and User ID" })
//   }

//   for (const courseId of courses) {
//     try {
//       // Find course
//       const course = await Course.findById(courseId)
//       if (!course) {
//         return res.status(404).json({ success: false, error: "Course not found" })
//       }

//       // ✅ Check again if already enrolled
//       if (course.studentsEnrolled.some((id) => id.equals(userId))) {
//         console.log(`User ${userId} is already enrolled in ${course.courseName}`)
//         continue // skip this course
//       }

//       // Enroll user in course
//       const enrolledCourse = await Course.findByIdAndUpdate(
//         courseId,
//         { $addToSet: { studentsEnrolled: userId } }, // no duplicates
//         { new: true }
//       )

//       // Create course progress
//       const courseProgress = await CourseProgress.create({
//         courseID: courseId,
//         userId: userId,
//         completedVideos: [],
//       })

//       // Add course to user document
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $addToSet: {
//             courses: courseId,
//             courseProgress: courseProgress._id,
//           },
//         },
//         { new: true }
//       )

//       // Send enrollment email
//       await mailSender(
//         enrolledStudent.email,
//         `Successfully Enrolled into ${enrolledCourse.courseName}`,
//         courseEnrollmentEmail(
//           enrolledCourse.courseName,
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         )
//       )
//     } catch (error) {
//       console.log(error)
//       return res.status(500).json({ success: false, error: error.message })
//     }
//   }
// }

