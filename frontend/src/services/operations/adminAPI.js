import { apiconnector } from "../apiconnector";
import { adminEndpoints } from "../apis";
import toast from "react-hot-toast";

const {
    GET_ADMIN_STATS_API,
    GET_PENDING_INSTRUCTORS_API,
    APPROVE_INSTRUCTOR_API,
    REJECT_INSTRUCTOR_API,
    GET_ALL_USERS_API,
    GET_ALL_COURSES_ADMIN_API,
    DELETE_COURSE_ADMIN_API,
} = adminEndpoints;

// ─── GET ADMIN DASHBOARD STATS ───────────────────────────────────────────────
export const getAdminStats = async (token) => {
    let result = null;
    try {
        const response = await apiconnector("GET", GET_ADMIN_STATS_API, null, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) throw new Error(response?.data?.message);
        result = response.data.data;
    } catch (error) {
        toast.error("Failed to load admin stats");
        console.log("getAdminStats ERROR:", error);
    }
    return result;
};

// ─── GET PENDING INSTRUCTORS ──────────────────────────────────────────────────
export const getPendingInstructors = async (token) => {
    let result = [];
    try {
        const response = await apiconnector("GET", GET_PENDING_INSTRUCTORS_API, null, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) throw new Error(response?.data?.message);
        result = response.data.data;
    } catch (error) {
        toast.error("Failed to load pending instructors");
        console.log("getPendingInstructors ERROR:", error);
    }
    return result;
};

// ─── APPROVE INSTRUCTOR ───────────────────────────────────────────────────────
export const approveInstructor = async (token, instructorId) => {
    let success = false;
    const toastId = toast.loading("Approving instructor...");
    try {
        const response = await apiconnector(
            "PUT",
            `${APPROVE_INSTRUCTOR_API}/${instructorId}`,
            null,
            { Authorization: `Bearer ${token}` }
        );
        if (!response?.data?.success) throw new Error(response?.data?.message);
        toast.success("Instructor approved! Approval email sent.");
        success = true;
    } catch (error) {
        toast.error("Failed to approve instructor");
        console.log("approveInstructor ERROR:", error);
    }
    toast.dismiss(toastId);
    return success;
};

// ─── REJECT INSTRUCTOR ────────────────────────────────────────────────────────
export const rejectInstructor = async (token, instructorId, reason = "") => {
    let success = false;
    const toastId = toast.loading("Rejecting instructor...");
    try {
        const response = await apiconnector(
            "PUT",
            `${REJECT_INSTRUCTOR_API}/${instructorId}`,
            { reason },
            { Authorization: `Bearer ${token}` }
        );
        if (!response?.data?.success) throw new Error(response?.data?.message);
        toast.success("Instructor rejected. Rejection email sent.");
        success = true;
    } catch (error) {
        toast.error("Failed to reject instructor");
        console.log("rejectInstructor ERROR:", error);
    }
    toast.dismiss(toastId);
    return success;
};

// ─── GET ALL USERS ────────────────────────────────────────────────────────────
export const getAllUsers = async (token, accountType = "") => {
    let result = [];
    try {
        const url = accountType
            ? `${GET_ALL_USERS_API}?accountType=${accountType}`
            : GET_ALL_USERS_API;
        const response = await apiconnector("GET", url, null, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) throw new Error(response?.data?.message);
        result = response.data.data;
    } catch (error) {
        toast.error("Failed to load users");
        console.log("getAllUsers ERROR:", error);
    }
    return result;
};

// ─── GET ALL COURSES (Admin) ──────────────────────────────────────────────────
export const getAllCoursesAdmin = async (token) => {
    let result = [];
    try {
        const response = await apiconnector("GET", GET_ALL_COURSES_ADMIN_API, null, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) throw new Error(response?.data?.message);
        result = response.data.data;
    } catch (error) {
        toast.error("Failed to load courses");
        console.log("getAllCoursesAdmin ERROR:", error);
    }
    return result;
};

// ─── DELETE COURSE (Admin) ─────────────────────────────────────────────────────
export const deleteCourseAdmin = async (token, courseId) => {
    let success = false;
    const toastId = toast.loading("Deleting course...");
    try {
        const response = await apiconnector(
            "DELETE",
            `${DELETE_COURSE_ADMIN_API}/${courseId}`,
            null,
            { Authorization: `Bearer ${token}` }
        );
        if (!response?.data?.success) throw new Error(response?.data?.message);
        toast.success("Course deleted successfully");
        success = true;
    } catch (error) {
        toast.error("Failed to delete course");
        console.log("deleteCourseAdmin ERROR:", error);
    }
    toast.dismiss(toastId);
    return success;
};
