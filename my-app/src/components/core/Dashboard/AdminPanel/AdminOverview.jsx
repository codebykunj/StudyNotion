import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAdminStats } from "../../../../services/operations/adminAPI";
import { FaUsers, FaChalkboardTeacher, FaBookOpen, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const StatCard = ({ icon: Icon, label, value, color, link }) => (
    <Link to={link} className="block">
        <div className={`flex items-center gap-4 p-6 rounded-2xl border ${color} bg-richblack-800 hover:scale-105 transition-all duration-300 cursor-pointer`}>
            <div className="p-3 rounded-xl bg-richblack-700">
                <Icon className="text-2xl text-yellow-50" />
            </div>
            <div>
                <p className="text-3xl font-bold text-richblack-5">{value ?? "—"}</p>
                <p className="text-sm text-richblack-300">{label}</p>
            </div>
        </div>
    </Link>
);

const AdminOverview = () => {
    const { token } = useSelector((state) => state.auth);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await getAdminStats(token);
            setStats(data);
            setLoading(false);
        })();
    }, [token]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-yellow-50 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-richblack-5 mb-1">Admin Dashboard</h1>
                <p className="text-richblack-300">Overview of your StudyNotion platform</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mb-10">
                <StatCard
                    icon={FaUsers}
                    label="Total Students"
                    value={stats?.totalStudents}
                    color="border-blue-500/40"
                    link="/dashboard/admin/users?type=Student"
                />
                <StatCard
                    icon={FaChalkboardTeacher}
                    label="Approved Instructors"
                    value={stats?.approvedInstructors}
                    color="border-green-500/40"
                    link="/dashboard/admin/users?type=Instructor"
                />
                <StatCard
                    icon={FaClock}
                    label="Pending Instructor Requests"
                    value={stats?.pendingInstructors}
                    color="border-yellow-400/40"
                    link="/dashboard/admin/pending-instructors"
                />
                <StatCard
                    icon={FaBookOpen}
                    label="Total Courses"
                    value={stats?.totalCourses}
                    color="border-purple-500/40"
                    link="/dashboard/admin/courses"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-richblack-800 rounded-2xl border border-richblack-700 p-6">
                <h2 className="text-xl font-semibold text-richblack-5 mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link
                        to="/dashboard/admin/pending-instructors"
                        className="px-5 py-2.5 bg-yellow-50 text-richblack-900 font-semibold rounded-xl hover:bg-yellow-100 transition-all"
                    >
                        Review Pending Instructors
                    </Link>
                    <Link
                        to="/dashboard/admin/users"
                        className="px-5 py-2.5 border border-richblack-600 text-richblack-200 font-semibold rounded-xl hover:bg-richblack-700 transition-all"
                    >
                        Manage Users
                    </Link>
                    <Link
                        to="/dashboard/admin/courses"
                        className="px-5 py-2.5 border border-richblack-600 text-richblack-200 font-semibold rounded-xl hover:bg-richblack-700 transition-all"
                    >
                        Manage Courses
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
