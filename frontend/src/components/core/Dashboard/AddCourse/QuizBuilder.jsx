import React, { useState } from "react";
import { useSelector } from "react-redux";
import { apiconnector } from "../../../../services/apiconnector";
import { quizEndpoints } from "../../../../services/apis";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaSave } from "react-icons/fa";

const EMPTY_QUESTION = {
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
};

const QuizBuilder = ({ sectionId, courseId, existingQuiz, onClose }) => {
    const { token } = useSelector((state) => state.auth);
    const [title, setTitle] = useState(existingQuiz?.title || "Section Quiz");
    const [passingScore, setPassingScore] = useState(existingQuiz?.passingScore || 60);
    const [timeLimit, setTimeLimit] = useState(existingQuiz?.timeLimit || 0);
    const [questions, setQuestions] = useState(
        existingQuiz?.questions?.length > 0
            ? existingQuiz.questions
            : [{ ...EMPTY_QUESTION, options: ["", "", "", ""] }]
    );
    const [saving, setSaving] = useState(false);

    const addQuestion = () => {
        setQuestions([...questions, { ...EMPTY_QUESTION, options: ["", "", "", ""] }]);
    };

    const removeQuestion = (index) => {
        if (questions.length === 1) return toast.error("Quiz must have at least 1 question");
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const updateQuestion = (index, field, value) => {
        const updated = [...questions];
        updated[index] = { ...updated[index], [field]: value };
        setQuestions(updated);
    };

    const updateOption = (qIndex, optIndex, value) => {
        const updated = [...questions];
        const opts = [...updated[qIndex].options];
        opts[optIndex] = value;
        updated[qIndex] = { ...updated[qIndex], options: opts };
        setQuestions(updated);
    };

    const handleSave = async () => {
        // Validate
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.questionText.trim()) return toast.error(`Question ${i + 1}: Enter the question text`);
            for (let j = 0; j < 4; j++) {
                if (!q.options[j].trim()) return toast.error(`Question ${i + 1}: Fill all 4 options`);
            }
        }

        setSaving(true);
        try {
            const response = await apiconnector(
                "POST",
                quizEndpoints.CREATE_QUIZ_API,
                { sectionId, courseId, title, questions, passingScore, timeLimit },
                { Authorization: `Bearer ${token}` }
            );
            if (response?.data?.success) {
                toast.success("Quiz saved successfully!");
                onClose?.(response.data.data);
            } else {
                throw new Error(response?.data?.message);
            }
        } catch (error) {
            toast.error("Failed to save quiz");
            console.log(error);
        }
        setSaving(false);
    };

    return (
        <div className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6 mt-4">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-richblack-5">📝 Quiz Builder</h3>
                {onClose && (
                    <button onClick={() => onClose(null)} className="text-richblack-400 hover:text-richblack-100 text-sm">
                        ✕ Close
                    </button>
                )}
            </div>

            {/* Quiz Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-richblack-700 rounded-xl">
                <div>
                    <label className="text-xs text-richblack-300 mb-1 block">Quiz Title</label>
                    <input
                        className="w-full bg-richblack-800 text-richblack-100 rounded-lg px-3 py-2 text-sm border border-richblack-600 focus:outline-none focus:border-yellow-50"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-xs text-richblack-300 mb-1 block">Passing Score (%)</label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        className="w-full bg-richblack-800 text-richblack-100 rounded-lg px-3 py-2 text-sm border border-richblack-600 focus:outline-none focus:border-yellow-50"
                        value={passingScore}
                        onChange={(e) => setPassingScore(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className="text-xs text-richblack-300 mb-1 block">Time Limit (minutes, 0 = none)</label>
                    <input
                        type="number"
                        min={0}
                        className="w-full bg-richblack-800 text-richblack-100 rounded-lg px-3 py-2 text-sm border border-richblack-600 focus:outline-none focus:border-yellow-50"
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(Number(e.target.value))}
                    />
                </div>
            </div>

            {/* Questions */}
            <div className="space-y-5">
                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="border border-richblack-600 rounded-xl p-5 bg-richblack-700">
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1">
                                <label className="text-xs text-richblack-300 mb-1 block">
                                    Question {qIndex + 1}
                                </label>
                                <textarea
                                    rows={2}
                                    className="w-full bg-richblack-800 text-richblack-100 rounded-lg px-3 py-2 text-sm border border-richblack-600 focus:outline-none focus:border-yellow-50 resize-none"
                                    placeholder="Enter your question..."
                                    value={q.questionText}
                                    onChange={(e) => updateQuestion(qIndex, "questionText", e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => removeQuestion(qIndex)}
                                className="mt-5 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all"
                            >
                                <FaTrash />
                            </button>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                            {q.options.map((opt, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name={`correct-${qIndex}`}
                                        checked={q.correctAnswer === optIndex}
                                        onChange={() => updateQuestion(qIndex, "correctAnswer", optIndex)}
                                        className="accent-yellow-400"
                                    />
                                    <input
                                        className="flex-1 bg-richblack-800 text-richblack-100 rounded-lg px-3 py-2 text-sm border border-richblack-600 focus:outline-none focus:border-yellow-50"
                                        placeholder={`Option ${optIndex + 1}`}
                                        value={opt}
                                        onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                                    />
                                    {q.correctAnswer === optIndex && (
                                        <span className="text-green-400 text-xs font-semibold">✓ Correct</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-richblack-400 mb-2">Select the radio button next to the correct answer</p>

                        {/* Explanation */}
                        <input
                            className="w-full bg-richblack-800 text-richblack-400 rounded-lg px-3 py-2 text-sm border border-richblack-600 focus:outline-none focus:border-yellow-50"
                            placeholder="Optional: Explanation shown to students after submission..."
                            value={q.explanation}
                            onChange={(e) => updateQuestion(qIndex, "explanation", e.target.value)}
                        />
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
                <button
                    onClick={addQuestion}
                    className="flex items-center gap-2 px-4 py-2 border border-richblack-500 text-richblack-200 rounded-xl hover:bg-richblack-700 text-sm"
                >
                    <FaPlus /> Add Question
                </button>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2 bg-yellow-50 text-richblack-900 font-semibold rounded-xl hover:bg-yellow-100 transition-all text-sm disabled:opacity-50"
                >
                    <FaSave /> {saving ? "Saving..." : "Save Quiz"}
                </button>
            </div>
        </div>
    );
};

export default QuizBuilder;
