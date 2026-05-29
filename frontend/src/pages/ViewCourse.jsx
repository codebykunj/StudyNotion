// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Outlet, useParams } from 'react-router-dom';
// import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
// import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
// import { VideoDetailsSlidebar } from '../components/core/ViewCourse/VideoDetailsSlidebar';
// // import { CourseReviewModal } from '../components/core/ViewCourse/CourseReviewModal';
// import  CourseReviewModal  from '../components/core/ViewCourse/CourseReviewModal';

// export const ViewCourse = () => {

//     const [reviewModal,setReviewModal] = useState(false);
//     const {courseId} = useParams();
//     const {token} = useSelector((state)=>state.auth);
//     const dispatch = useDispatch();

//     useEffect(()=>{
//         const setCourseSpecificDetails = async() => {
//             const courseData = await getFullDetailsOfCourse(courseId,token);
//             dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
//             dispatch(setEntireCourseData(courseData?.courseDetails));
//             dispatch(setCompletedLectures(courseData?.completedVideos));
//             let lectures = 0;
//             courseData?.courseDetails?.courseContent?.forEach((sec)=>{
//                 lectures += sec.subSection.length
//             })
//             dispatch(setTotalNoOfLectures(lectures));
//         }
//         setCourseSpecificDetails();
//     },[courseId,token])  //[] lakhvano matlab ke first render ma aa api ne call kari dejo

//   return (
//     <>
//         <div className='text-white  flex relative'>
//             {/* aa sidebar show karse */}
//             <VideoDetailsSlidebar setReviewModal={setReviewModal}/>
//             {/* aa sider bar ni baju ma je video aave che te video show karse  */}
//             <div>
//                 <Outlet/>
//             </div>
//         </div>
//         {/* aagar aapke review modal ma data pada hai to tum CourseReviewModal ko render karavi do  */}
       
//         {/* <CourseReviewModal setReviewModal={setReviewModal}/> */}
//         {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
//     </>
//   )
// }

//niche no code upper jevo che pn tema styling apply kareli che
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import  VideoDetailsSlidebar  from "../components/core/ViewCourse/VideoDetailsSlidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import DiscussionForum from "../components/core/ViewCourse/DiscussionForum";

export const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent || []));
      dispatch(setEntireCourseData(courseData?.courseDetails || {}));
      dispatch(setCompletedLectures(courseData?.completedVideos || []));

      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec?.subSection?.length || 0;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };

    setCourseSpecificDetails();
  }, [courseId, token, dispatch]);

  return (
    <>
      {/* Main layout */}
      <div className="relative flex min-h-[calc(100vh-3.5rem)] text-white">
        {/* Sidebar */}
        <VideoDetailsSlidebar setReviewModal={setReviewModal} />

        {/* Main Video/Content Area */}
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
            <div className="mt-10 mb-20">
              <DiscussionForum courseId={courseId} />
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};
