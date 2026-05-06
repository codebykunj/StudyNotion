const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String,
    },
    subSection:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
        required:true,
    }],
    // Link to this section's quiz (optional — set when instructor creates a quiz)
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        default: null,
    },
});

module.exports = mongoose.model("Section",sectionSchema)