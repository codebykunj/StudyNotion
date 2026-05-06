const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    title: {
        type: String,
        default: "Section Quiz",
    },
    questions: [
        {
            questionText: {
                type: String,
                required: true,
            },
            options: {
                type: [String],
                required: true,
                validate: (v) => v.length === 4,
            },
            correctAnswer: {
                type: Number, // index: 0, 1, 2, or 3
                required: true,
            },
            explanation: {
                type: String,
                default: "",
            },
        },
    ],
    passingScore: {
        type: Number,
        default: 60, // percentage
    },
    timeLimit: {
        type: Number, // in minutes; 0 = no limit
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);
