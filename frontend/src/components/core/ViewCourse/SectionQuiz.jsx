import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../slices/profileSlice";
import { apiconnector } from "../../../services/apiconnector";
import { quizEndpoints } from "../../../services/apis";
import toast from "react-hot-toast";
import { FaClock, FaCheckCircle, FaTimesCircle, FaTrophy } from "react-icons/fa";

const SectionQuiz = ({ sectionId, courseId, onQuizPassed }) => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alreadyPassed, setAlreadyPassed] = useState(false);
    const [started, setStarted] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const timerRef = useRef(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                // Check if already passed
                const checkRes = await apiconnector(
                    "GET",
                    `${quizEndpoints.CHECK_SECTION_QUIZ_PASSED_API}/${sectionId}/check`,
                    null,
                    { Authorization: `Bearer ${token}` }
                );
                if (checkRes?.data?.passed) {
                    setAlreadyPassed(true);
                    setLoading(false);
                    return;
                }

                // Load quiz
                const quizRes = await apiconnector(
                    "GET",
                    `${quizEndpoints.GET_QUIZ_BY_SECTION_API}/${sectionId}`,
                    null,
                    { Authorization: `Bearer ${token}` }
                );
                if (quizRes?.data?.data) {
                    setQuiz(quizRes.data.data);
                    setAnswers(new Array(quizRes.data.data.questions.length).fill(null));
                }
            } catch (err) {
                console.log("Error loading quiz:", err);
            }
            setLoading(false);
        };
        fetchQuiz();
    }, [sectionId, token]);

    const startQuiz = () => {
        setStarted(true);
        if (quiz?.timeLimit > 0) {
            setTimeLeft(quiz.timeLimit * 60);
        }
    };

    // Timer countdown
    useEffect(() => {
        if (started && timeLeft !== null) {
            if (timeLeft <= 0) {
                handleSubmit(true); // auto-submit
                return;
            }
            timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
        }
        return () => clearTimeout(timerRef.current);
    }, [started, timeLeft]);

    const handleAnswerSelect = (qIndex, optIndex) => {
        if (submitted) return;
        const updated = [...answers];
        updated[qIndex] = optIndex;
        setAnswers(updated);
    };

    const handleSubmit = async (autoSubmit = false) => {
        if (!autoSubmit) {
            const unanswered = answers.filter((a) => a === null).length;
            if (unanswered > 0) {
                return toast.error(`You have ${unanswered} unanswered question(s). Please answer all before submitting.`);
            }
        }

        setSubmitting(true);
        clearTimeout(timerRef.current);
        try {
            const response = await apiconnector(
                "POST",
                quizEndpoints.SUBMIT_QUIZ_API,
                { quizId: quiz._id, sectionId, courseId, answers },
                { Authorization: `Bearer ${token}` }
            );
            if (response?.data?.success) {
                setResult(response.data.data);
                setSubmitted(true);
                if (response.data.data.passed) {
                    if (response.data.data.xp && user) {
                        dispatch(setUser({ ...user, xp: response.data.data.xp }));
                    }
                    toast.success("🎉 You passed the quiz!");
                    onQuizPassed?.();
                } else {
                    toast.error(`You scored ${response.data.data.score}%. Need ${response.data.data.passingScore}% to pass.`);
                }
            }
        } catch (err) {
            toast.error("Failed to submit quiz");
            console.log(err);
        }
        setSubmitting(false);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    if (loading) return (
        <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-yellow-50 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!quiz) return null; // No quiz for this section

    // ── Already Passed ──────────────────────────────────────────────────────
    if (alreadyPassed) {
        return (
            <div className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-700/40 rounded-xl">
                <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />
                <p className="text-green-300 font-semibold">You have already passed this section's quiz! ✓</p>
            </div>
        );
    }

    // ── Pre-Quiz Screen ──────────────────────────────────────────────────────
    if (!started) {
        return (
            <div className="bg-richblack-800 border border-yellow-500/30 rounded-2xl p-6 mt-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                        <span className="text-2xl">📝</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-richblack-5">{quiz.title}</h3>
                        <p className="text-richblack-400 text-sm">Complete this quiz to proceed to the next section</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 mb-5 text-sm text-richblack-300">
                    <span>📊 <strong>{quiz.questions.length}</strong> Questions</span>
                    <span>✅ Pass at <strong>{quiz.passingScore}%</strong></span>
                    {quiz.timeLimit > 0 && (
                        <span>⏱️ <strong>{quiz.timeLimit}</strong> minutes</span>
                    )}
                </div>
                <div className="p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-xl mb-5 text-sm text-yellow-200">
                    ⚠️ You must score at least <strong>{quiz.passingScore}%</strong> to unlock the next section. You can retake the quiz if you don't pass.
                </div>
                <button
                    onClick={startQuiz}
                    className="px-6 py-2.5 bg-yellow-50 text-richblack-900 font-bold rounded-xl hover:bg-yellow-100 transition-all"
                >
                    Start Quiz →
                </button>
            </div>
        );
    }

    // ── Result Screen ────────────────────────────────────────────────────────
    if (submitted && result) {
        return (
            <div className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6 mt-4">
                {/* Result Banner */}
                <div className={`flex items-center gap-4 p-5 rounded-xl mb-6 ${
                    result.passed ? "bg-green-900/30 border border-green-600/40" : "bg-red-900/30 border border-red-600/40"
                }`}>
                    {result.passed ? (
                        <FaTrophy className="text-4xl text-yellow-400 flex-shrink-0" />
                    ) : (
                        <FaTimesCircle className="text-4xl text-red-400 flex-shrink-0" />
                    )}
                    <div>
                        <p className={`text-2xl font-bold ${result.passed ? "text-green-300" : "text-red-300"}`}>
                            {result.passed ? "Congratulations! You Passed! 🎉" : "Better Luck Next Time!"}
                        </p>
                        <p className="text-richblack-300">
                            Score: <strong className="text-richblack-100">{result.score}%</strong> &nbsp;|&nbsp;
                            {result.correctCount}/{result.totalQuestions} correct &nbsp;|&nbsp;
                            Passing: {result.passingScore}%
                        </p>
                    </div>
                </div>

                {/* Detailed Results */}
                <h4 className="text-richblack-200 font-semibold mb-4">Question Review:</h4>
                <div className="space-y-4">
                    {result.results.map((r, i) => (
                        <div key={i} className={`p-4 rounded-xl border ${r.isCorrect ? "border-green-700/40 bg-green-900/10" : "border-red-700/40 bg-red-900/10"}`}>
                            <div className="flex items-start gap-2 mb-3">
                                {r.isCorrect ? <FaCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" /> : <FaTimesCircle className="text-red-400 mt-0.5 flex-shrink-0" />}
                                <p className="text-richblack-100 font-medium">{i + 1}. {r.questionText}</p>
                            </div>
                            <div className="pl-6 space-y-1 text-sm">
                                {r.options.map((opt, oi) => (
                                    <div key={oi} className={`px-3 py-1.5 rounded-lg ${
                                        oi === r.correctAnswer ? "bg-green-800/40 text-green-200 font-semibold" :
                                        oi === r.studentAnswer && !r.isCorrect ? "bg-red-800/40 text-red-200" :
                                        "text-richblack-400"
                                    }`}>
                                        {oi === r.correctAnswer ? "✓ " : oi === r.studentAnswer && !r.isCorrect ? "✗ " : "  "}
                                        {opt}
                                    </div>
                                ))}
                            </div>
                            {r.explanation && (
                                <p className="mt-2 pl-6 text-sm text-blue-300 italic">💡 {r.explanation}</p>
                            )}
                        </div>
                    ))}
                </div>

                {!result.passed && (
                    <button
                        onClick={() => { setSubmitted(false); setStarted(false); setAnswers(new Array(quiz.questions.length).fill(null)); setResult(null); setTimeLeft(null); }}
                        className="mt-6 px-6 py-2.5 bg-yellow-50 text-richblack-900 font-bold rounded-xl hover:bg-yellow-100 transition-all"
                    >
                        Retake Quiz
                    </button>
                )}
            </div>
        );
    }

    // ── Quiz Attempt Screen ──────────────────────────────────────────────────
    return (
        <div className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6 mt-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-richblack-5">{quiz.title}</h3>
                {timeLeft !== null && (
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono font-bold text-lg ${
                        timeLeft <= 60 ? "bg-red-900/40 text-red-300 animate-pulse" : "bg-richblack-700 text-yellow-200"
                    }`}>
                        <FaClock />
                        {formatTime(timeLeft)}
                    </div>
                )}
            </div>

            {/* Progress */}
            <div className="mb-5">
                <div className="flex justify-between text-xs text-richblack-400 mb-1">
                    <span>{answers.filter((a) => a !== null).length} / {quiz.questions.length} answered</span>
                    <span>{quiz.passingScore}% to pass</span>
                </div>
                <div className="w-full h-1.5 bg-richblack-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-yellow-400 transition-all duration-300"
                        style={{ width: `${(answers.filter((a) => a !== null).length / quiz.questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
                {quiz.questions.map((q, qIndex) => (
                    <div key={qIndex} className="border border-richblack-600 rounded-xl p-5 bg-richblack-700">
                        <p className="text-richblack-100 font-semibold mb-4">
                            {qIndex + 1}. {q.questionText}
                        </p>
                        <div className="space-y-2">
                            {q.options.map((opt, optIndex) => (
                                <button
                                    key={optIndex}
                                    onClick={() => handleAnswerSelect(qIndex, optIndex)}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm border-2 transition-all font-medium ${
                                        answers[qIndex] === optIndex
                                            ? "border-yellow-400 bg-yellow-900/30 text-yellow-100"
                                            : "border-richblack-600 bg-richblack-800 text-richblack-200 hover:border-richblack-400"
                                    }`}
                                >
                                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 ${
                                        answers[qIndex] === optIndex ? "bg-yellow-400 text-richblack-900" : "bg-richblack-600 text-richblack-300"
                                    }`}>
                                        {["A", "B", "C", "D"][optIndex]}
                                    </span>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Submit */}
            <button
                onClick={() => handleSubmit(false)}
                disabled={submitting}
                className="mt-6 px-8 py-3 bg-yellow-50 text-richblack-900 font-bold rounded-xl hover:bg-yellow-100 transition-all disabled:opacity-50 w-full sm:w-auto"
            >
                {submitting ? "Submitting..." : "Submit Quiz →"}
            </button>
        </div>
    );
};

export default SectionQuiz;
