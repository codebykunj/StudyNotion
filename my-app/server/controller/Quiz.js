const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const Section = require("../models/Section");

// ─── CREATE QUIZ (Instructor) ──────────────────────────────────────────────────
exports.createQuiz = async (req, res) => {
    try {
        const { sectionId, courseId, title, questions, passingScore, timeLimit } = req.body;

        if (!sectionId || !courseId || !questions || questions.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Section ID, Course ID, and at least one question are required",
            });
        }

        // Validate questions structure
        for (const q of questions) {
            if (!q.questionText || !q.options || q.options.length !== 4 || q.correctAnswer === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "Each question must have questionText, exactly 4 options, and a correctAnswer index",
                });
            }
        }

        // Check if quiz already exists for this section
        const existingQuiz = await Quiz.findOne({ section: sectionId });
        if (existingQuiz) {
            // Update existing quiz
            const updatedQuiz = await Quiz.findByIdAndUpdate(
                existingQuiz._id,
                { title, questions, passingScore: passingScore || 60, timeLimit: timeLimit || 0 },
                { new: true }
            );
            return res.status(200).json({
                success: true,
                message: "Quiz updated successfully",
                data: updatedQuiz,
            });
        }

        // Create new quiz
        const quiz = await Quiz.create({
            section: sectionId,
            course: courseId,
            title: title || "Section Quiz",
            questions,
            passingScore: passingScore || 60,
            timeLimit: timeLimit || 0,
        });

        // Link quiz to section
        await Section.findByIdAndUpdate(sectionId, { quiz: quiz._id });

        return res.status(201).json({
            success: true,
            message: "Quiz created successfully",
            data: quiz,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create quiz",
            error: error.message,
        });
    }
};

// ─── GET QUIZ BY SECTION (Student attempts / Instructor preview) ──────────────
exports.getQuizBySection = async (req, res) => {
    try {
        const { sectionId } = req.params;

        const quiz = await Quiz.findOne({ section: sectionId });
        if (!quiz) {
            return res.status(200).json({
                success: true,
                message: "No quiz found for this section",
                data: null,
            });
        }

        // For students: hide correctAnswer and explanation (send only after submission)
        const quizForStudent = {
            _id: quiz._id,
            title: quiz.title,
            passingScore: quiz.passingScore,
            timeLimit: quiz.timeLimit,
            questions: quiz.questions.map((q) => ({
                _id: q._id,
                questionText: q.questionText,
                options: q.options,
                // correctAnswer and explanation are NOT sent — only after submission
            })),
        };

        return res.status(200).json({
            success: true,
            data: quizForStudent,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch quiz",
            error: error.message,
        });
    }
};

// ─── SUBMIT QUIZ (Student) ────────────────────────────────────────────────────
exports.submitQuiz = async (req, res) => {
    try {
        const { quizId, sectionId, courseId, answers } = req.body;
        const studentId = req.user.id;

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ success: false, message: "Quiz not found" });
        }

        // Calculate score
        let correctCount = 0;
        const results = quiz.questions.map((q, index) => {
            const studentAnswer = answers[index];
            const isCorrect = studentAnswer === q.correctAnswer;
            if (isCorrect) correctCount++;
            return {
                questionText: q.questionText,
                options: q.options,
                studentAnswer,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation,
                isCorrect,
            };
        });

        const score = Math.round((correctCount / quiz.questions.length) * 100);
        const passed = score >= quiz.passingScore;

        // Count previous attempts
        const previousAttempts = await QuizAttempt.countDocuments({
            student: studentId,
            quiz: quizId,
        });

        // Save attempt
        const attempt = await QuizAttempt.create({
            student: studentId,
            quiz: quizId,
            course: courseId,
            section: sectionId,
            answers,
            score,
            passed,
            attemptNumber: previousAttempts + 1,
        });

        return res.status(200).json({
            success: true,
            message: passed ? "Congratulations! You passed the quiz!" : "You did not pass. Please try again.",
            data: {
                score,
                passed,
                passingScore: quiz.passingScore,
                correctCount,
                totalQuestions: quiz.questions.length,
                results, // includes correct answers + explanations after submission
                attemptId: attempt._id,
                attemptNumber: attempt.attemptNumber,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to submit quiz",
            error: error.message,
        });
    }
};

// ─── GET STUDENT'S QUIZ ATTEMPT HISTORY ───────────────────────────────────────
exports.getMyAttempts = async (req, res) => {
    try {
        const { quizId } = req.params;
        const studentId = req.user.id;

        const attempts = await QuizAttempt.find({ student: studentId, quiz: quizId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: attempts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch attempts",
            error: error.message,
        });
    }
};

// ─── CHECK IF STUDENT PASSED QUIZ FOR A SECTION ───────────────────────────────
exports.checkSectionQuizPassed = async (req, res) => {
    try {
        const { sectionId } = req.params;
        const studentId = req.user.id;

        // Find quiz for this section
        const quiz = await Quiz.findOne({ section: sectionId });
        if (!quiz) {
            // No quiz = section is unlocked
            return res.status(200).json({ success: true, passed: true, hasQuiz: false });
        }

        // Find if student has a passing attempt
        const passingAttempt = await QuizAttempt.findOne({
            student: studentId,
            quiz: quiz._id,
            passed: true,
        });

        return res.status(200).json({
            success: true,
            hasQuiz: true,
            quizId: quiz._id,
            passed: !!passingAttempt,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to check quiz status",
            error: error.message,
        });
    }
};

// ─── DELETE QUIZ (Instructor) ──────────────────────────────────────────────────
exports.deleteQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;

        const quiz = await Quiz.findByIdAndDelete(quizId);
        if (!quiz) {
            return res.status(404).json({ success: false, message: "Quiz not found" });
        }

        // Remove quiz reference from section
        await Section.findByIdAndUpdate(quiz.section, { quiz: null });

        return res.status(200).json({
            success: true,
            message: "Quiz deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete quiz",
            error: error.message,
        });
    }
};
