// aa final code che je run pn thai che
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { Iconbtn } from '../../common/Iconbtn';

// export const VideoDetailsSlidebar = ({setReviewModal}) => {
//     const [activeStatus,setActiveStatus] = useState("");
//     const [videoBarActive,setVideoBarActive] = useState("");
//     const navigate = useNavigate();
//     const {sectionId,subSectionId} = useParams();
//     const {
//         courseSectionData,
//         courseEntireData,
//         totalNoOfLectures,
//         completedLectures}=useSelector((state)=>state.viewCourse);
//     const location = useLocation();
//         console.log("COURSEsECTIONdTATA",courseSectionData);
//         console.log("COURSEENTIREDATA",courseEntireData);
//         console.log("TOTALNOOFLECTURE",totalNoOfLectures);
//         console.log("COMPLETEDLECTURE",completedLectures);

//     useEffect(()=>{
//         const setActiveFlags = () => {
//             //section ni ander data na hoi to kai nai thai aetle khali return kari do
//             if(!courseSectionData.length)
//             {
//                 console.log("data Not available");

//                 return;
//             }
//             //niche ni syntax thi current section na data find kari sakisu
//             const currentSectionIndex = courseSectionData.findIndex(
//                 (data)=>data._id === sectionId
//             )
            
//             //niche ni syntax thi current sub-section na data find kari sakisu
//             const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
//                 (data)=>data._id === subSectionId
//             )

//             //niche nu aapdanr currect video batavse
//             const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id;

//             //set  current section here
//             setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
//             //set current sub-section here
//             setVideoBarActive(activeSubSectionId)
            
//         }
//         setActiveFlags();
//     // location.pathname NO USE AETLA MATE KARYO CHE KE MARI URL CHANGE THAI (MEANS HU BIJA KOI COURSE PR CLICK KARU) TAYARE PN AA FUNCTION CALL THAI
//     },[courseSectionData,courseEntireData,location.pathname])    
//   return (
//     <>
//         <div className='text-white'>
//             {/* for button and heading  */}
//             <div>
//                 {/* for button  */}
//                 <div>
//                     <div onClick={()=>navigate("/dashboard/enrolled-courses")}>
//                         Back
//                     </div>
//                     <div>
//                         <Iconbtn text="Add Review"
//                                  onClick={()=>setReviewModal(true)}
//                         />
//                     </div>
//                 </div>
//                 {/* for heading  */}
//                 <div>
//                         <p>{courseEntireData?.courseName}</p>
//                         <p>{completedLectures?.length}/{totalNoOfLectures}</p>
//                 </div>
//             </div>

//             {/* for section and sub-section  */}
//             <div>
//                 {
//                     courseSectionData?.map((course,index)=>(
//                         <div onClick={()=>setActiveStatus(course?._id)} key={index}>
//                             {/* section */}
//                             <div>
//                                 <div>
//                                     {course?.sectionName}
//                                 </div>
//                                 {/* Add Arow Icon  */}
//                             </div> 

//                             {/* sub-section  */}
//                             <div>
//                                 {
//                                     activeStatus === course?._id && (
//                                         <div>
//                                             {
//                                                 course.subSection.map((topic,index)=>(
//                                                     <div className={`flex gap-4 p-5 
//                                                     ${videoBarActive === topic._id 
//                                                     ? "bg-yellow-200 text-richblack-900" 
//                                                     :"bg-richblack-900 text-white"}`} 
//                                                     key={index}
//                                                     onClick={()=>{navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`)
//                                                     setVideoBarActive(topic?._id);
//                                                     }}
                                                    
//                                                     >

//                                                         <input type='checkbox'
//                                                             checked={completedLectures.includes(topic?._id)}
//                                                             onChange={()=>{}}
//                                                         />

//                                                         <span>
//                                                             {topic.title}
//                                                         </span>
//                                                     </div>
//                                                 ))
//                                             }
//                                         </div>
//                                     )
//                                 }
//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     </>
//   )
// }


//aa code ma styleing aaply kareli che
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";
import { Iconbtn } from "../../common/Iconbtn";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  // --- Set Active Section/Subsection ---
  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) return;

      const currentSectionIndex = courseSectionData?.findIndex(
        (data) => data?._id === sectionId
      );

      const currentSubSectionIndex =
        courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
          (data) => data._id === subSectionId
        );

      const activeSubSectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    };

    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId]);

  // --- Component UI ---
  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-richblack-700 bg-richblack-800">
      {/* -------- Header -------- */}
      <div className="mx-5 flex flex-col justify-between gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
        {/* Back + Review */}
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex items-center gap-2 rounded-full bg-richblack-100 px-3 py-2 text-sm font-semibold text-richblack-900 hover:scale-95 transition-all"
          >
            <IoIosArrowBack size={20} />
            <span>Back</span>
          </button>

          <Iconbtn text="Add Review" onClick={() => setReviewModal(true)} />
        </div>

        {/* Course Info */}
        <div>
          <p>{courseEntireData?.courseName}</p>
          <p className="text-sm font-semibold text-richblack-500">
            {completedLectures?.length} / {totalNoOfLectures} completed
          </p>
        </div>
      </div>

      {/* -------- Sections & Sub-sections -------- */}
      <div className="h-[calc(100vh-5rem)] overflow-y-auto">
        {courseSectionData?.map((course, index) => (
          <div key={index} className="mt-2 text-sm text-richblack-5">
            {/* Section Header */}
            <div
              onClick={() =>
                setActiveStatus(activeStatus === course?._id ? "" : course?._id)
              }
              className="flex flex-row justify-between bg-richblack-600 px-5 py-4 cursor-pointer"
            >
              <div className="w-[70%] font-semibold">{course?.sectionName}</div>
              <div className="flex items-center gap-3">
                <span
                  className={`transition-all duration-500 ${
                    activeStatus === course?._id ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <BsChevronDown />
                </span>
              </div>
            </div>

            {/* Subsections */}
            {activeStatus === course?._id && (
              <div className="transition-all duration-500 ease-in-out">
                {course?.subSection?.map((topic, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 px-5 py-3 cursor-pointer transition-all duration-300 rounded-md ${
                      videoBarActive === topic._id
                        ? "bg-yellow-200 text-richblack-900 font-semibold"
                        : "bg-richblack-900 text-white hover:bg-richblack-700"
                    }`}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures?.includes(topic?._id)}
                      readOnly
                      className="accent-yellow-300 w-4 h-4"
                    />
                    <span>{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
