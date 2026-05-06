import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    getPendingInstructors,
    approveInstructor,
    rejectInstructor,
} from "../../../../services/operations/adminAPI";
import { FaCheck, FaTimes, FaUser } from "react-icons/fa";

const PendingInstructors = () => {
    const { token } = useSelector((state) => state.auth);
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rejectModal, setRejectModal] = useState(null); // { id, name }
    const [rejectReason, setRejectReason] = useState("");
    const [processing, setProcessing] = useState(null);

    const fetchPending = async () => {
        setLoading(true);
        const data = await getPendingInstructors(token);
        setInstructors(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchPending();
    }, [token]);

    const handleApprove = async (id) => {
        setProcessing(id);
        const success = await approveInstructor(token, id);
        if (success) setInstructors((prev) => prev.filter((i) => i._id !== id));
        setProcessing(null);
    };

    const handleReject = async () => {
        if (!rejectModal) return;
        setProcessing(rejectModal.id);
        const success = await rejectInstructor(token, rejectModal.id, rejectReason);
        if (success) setInstructors((prev) => prev.filter((i) => i._id !== rejectModal.id));
        setRejectModal(null);
        setRejectReason("");
        setProcessing(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-yellow-50 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-richblack-5">Pending Instructor Requests</h1>
                <p className="text-richblack-400 text-sm mt-1">
                    {instructors.length} instructor{instructors.length !== 1 ? "s" : ""} waiting for approval
                </p>
            </div>

            {instructors.length === 0 ? (
                <div className="text-center py-20 bg-richblack-800 rounded-2xl border border-richblack-700">
                    <FaUser className="text-5xl text-richblack-500 mx-auto mb-4" />
                    <p className="text-richblack-300 text-lg">No pending instructor requests! 🎉</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {instructors.map((instructor) => (
                        <div
                            key={instructor._id}
                            className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between hover:border-richblack-500 transition-all"
                        >
                            {/* Instructor Info */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={instructor.image}
                                    alt={instructor.firstName}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-yellow-50"
                                />
                                <div>
                                    <p className="font-semibold text-richblack-5 text-lg">
                                        {instructor.firstName} {instructor.lastName}
                                    </p>
                                    <p className="text-richblack-400 text-sm">{instructor.email}</p>
                                    {instructor.expertise && (
                                        <span className="mt-1 inline-block text-xs bg-yellow-900/40 text-yellow-200 px-2 py-0.5 rounded-full">
                                            {instructor.expertise}
                                        </span>
                                    )}
                                    {instructor.instructorBio && (
                                        <p className="text-richblack-400 text-sm mt-1 max-w-md line-clamp-2">
                                            {instructor.instructorBio}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 flex-shrink-0">
                                <button
                                    onClick={() => handleApprove(instructor._id)}
                                    disabled={processing === instructor._id}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
                                >
                                    <FaCheck />
                                    Approve
                                </button>
                                <button
                                    onClick={() => setRejectModal({ id: instructor._id, name: `${instructor.firstName} ${instructor.lastName}` })}
                                    disabled={processing === instructor._id}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
                                >
                                    <FaTimes />
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Reject Modal */}
            {rejectModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-richblack-800 border border-richblack-600 rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-richblack-5 mb-2">Reject Instructor</h3>
                        <p className="text-richblack-300 mb-4">
                            Rejecting <strong className="text-richblack-100">{rejectModal.name}</strong>. 
                            An email will be sent to notify them.
                        </p>
                        <textarea
                            className="w-full bg-richblack-700 text-richblack-100 rounded-xl p-3 border border-richblack-600 focus:outline-none focus:border-yellow-50 resize-none"
                            rows={3}
                            placeholder="Optional: Reason for rejection (will be included in email)"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                        />
                        <div className="flex gap-3 mt-4 justify-end">
                            <button
                                onClick={() => { setRejectModal(null); setRejectReason(""); }}
                                className="px-4 py-2 border border-richblack-500 text-richblack-300 rounded-xl hover:bg-richblack-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl"
                            >
                                Confirm Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingInstructors;
