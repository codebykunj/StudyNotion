import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import { Iconbtn } from '../../common/Iconbtn';
import { RiAddCircleFill } from 'react-icons/ri';
import { CourseTable } from './InstructorCourses/CourseTable';

export const MyCourses = () => {
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const [courses,setCourses] = useState();

useEffect(()=>{
        const fetchCourses = async () => {
          // Role check: Skip for non-instructors to prevent 401 error
          if (!token || user?.accountType !== "Instructor") {
            setCourses([])
            return
          }
          
          const result = await fetchInstructorCourses(token)
          if (result) {
            setCourses(result)
          }
        }
        fetchCourses()
    }, [token])

  return (
    <div className='text-white px-6 py-4 '>
        <div className='mb-14 flex items-center justify-between'>
            <h1 className='text-3xl font-medium text-richblack-5'>My Courses</h1>
            <Iconbtn text="Add Courses"
                onClick = {()=>navigate("/dashboard/add-course")}
            >
            <RiAddCircleFill fontSize={22}/>
            </Iconbtn>
        </div>

        {/* course/courseTable tayare j dekhado /dashboard/my-course jayare aa instructore create karela course exists karta hoi */}
        {
            courses && <CourseTable courses={courses} setCourses={setCourses}/>
        }
    </div>
  )
}

// import React from 'react'

// export const MyCourses = () => {
//   return (
//     <div className='text-white'>MyCourses</div>
//   )
// }
