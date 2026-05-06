const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    mobileNo:{
        type:Number,
    },
    message:{
        type:String,
    },
    email:{
        type:String,
    }
})

module.exports = mongoose.model("Contact",courseSchema);



// const mongoose = require("mongoose");

// const contactSchema = new mongoose.Schema({
//     firstname: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     lastname: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     mobileNo: {
//         type: String, // Changed to String to accommodate leading 0 or +91
//         required: true,
//         trim: true,
//         match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"]
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         match: [/.+\@.+\..+/, "Please enter a valid email"]
//     },
//     message: {
//         type: String,
//         required: true,
//         trim: true,
//     },
// }, {
//     timestamps: true // Automatically adds createdAt and updatedAt
// });

// module.exports = mongoose.model("Contact", contactSchema);
