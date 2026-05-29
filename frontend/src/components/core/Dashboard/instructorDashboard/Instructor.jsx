import React, { useEffect, useState } from 'react'
import { getInstructorData } from '../../../../services/operations/profileAPI'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { Link } from 'react-router-dom'
import InstructorChart from './InstructorChart'
import { HiOutlineUsers, HiX } from "react-icons/hi"
import { RiMoneyDollarCircleLine } from "react-icons/ri"
import { FiBookOpen, FiTrendingUp, FiEdit } from "react-icons/fi"
import { MdPerson } from "react-icons/md"

// ─── Reusable Modal Shell ─────────────────────────────────────────────────────
function Modal({ title, subtitle, icon: Icon, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg mx-4 rounded-2xl border border-richblack-600 bg-richblack-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-richblack-700 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-yellow-50/10 text-yellow-50">
              <Icon size={20} />
            </div>
            <div>
              <p className="text-lg font-bold text-richblack-5">{title}</p>
              {subtitle && <p className="text-xs text-richblack-400">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-richblack-700 text-richblack-300 hover:bg-richblack-600 hover:text-richblack-5 transition-all"
          >
            <HiX size={16} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="max-h-[60vh] overflow-y-auto">{children}</div>

        {/* Footer */}
        <div className="border-t border-richblack-700 px-6 py-3 text-right">
          <button
            onClick={onClose}
            className="rounded-lg bg-richblack-700 px-5 py-2 text-sm font-semibold text-richblack-50 hover:bg-richblack-600 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Instructor() {
  const [loading, setLoading]           = useState(false)
  const [instructorData, setInstructorData] = useState(null)  // /instructorDashboard (populated students)
  const [courses, setCourses]           = useState([])         // /getInstructorCourses
  // activeModal: null | 'students' | 'income' | 'courses' | 'bestCourse'
  const [activeModal, setActiveModal]   = useState(null)

  const { token } = useSelector((state) => state.auth)
  const { user }  = useSelector((state) => state.profile)

  useEffect(() => {
    const load = async () => {
      if (user?.accountType !== "Instructor") { setLoading(false); return }
      setLoading(true)
      const apiData = await getInstructorData(token)
      const result  = await fetchInstructorCourses(token)
      if (apiData) setInstructorData(apiData)
      if (result)  setCourses(result)
      setLoading(false)
    }
    load()
  }, []) // eslint-disable-line

  // ── Derived stats ──────────────────────────────────────────────────────────
  const totalAmount   = instructorData?.reduce((a, c) => a + (c.totalAmountGenerated || 0), 0) ?? 0
  const totalStudents = instructorData?.reduce((a, c) => a + (c.totalStudentsEnrolled || 0), 0) ?? 0

  const fmt = (v) => {
    const n = Number(v || 0)
    return Number.isFinite(n) ? n.toLocaleString("en-IN") : "0"
  }

  const bestCourse = Array.isArray(courses) && courses.length
    ? [...courses].sort((a, b) => (b?.studentsEnrolled?.length || 0) - (a?.studentsEnrolled?.length || 0))[0]
    : null

  const topCourses = Array.isArray(courses) && courses.length
    ? [...courses].sort((a, b) => (b?.studentsEnrolled?.length || 0) - (a?.studentsEnrolled?.length || 0)).slice(0, 5)
    : []

  const recentCourses = Array.isArray(courses) && courses.length
    ? [...courses].sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)).slice(0, 3)
    : []

  // ── Unique students from instructorData (backend now populates them) ────────
  const allStudents = (() => {
    if (!Array.isArray(instructorData)) return []
    const seen = new Set()
    const list = []
    instructorData.forEach((course) => {
      ;(course?.studentsEnrolled || []).forEach((s) => {
        const id = s?._id || String(s)
        if (!seen.has(id)) {
          seen.add(id)
          list.push({
            _id:        id,
            firstName:  s?.firstName || "",
            lastName:   s?.lastName  || "",
            email:      s?.email     || "",
            image:      s?.image     || null,
            courseName: course.courseName,
          })
        }
      })
    })
    return list
  })()

  // ── Card class helpers ─────────────────────────────────────────────────────
  const cardBase = "cursor-pointer rounded-xl border border-richblack-700 bg-richblack-800 p-5 transition-all duration-300 hover:scale-[1.03] hover:border-richblack-500 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
  const cardGold = "cursor-pointer rounded-xl border border-richblack-700 bg-richblack-800 p-5 transition-all duration-300 hover:scale-[1.03] hover:border-yellow-50/40 hover:shadow-[0_8px_24px_rgba(255,214,10,0.12)]"

  // ── Student row ────────────────────────────────────────────────────────────
  const StudentRow = ({ s, i }) => (
    <div
      key={s._id || i}
      className="flex items-center gap-4 rounded-xl border border-richblack-700 bg-richblack-900/50 px-4 py-3 transition-all hover:border-richblack-600 hover:bg-richblack-700/60"
    >
      {s.image ? (
        <img src={s.image} alt={s.firstName} className="h-10 w-10 rounded-full object-cover ring-2 ring-richblack-600" />
      ) : (
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-richblack-700 text-richblack-300 ring-2 ring-richblack-600">
          <MdPerson size={22} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-richblack-5">
          {s.firstName || s.lastName ? `${s.firstName} ${s.lastName}`.trim() : "Unknown Student"}
        </p>
        <p className="truncate text-xs text-richblack-400">{s.email || "No email"}</p>
      </div>
      <span className="shrink-0 rounded-full bg-yellow-50/10 px-2 py-0.5 text-[10px] font-semibold text-yellow-100 max-w-[110px] truncate">
        {s.courseName}
      </span>
    </div>
  )

  return (
    <div className="w-full text-white">

      {/* ══════════════════ MODAL: Total Students ══════════════════ */}
      {activeModal === "students" && (
        <Modal
          title="Enrolled Students"
          subtitle={`${allStudents.length} unique student${allStudents.length !== 1 ? "s" : ""} across all courses`}
          icon={HiOutlineUsers}
          onClose={() => setActiveModal(null)}
        >
          <div className="px-6 py-4 space-y-3">
            {allStudents.length === 0 ? (
              <div className="py-10 text-center text-richblack-400">
                <MdPerson size={40} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm font-medium">No students enrolled yet.</p>
              </div>
            ) : allStudents.map((s, i) => <StudentRow key={s._id || i} s={s} i={i} />)}
          </div>
        </Modal>
      )}

      {/* ══════════════════ MODAL: Total Income ══════════════════ */}
      {activeModal === "income" && (
        <Modal
          title="Income Breakdown"
          subtitle={`Total earned: Rs. ${fmt(totalAmount)}`}
          icon={RiMoneyDollarCircleLine}
          onClose={() => setActiveModal(null)}
        >
          <div className="px-6 py-4 space-y-3">
            {!instructorData || instructorData.length === 0 ? (
              <p className="py-10 text-center text-sm text-richblack-400">No income data yet.</p>
            ) : instructorData.map((c, i) => (
              <div
                key={c._id || i}
                className="flex items-center justify-between rounded-xl border border-richblack-700 bg-richblack-900/50 px-4 py-3 hover:border-richblack-600 hover:bg-richblack-700/60 transition-all"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-richblack-5">{c.courseName}</p>
                  <p className="text-xs text-richblack-400">
                    {c.totalStudentsEnrolled} student{c.totalStudentsEnrolled !== 1 ? "s" : ""}
                  </p>
                </div>
                <p className="ml-4 shrink-0 text-sm font-bold text-yellow-50">
                  Rs. {fmt(c.totalAmountGenerated)}
                </p>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* ══════════════════ MODAL: Total Courses ══════════════════ */}
      {activeModal === "courses" && (
        <Modal
          title="All Your Courses"
          subtitle={`${courses.length} course${courses.length !== 1 ? "s" : ""} created`}
          icon={FiBookOpen}
          onClose={() => setActiveModal(null)}
        >
          <div className="px-6 py-4 space-y-3">
            {courses.length === 0 ? (
              <p className="py-10 text-center text-sm text-richblack-400">No courses yet.</p>
            ) : courses.map((c, i) => {
              const isPublished = String(c?.status || "").toLowerCase() === "published"
              return (
                <div
                  key={c._id || i}
                  className="flex items-center gap-4 rounded-xl border border-richblack-700 bg-richblack-900/50 px-4 py-3 hover:border-richblack-600 hover:bg-richblack-700/60 transition-all"
                >
                  {c.thumbnail && (
                    <img src={c.thumbnail} alt={c.courseName} className="h-12 w-16 shrink-0 rounded-lg object-cover" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-richblack-5">{c.courseName}</p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-richblack-400">
                      <span>{c?.studentsEnrolled?.length || 0} students</span>
                      <span>•</span>
                      <span>Rs. {fmt(c.price)}</span>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      isPublished
                        ? "bg-caribbeangreen-700/20 text-caribbeangreen-200"
                        : "bg-yellow-100/10 text-yellow-100"
                    }`}
                  >
                    {c.status || "Draft"}
                  </span>
                </div>
              )
            })}
          </div>
        </Modal>
      )}

      {/* ══════════════════ MODAL: Best Course ══════════════════ */}
      {activeModal === "bestCourse" && (
        <Modal
          title="Best Performing Course"
          subtitle="Ranked by total enrollments"
          icon={FiTrendingUp}
          onClose={() => setActiveModal(null)}
        >
          <div className="px-6 py-4">
            {!bestCourse ? (
              <p className="py-10 text-center text-sm text-richblack-400">No enrollments yet.</p>
            ) : (
              <div className="space-y-4">
                {bestCourse.thumbnail && (
                  <img
                    src={bestCourse.thumbnail}
                    alt={bestCourse.courseName}
                    className="w-full h-40 rounded-xl object-cover"
                  />
                )}
                <div>
                  <p className="text-xl font-bold text-richblack-5">{bestCourse.courseName}</p>
                  {bestCourse.courseDescription && (
                    <p className="mt-1 text-sm text-richblack-300 line-clamp-3">{bestCourse.courseDescription}</p>
                  )}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Students", value: bestCourse?.studentsEnrolled?.length || 0 },
                    { label: "Price",    value: `Rs. ${fmt(bestCourse.price)}` },
                    { label: "Status",   value: bestCourse.status || "Draft" },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl border border-richblack-700 bg-richblack-900/50 p-3 text-center">
                      <p className="text-xs text-richblack-400">{label}</p>
                      <p className="mt-1 text-sm font-bold text-richblack-5">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Students enrolled in best course (from instructorData) */}
                {(() => {
                  const match    = instructorData?.find((d) => String(d._id) === String(bestCourse._id))
                  const enrolled = match?.studentsEnrolled || []
                  if (!enrolled.length) return null
                  return (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-richblack-300">Enrolled Students</p>
                      <div className="space-y-2 max-h-44 overflow-y-auto">
                        {enrolled.map((s, i) => (
                          <div key={s._id || i} className="flex items-center gap-3 rounded-lg bg-richblack-900/50 px-3 py-2">
                            {s.image ? (
                              <img src={s.image} alt={s.firstName} className="h-8 w-8 rounded-full object-cover" />
                            ) : (
                              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-richblack-700 text-richblack-400">
                                <MdPerson size={16} />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold text-richblack-5">
                                {s.firstName || s.lastName
                                  ? `${s.firstName} ${s.lastName}`.trim()
                                  : "Unknown Student"}
                              </p>
                              <p className="truncate text-[10px] text-richblack-400">{s.email || "No email"}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })()}

                <Link
                  to={`/dashboard/edit-course/${bestCourse._id}`}
                  onClick={() => setActiveModal(null)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-yellow-50 px-4 py-2.5 text-sm font-semibold text-richblack-900 hover:bg-yellow-25 transition-all"
                >
                  <FiEdit size={14} /> Edit Course
                </Link>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* ══════════════════ HEADER ══════════════════ */}
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-richblack-5">Hi {user?.firstName} 👋</h1>
          <p className="font-medium text-richblack-200">Here's what's happening with your courses today.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/dashboard/add-course"
            className="inline-flex items-center justify-center rounded-md bg-yellow-50 px-4 py-2 text-sm font-semibold text-richblack-900 hover:scale-[0.99] transition-all"
          >
            Create Course
          </Link>
          <Link
            to="/dashboard/my-courses"
            className="inline-flex items-center justify-center rounded-md border border-richblack-600 bg-richblack-800 px-4 py-2 text-sm font-semibold text-richblack-50 hover:bg-richblack-700 transition-all"
          >
            Manage Courses
          </Link>
        </div>
      </div>

      {/* ══════════════════ MAIN CONTENT ══════════════════ */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="spinner border-t-yellow-50" />
        </div>
      ) : courses.length > 0 ? (
        <div className="space-y-8">

          {/* ── KPI Cards (all 4 clickable) ── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* 1 — Total Students */}
            <div onClick={() => setActiveModal("students")} className={cardGold}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-richblack-300">Total Students</p>
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-richblack-700 text-yellow-50">
                  <HiOutlineUsers size={20} />
                </div>
              </div>
              <p className="mt-3 text-3xl font-bold text-richblack-5">{fmt(totalStudents)}</p>
              <p className="mt-1 text-xs text-richblack-400">Across all courses</p>
            </div>

            {/* 2 — Total Income */}
            <div onClick={() => setActiveModal("income")} className={cardBase}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-richblack-300">Total Income</p>
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-richblack-700 text-yellow-50">
                  <RiMoneyDollarCircleLine size={20} />
                </div>
              </div>
              <p className="mt-3 text-3xl font-bold text-richblack-5">Rs. {fmt(totalAmount)}</p>
              <p className="mt-1 text-xs text-richblack-400">Estimated from enrollments</p>
            </div>

            {/* 3 — Total Courses */}
            <div onClick={() => setActiveModal("courses")} className={cardBase}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-richblack-300">Total Courses</p>
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-richblack-700 text-yellow-50">
                  <FiBookOpen size={20} />
                </div>
              </div>
              <p className="mt-3 text-3xl font-bold text-richblack-5">{fmt(courses.length)}</p>
              <p className="mt-1 text-xs text-richblack-400">Draft + Published</p>
            </div>

            {/* 4 — Best Course */}
            <div onClick={() => setActiveModal("bestCourse")} className={cardBase}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-richblack-300">Best Course</p>
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-richblack-700 text-yellow-50">
                  <FiTrendingUp size={18} />
                </div>
              </div>
              <p className="mt-3 line-clamp-1 text-lg font-bold text-richblack-5">
                {bestCourse?.courseName || "—"}
              </p>
              <p className="mt-1 text-xs text-richblack-400">
                {bestCourse
                  ? `${bestCourse?.studentsEnrolled?.length || 0} students enrolled`
                  : "No enrollments yet"}
              </p>
            </div>
          </div>

          {/* ── Chart + Top Courses table ── */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              {totalAmount > 0 || totalStudents > 0 ? (
                <InstructorChart courses={instructorData || []} />
              ) : (
                <div className="flex h-[390px] flex-col items-center justify-center rounded-xl border border-richblack-700 bg-richblack-800 p-6">
                  <p className="text-lg font-bold text-richblack-5">Visualize</p>
                  <p className="mt-3 text-base font-medium text-richblack-200">Not enough data to visualize yet</p>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-richblack-5">Top Courses</p>
                <Link to="/dashboard/my-courses" className="text-xs font-semibold text-yellow-50 hover:underline">
                  View all
                </Link>
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border border-richblack-700">
                <div className="grid grid-cols-12 bg-richblack-700 px-3 py-2 text-xs font-semibold text-richblack-200">
                  <p className="col-span-7">Course</p>
                  <p className="col-span-2 text-right">Students</p>
                  <p className="col-span-3 text-right">Revenue</p>
                </div>
                <div className="divide-y divide-richblack-700">
                  {topCourses.map((c) => {
                    const s = c?.studentsEnrolled?.length || 0
                    return (
                      <div key={c?._id} className="grid grid-cols-12 items-center px-3 py-3">
                        <div className="col-span-7">
                          <p className="line-clamp-1 text-sm font-semibold text-richblack-5">{c?.courseName}</p>
                          <p className="mt-0.5 text-xs text-richblack-400">{c?.status || "Draft"}</p>
                        </div>
                        <p className="col-span-2 text-right text-sm text-richblack-100">{s}</p>
                        <p className="col-span-3 text-right text-sm text-richblack-100">
                          Rs. {fmt(s * (Number(c?.price) || 0))}
                        </p>
                      </div>
                    )
                  })}
                  {!topCourses.length && (
                    <div className="px-3 py-6 text-center text-sm text-richblack-300">
                      No course data available.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Recent Courses ── */}
          <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Recent Courses</p>
              <Link to="/dashboard/my-courses" className="text-xs font-semibold text-yellow-50 hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {recentCourses.map((course) => {
                const isPublished = String(course?.status || "").toLowerCase() === "published"
                return (
                  <div
                    key={course?._id}
                    className="overflow-hidden rounded-xl border border-richblack-700 bg-richblack-900/40"
                  >
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="h-[160px] w-full object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <p className="line-clamp-2 text-sm font-semibold text-richblack-5">
                          {course?.courseName}
                        </p>
                        <span
                          className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${
                            isPublished
                              ? "bg-caribbeangreen-700/20 text-caribbeangreen-200"
                              : "bg-yellow-100/10 text-yellow-100"
                          }`}
                        >
                          {course?.status || "Draft"}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-richblack-300">
                        <span>{course?.studentsEnrolled?.length || 0} students</span>
                        <span className="text-richblack-500">•</span>
                        <span>Rs. {fmt(course?.price || 0)}</span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Link
                          to={`/dashboard/edit-course/${course?._id}`}
                          className="flex-1 rounded-md bg-richblack-700 px-3 py-2 text-center text-xs font-semibold text-richblack-50 hover:bg-richblack-600 transition-all"
                        >
                          Edit
                        </Link>
                        <Link
                          to="/dashboard/my-courses"
                          className="flex-1 rounded-md border border-richblack-600 bg-richblack-800 px-3 py-2 text-center text-xs font-semibold text-richblack-50 hover:bg-richblack-700 transition-all"
                        >
                          Manage
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richblack-800 p-10 text-center">
          <p className="text-2xl font-bold text-richblack-5">You have not created any courses yet</p>
          <Link to="/dashboard/add-course">
            <p className="mt-3 text-lg font-semibold text-yellow-50 hover:underline">Create a course</p>
          </Link>
        </div>
      )}
    </div>
  )
}
