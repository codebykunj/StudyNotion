import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiconnector } from "../../../services/apiconnector";
import { discussionEndpoints } from "../../../services/apis";
import toast from "react-hot-toast";
import { FaUserCircle, FaPaperPlane, FaReply, FaCommentDots } from "react-icons/fa";

const DiscussionForum = ({ courseId }) => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [newQuestion, setNewQuestion] = useState("");
    const [submittingQuestion, setSubmittingQuestion] = useState(false);

    const [replyingTo, setReplyingTo] = useState(null); // discussion _id
    const [replyText, setReplyText] = useState("");
    const [submittingReply, setSubmittingReply] = useState(false);

    const fetchDiscussions = async () => {
        try {
            const res = await apiconnector(
                "GET",
                `${discussionEndpoints.GET_COURSE_DISCUSSIONS_API}/${courseId}`,
                null,
                { Authorization: `Bearer ${token}` }
            );
            if (res?.data?.success) {
                setDiscussions(res.data.data);
            }
        } catch (error) {
            console.log("Failed to fetch discussions", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDiscussions();
    }, [courseId]);

    const handleAskQuestion = async (e) => {
        e.preventDefault();
        if (!newQuestion.trim()) return;
        setSubmittingQuestion(true);
        try {
            const res = await apiconnector(
                "POST",
                discussionEndpoints.CREATE_DISCUSSION_API,
                { courseId, question: newQuestion },
                { Authorization: `Bearer ${token}` }
            );
            if (res?.data?.success) {
                setDiscussions([res.data.data, ...discussions]);
                setNewQuestion("");
                toast.success("Question posted!");
            }
        } catch (error) {
            toast.error("Failed to post question");
        }
        setSubmittingQuestion(false);
    };

    const handleReply = async (discussionId) => {
        if (!replyText.trim()) return;
        setSubmittingReply(true);
        try {
            const res = await apiconnector(
                "POST",
                discussionEndpoints.ADD_ANSWER_API,
                { discussionId, answer: replyText },
                { Authorization: `Bearer ${token}` }
            );
            if (res?.data?.success) {
                // Update local state
                setDiscussions(discussions.map(d => 
                    d._id === discussionId ? res.data.data : d
                ));
                setReplyingTo(null);
                setReplyText("");
                toast.success("Reply posted!");
            }
        } catch (error) {
            toast.error("Failed to post reply");
        }
        setSubmittingReply(false);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
        });
    };

    return (
        <div className="bg-richblack-900 border border-richblack-700 rounded-2xl p-6 shadow-lg mt-8">
            <div className="flex items-center gap-3 mb-6">
                <FaCommentDots className="text-2xl text-yellow-50" />
                <h2 className="text-2xl font-bold text-richblack-5">Q&A Discussion Forum</h2>
            </div>

            {/* Ask a Question Box */}
            <form onSubmit={handleAskQuestion} className="bg-richblack-800 p-4 rounded-xl border border-richblack-600 mb-8">
                <div className="flex gap-4">
                    <img
                        src={user?.image}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://api.dicebear.com/5.x/initials/svg?seed=" + user?.firstName }}
                    />
                    <div className="flex-1">
                        <textarea
                            className="w-full bg-richblack-700 text-richblack-100 rounded-lg p-3 text-sm border border-richblack-600 focus:outline-none focus:border-yellow-50 resize-none"
                            rows={3}
                            placeholder="Ask a question about this course..."
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                        />
                        <div className="flex justify-end mt-3">
                            <button
                                type="submit"
                                disabled={submittingQuestion || !newQuestion.trim()}
                                className="flex items-center gap-2 px-5 py-2 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-all disabled:opacity-50"
                            >
                                <FaPaperPlane className="text-sm" />
                                {submittingQuestion ? "Posting..." : "Post Question"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Discussions List */}
            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="w-8 h-8 border-4 border-yellow-50 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : discussions.length === 0 ? (
                <div className="text-center py-10 text-richblack-400 bg-richblack-800/50 rounded-xl">
                    <FaCommentDots className="text-4xl mx-auto mb-3 text-richblack-500" />
                    <p>No discussions yet. Be the first to ask a question!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {discussions.map((discussion) => (
                        <div key={discussion._id} className="bg-richblack-800 p-5 rounded-xl border border-richblack-600">
                            {/* Question Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <img
                                    src={discussion.user?.image}
                                    alt="User"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-richblack-100">
                                            {discussion.user?.firstName} {discussion.user?.lastName}
                                        </p>
                                        <p className="text-xs text-richblack-400">{formatDate(discussion.createdAt)}</p>
                                    </div>
                                    <p className="text-richblack-50 mt-2 text-sm leading-relaxed">{discussion.question}</p>
                                </div>
                            </div>

                            {/* Answers List */}
                            {discussion.answers && discussion.answers.length > 0 && (
                                <div className="ml-14 space-y-4 border-l-2 border-richblack-700 pl-4 mb-4">
                                    {discussion.answers.map((ans, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <img
                                                src={ans.user?.image}
                                                alt="User"
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <div className="flex-1 bg-richblack-700/50 p-3 rounded-lg border border-richblack-700">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold text-richblack-200 text-sm">
                                                        {ans.user?.firstName} {ans.user?.lastName}
                                                    </span>
                                                    {ans.user?.accountType === "Instructor" && (
                                                        <span className="bg-yellow-50 text-richblack-900 text-[10px] px-1.5 py-0.5 rounded font-bold">
                                                            Instructor
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-richblack-500 ml-auto">{formatDate(ans.createdAt)}</span>
                                                </div>
                                                <p className="text-richblack-100 text-sm">{ans.answer}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Reply Action */}
                            <div className="ml-14 mt-2">
                                {replyingTo === discussion._id ? (
                                    <div className="bg-richblack-700 p-3 rounded-lg mt-3 flex items-end gap-2">
                                        <textarea
                                            className="w-full bg-richblack-800 text-richblack-100 rounded-lg p-2 text-sm border border-richblack-600 focus:outline-none focus:border-yellow-50 resize-none"
                                            rows={2}
                                            placeholder="Write your reply..."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            autoFocus
                                        />
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => { setReplyingTo(null); setReplyText(""); }}
                                                className="px-3 py-2 text-sm text-richblack-300 hover:text-richblack-100"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleReply(discussion._id)}
                                                disabled={submittingReply || !replyText.trim()}
                                                className="px-3 py-2 bg-yellow-50 text-richblack-900 text-sm font-semibold rounded-lg hover:bg-yellow-100 disabled:opacity-50"
                                            >
                                                Reply
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => { setReplyingTo(discussion._id); setReplyText(""); }}
                                        className="flex items-center gap-1.5 text-sm text-yellow-50 hover:text-yellow-200 transition-colors"
                                    >
                                        <FaReply className="text-xs" /> Reply
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DiscussionForum;
