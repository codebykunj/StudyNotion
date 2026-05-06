import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../../../services/operations/adminAPI";
import { FaSearch } from "react-icons/fa";

const ManageUsers = () => {
    const { token } = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(""); // Student | Instructor | ""
    const [search, setSearch] = useState("");

    useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await getAllUsers(token, filter);
            setUsers(data || []);
            setLoading(false);
        })();
    }, [token, filter]);

    const filtered = users.filter((u) => {
        const q = search.toLowerCase();
        return (
            u.firstName?.toLowerCase().includes(q) ||
            u.lastName?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q)
        );
    });

    const statusColor = {
        Approved: "bg-green-800/50 text-green-300",
        Pending: "bg-yellow-800/50 text-yellow-300",
        Rejected: "bg-red-800/50 text-red-300",
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-richblack-5">Manage Users</h1>
                <p className="text-richblack-400 text-sm mt-1">{filtered.length} users found</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-5">
                <div className="flex items-center gap-2 bg-richblack-700 rounded-xl px-4 py-2 flex-1 min-w-[200px]">
                    <FaSearch className="text-richblack-400" />
                    <input
                        className="bg-transparent text-richblack-100 outline-none w-full text-sm"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {["", "Student", "Instructor"].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                            filter === type
                                ? "bg-yellow-50 text-richblack-900"
                                : "border border-richblack-600 text-richblack-300 hover:bg-richblack-700"
                        }`}
                    >
                        {type || "All"}
                    </button>
                ))}
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-yellow-50 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="bg-richblack-800 rounded-2xl border border-richblack-700 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-richblack-700">
                            <tr>
                                <th className="text-left px-5 py-3 text-richblack-300 font-semibold">User</th>
                                <th className="text-left px-5 py-3 text-richblack-300 font-semibold">Email</th>
                                <th className="text-left px-5 py-3 text-richblack-300 font-semibold">Role</th>
                                <th className="text-left px-5 py-3 text-richblack-300 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-12 text-richblack-400">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((user) => (
                                    <tr key={user._id} className="border-t border-richblack-700 hover:bg-richblack-750 transition-all">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user.image}
                                                    alt={user.firstName}
                                                    className="w-9 h-9 rounded-full object-cover"
                                                />
                                                <span className="text-richblack-100 font-medium">
                                                    {user.firstName} {user.lastName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-richblack-300">{user.email}</td>
                                        <td className="px-5 py-3">
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                                user.accountType === "Student"
                                                    ? "bg-blue-800/50 text-blue-300"
                                                    : "bg-purple-800/50 text-purple-300"
                                            }`}>
                                                {user.accountType}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            {user.accountType === "Instructor" ? (
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColor[user.instructorStatus] || "bg-richblack-600 text-richblack-300"}`}>
                                                    {user.instructorStatus}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-richblack-500">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
