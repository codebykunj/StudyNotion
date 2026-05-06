import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { COURSE_STATUS } from "../../../../utils/constants"
import {
  fetchInstructorCourses,
  deleteCourse,
} from "../../../../services/operations/courseDetailsAPI"
import { formatDate } from "../../../../utils/formatDate"
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { HiClock } from "react-icons/hi"
import { FaCheck } from "react-icons/fa"
import ConfirmationModal from "../../../common/ConfirmationModal"
import { useNavigate } from "react-router-dom"

export const CourseTable = ({ courses, setCourses }) => {

  const navigate = useNavigate()
  const { token, user } = useSelector((state) => ({
    token: state.auth.token,
    user: state.profile.user
  }))
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId }, token)
    
    // Role check: Skip refresh for non-instructors
    if (user?.accountType === "Instructor") {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    
    setLoading(false)
    setConfirmationModal(null)
  }

  return (
    <>
      <Table className="rounded-xl border border-richblack-800 w-full overflow-hidden">
        {/* Table Header */}
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 bg-richblack-800 px-6 py-3">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>

        {/* Table Body */}
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
              </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8 transition-all duration-200 hover:bg-richblack-700/40"
              >
                {/* Course Info */}
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300 leading-relaxed">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-richblack-200">
                      Created: {formatDate(course.createdAt)}
                    </p>

                    {/* Status Badge */}
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="mt-1 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-3 py-[3px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="mt-1 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-3 py-[3px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </Td>

                {/* Duration */}
                <Td className="text-sm font-medium text-richblack-100">
                  2 hr 30 min
                </Td>

                {/* Price */}
                <Td className="text-sm font-medium text-richblack-100">
                  ₹{course.price}
                </Td>

                {/* Actions */}
                <Td className="flex items-center gap-3 text-sm font-medium text-richblack-100">
                  <button
                    disabled={loading}
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                    title="Edit"
                    className="rounded-md px-2 py-1 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>

                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All data related to this course will be permanently deleted.",
                        btn1Text: !loading ? "Delete" : "Loading...",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="rounded-md px-2 py-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}


    </>
  )
}









