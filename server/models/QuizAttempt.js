const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true,
    },
    answers: [Number],      // array of chosen option indices (0-3)
    score: {
        type: Number,       // percentage score
        default: 0,
    },
    passed: {
        type: Boolean,
        default: false,
    },
    attemptNumber: {
        type: Number,
        default: 1,
    },
}, { timestamps: true });

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
