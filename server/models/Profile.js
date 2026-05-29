const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
        // required:true,
    },
    dateOfBirth:{
        type:String,
        // required:true,
    },
    about:{
        type:String,
        trim:true,
    },
    contactNumber:{
        type:Number,
        trim:true,
    }
});

module.exports = mongoose.model("Profile",profileSchema);

// const mongoose = require("mongoose");

// const profileSchema = new mongoose.Schema({
//     gender: {
//         type: String,
//         // required:true, // Decide if truly required or optional
//     },
//     dateOfBirth: {
//         type: String,
//         // required:true, // Decide if truly required or optional
//     },
//     about: {
//         type: String,
//         trim: true,
//     },
//     contactNumber: {
//         type: Number,
//         trim: true,
//     }
// });

// module.exports = mongoose.model("Profile", profileSchema);