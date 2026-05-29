const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    completedVideo:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection",
        }
    ]
});

module.exports = mongoose.model("CourseProgress",courseProgress);
// const mongoose = require("mongoose");

// const courseProgressSchema = new mongoose.Schema({ // Renamed variable
//     courseID: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Course",
//         required: true, // Added required
//     },
//     userId: { // Added userId to link progress to a specific user
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true, // Added required
//     },
//     completedVideo: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "SubSection",
//         }
//     ]
// });

// module.exports = mongoose.model("CourseProgress", courseProgressSchema); 