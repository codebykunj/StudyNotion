const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    question: {
        type: String,
        required: true,
        trim: true,
    },
    answers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
            answer: {
                type: String,
                required: true,
                trim: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Discussion", discussionSchema);
