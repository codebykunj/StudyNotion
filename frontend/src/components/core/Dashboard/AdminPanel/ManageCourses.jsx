import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCoursesAdmin, deleteCourseAdmin } from "../../../../services/operations/adminAPI";
import { FaTrash, FaSearch } from "react-icons/fa";

const ManageCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [processing, setProcessing] = useState(null);

    const fetchCourses = async () => {
        setLoading(true);
        const data = await getAllCoursesAdmin(token);
        setCourses(data || []);
        setLoading(false);
    };

    useEffect(() => { fetchCourses(); }, [token]);

    const handleDelete = async () => {
        if (!confirmDelete) return;
        setProcessing(confirmDelete._id);
        const success = await deleteCourseAdmin(token, confirmDelete._id);
        if (success) setCourses((prev) => prev.filter((c) => c._id !== confirmDelete._id));
        setConfirmDelete(null);
        setProcessing(null);
    };

    const filtered = courses.filter((c) =>
        c.courseName?.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor?.firstName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-richblack-5">Manage Courses</h1>
                <p className="text-richblack-400 text-sm mt-1">{filtered.length} courses on platform</p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-richblack-700 rounded-xl px-4 py-2 mb-5 max-w-sm">
                <FaSearch className="text-richblack-400" />
                <input
                    className="bg-transparent text-richblack-100 outline-none w-full text-sm"
                    placeholder="Search by course name or instructor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-yellow-50 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="bg-richblack-800 rounded-2xl border border-richblack-700 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-richblack-700">
                            <tr>
                                <th className="text-left px-5 py-3 text-richblack-300 font-semibold">Course</th>
                                <th className="text-left px-5 py-3 text-richblack-300 font-semibold">Instructor</th>
                                <th className="text-left px-5 py-3 text-richblack-300 font-semibold">Status</th>
                                <th className="text-left px-5 py-3 text-richblack-300 font-semibold">Students</th>
                                <th className="text-left px-5 py-3 text-richblack-300 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-richblack-400">
                                        No courses found
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((course) => (
                                    <tr key={course._id} className="border-t border-richblack-700 hover:bg-richblack-750 transition-all">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                {course.thumbnail && (
                                                    <img src={course.thumbnail} alt={course.courseName} className="w-12 h-8 object-cover rounded-lg" />
                                                )}
                                                <span className="text-richblack-100 font-medium line-clamp-1 max-w-[200px]">
                                                    {course.courseName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-richblack-300">
                                            {course.instructor?.firstName} {course.instructor?.lastName}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                                course.status === "Published"
                                                    ? "bg-green-800/50 text-green-300"
                                                    : "bg-yellow-800/50 text-yellow-300"
                                            }`}>
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-richblack-300">
                                            {course.studentsEnrolled?.length || 0}
                                        </td>
                                        <td className="px-5 py-3">
                                            <button
                                                onClick={() => setConfirmDelete(course)}
                                                disabled={processing === course._id}
                                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all"
                                                title="Delete course"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirm Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-richblack-800 border border-richblack-600 rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-richblack-5 mb-2">Delete Course?</h3>
                        <p className="text-richblack-300 mb-6">
                            Are you sure you want to delete <strong className="text-richblack-100">"{confirmDelete.courseName}"</strong>?
                            This cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 border border-richblack-500 text-richblack-300 rounded-xl hover:bg-richblack-700">
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl">
                                Delete Course
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCourses;
