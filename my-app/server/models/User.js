const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        // trim:true,
    },
    confirmPassworrd:{
        type:String,
        
    },
    contactNumber:{
        type:Number,
        
    },
    accountType:{
        type:String,
        required:true,
        enum:["Admin","Student","Instructor"]
    },
    // For instructor verification by Admin
    instructorStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Approved", // Students and Admins are auto-approved; Instructors will be set to Pending on signup
    },
    instructorBio: {
        type: String,
        default: "",
    },
    expertise: {
        type: String,
        default: "",
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true, 
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }
    ],
    image:{
    type:String,
    required:true,
    },
    newPassword:{
        type:String,
        require:true,
    },
    courseProgress:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"CourseProgress",
    },
    resetPasswordExpires:{
        type:Date,
    }, 
    token: {
    type: String,
    },
    // Gamification fields
    xp: {
        type: Number,
        default: 0,
    },
    streak: {
        type: Number,
        default: 0,
    },
    lastLogin: {
        type: Date,
    },


});

module.exports = mongoose.model("User",userSchema);
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     // Removed confirmPassworrd from schema as it's for validation, not storage
//     contactNumber: {
//         type: String, // Changed to String for flexibility with leading zeros/special chars
//         required: true,
//     },
//     accountType: {
//         type: String,
//         required: true,
//         enum: ["Admin", "Student", "Instructor"]
//     },
//     additionalDetails: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Profile",
//         required: true,
//     },
//     courses: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Course",
//     }],
//     image: {
//         type: String,
//         required: true,
//     },
//     // Removed courseProgress from User as CourseProgress model handles per-course progress
//     // resetPasswordExpires: {
//     //     type: Date,
//     // }
// });

// module.exports = mongoose.model("User", userSchema);