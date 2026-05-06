// final code je rin thai che
// import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
// import { setCompletedLectures, updateCompletedLectures } from '../../../slices/viewCourseSlice';
// import { Player } from 'video-react';
// // import '~video-react/dist/video-react.css'; 
// import { AiFillPlayCircle } from 'react-icons/ai';
// import { Iconbtn } from '../../common/Iconbtn';

// export const VideoDetails = () => {

//   const {courseId,sectionId,subSectionId} = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const playerRef = useRef();
//   const {token} = useSelector((state)=>state.auth);
//   const {courseSectionData,courseEntireData,completedLectures} = useSelector((state)=>state.viewCourse);

//   const [videoData,setVideoData] = useState([null]);
//   const [videoEnded,setVideoEnded] = useState(false);
//   const [loading,setLoading] = useState(false);

//   useEffect(()=>{
//   const setVideoSpecificDetails = async() => {
//     //aagar data na hoi to return kari do
//     if(!courseSectionData.length){
//       console.log("Data Nahi aaya Hai");
//       return;
//     }

//     if(!courseId || !sectionId || !subSectionId){
//       navigate("/dashboard/enrolled-courses");
//     }
//     else{
//       //let's assume all three fields are present
//       const filteredData = courseSectionData.filter(
//         (course) => course._id === sectionId 
//       )

//       //niche na thi aapde exact video nikadi ne lavisu
//       const filteredVideoData = filteredData?.[0]?.subSection.filter(
//         (data) => data._id === subSectionId
//       )

//       setVideoData(filteredVideoData[0]);
//       setVideoEnded(false);
//     }

//   }
//   setVideoSpecificDetails();
//   },[courseSectionData,courseEntireData,location.pathname])
  
//   const isFirstVideo = () => {
    
//       const currentSectionIndex = courseSectionData.findIndex(
//         (data)=>data._id === sectionId
//       )

//       const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
//         (data) => data._id === subSectionId
//       )

//       if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
//         return true;
//       }
//       else{
//         return false;
//       }
//   }

//   const isLastVideo = () => {
//         const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     if (
//       currentSectionIndx === courseSectionData.length - 1 &&
//       currentSubSectionIndx === noOfSubsections - 1
//     ) {
//       return true
//     } else {
//       return false
//     }

//   }

//   const goToNextVideo = () => {
//      // console.log(courseSectionData)

//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     // console.log("no of subsections", noOfSubsections)

//     if (currentSubSectionIndx !== noOfSubsections - 1) {
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx + 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
//       )
//     } else {
//       const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx + 1].subSection[0]._id
//       navigate(
//         `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
//       )
//     }
//   }

//   const goToPrevVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     if (currentSubSectionIndx !== 0) {
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx - 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
//       )
//     } else {
//       const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
//       const prevSubSectionLength =
//         courseSectionData[currentSectionIndx - 1].subSection.length
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx - 1].subSection[
//           prevSubSectionLength - 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
//       )
//     }
//   }

//   const handelLectureCompletion = async() => {
//     //dummy code,baad me we will replace it with the actual call
//     setLoading(true);
//     const res = await markLectureAsComplete(
//       {courseId:courseId,subSectionId:subSectionId},token
//     )

//     //state update
//     if(res){
//       dispatch(updateCompletedLectures(subSectionId));
//     }


//     setLoading(false);

//   }



//   return (
//     <div className='text-white'>
//       {
//         //aagar mere pass videoData nai hai to..
//         !videoData ? (<div>No Data Found</div>) 
//                    :(<div>
//                    {/*video ne show/play kar va aapde video-react no use karisu teme aapde Player component no use karisu video show/play karva  */}
//                         <Player
//                           ref = {playerRef}
//                           aspectRatio="16:9"
//                           playsInline
//                           onEnded={()=>setVideoEnded(true)}
//                           src={videoData?.videoUrl}>
                            
//                             <AiFillPlayCircle/>
//                             {
//                               //mari video end thi jase tayare aa logic execute thase
//                               videoEnded && (
//                                 <div>
//                                   {
//                                     //aapde je video complete nai hoi pele thi tena mate j mark as completed vadu button dekhasi su..je video pele thi completed che tena mare aapde mark as completed no option nai batadi ye
//                                     !completedLectures.includes(subSectionId) && (
//                                       <Iconbtn
//                                         disabled={loading}
//                                         onClick={() => handelLectureCompletion()}
//                                         text={!loading ? "Mark As Completed" : "Loading..."}
//                                       />
//                                     )
//                                   }


//                                   <Iconbtn
//                                     disabled={loading}
//                                     onClick={()=>{
//                                       if(playerRef?.current){
//                                           playerRef?.current?.seek(0);
//                                           setVideoEnded(false);
//                                       }
//                                     }}
//                                     text="Rewatch"
//                                     customClasses='text-xl'/>

//                                   <div>
//                                     {
//                                       //aagar peli video nai hoi to j hu Previous nu button dekhadis
//                                       !isFirstVideo() && (
//                                           <button disabled={loading}
//                                           onClick={goToPrevVideo}
//                                           className='bg-yellow-50 p-2 rounded-md font-bold text-richblack-800'>
//                                               Previous
//                                           </button>
//                                       )
//                                     }

//                                     {/*aagar last video nahi hai to j hu Next nu button dekhadis  */}
//                                     {
//                                       !isLastVideo() && <button  disabled={loading}
//                                           onClick={goToNextVideo}
//                                           className='bg-yellow-50 p-2 rounded-md font-bold text-richblack-800'>
//                                             Next
//                                       </button>
//                                     }
//                                   </div>
                                   
//                                 </div>
//                               )
//                             }

//                         </Player>
//                     </div>)
//       }

//       <h1>{videoData?.title}</h1>
//       <p>{videoData?.description}</p>
//     </div>
//   )
// }

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { setCompletedLectures, updateCompletedLectures } from '../../../slices/viewCourseSlice';
import ReactPlayer from 'react-player';
import { AiFillPlayCircle } from 'react-icons/ai';
import { Iconbtn } from '../../common/Iconbtn';
import SectionQuiz from './SectionQuiz';


export const VideoDetails = () => {

  const {courseId,sectionId,subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const {token} = useSelector((state)=>state.auth);
  const {courseSectionData,courseEntireData,completedLectures} = useSelector((state)=>state.viewCourse);

  const [videoData,setVideoData] = useState(null);
  const [videoEnded,setVideoEnded] = useState(false);
  const [loading,setLoading] = useState(false);
  const [playerError, setPlayerError] = useState(null);

  // Some APIs/UI paths may return the video URL under slightly different keys.
  // This makes the player resilient and prevents blank players when `videoUrl` is missing.
  const rawVideoUrl =
    videoData?.videoUrl ??
    videoData?.video ??
    videoData?.lectureVideoUrl ??
    videoData?.lectureVideo;

  const playerUrl =
    typeof rawVideoUrl === "string"
      ? rawVideoUrl.trim().replace(/^"+|"+$/g, "")
      : rawVideoUrl?.secure_url ?? rawVideoUrl?.url ?? "";

  const normalizedPlayerUrl = (() => {
    if (!playerUrl || typeof playerUrl !== "string") return "";
    const url = playerUrl.trim();
    if (!url) return "";

    try {
      const u = new URL(url);
      const host = u.hostname.replace(/^www\./, "");

      if (host === "youtu.be") {
        const id = u.pathname.split("/").filter(Boolean)[0];
        return id ? `https://www.youtube.com/watch?v=${id}` : url;
      }

      if (host === "youtube.com" || host === "m.youtube.com") {
        const id = u.searchParams.get("v");
        return id ? `https://www.youtube.com/watch?v=${id}` : url;
      }

      return url;
    } catch {
      return url;
    }
  })();

  const isYouTubeUrl = (u) => {
    if (!u) return false;
    const s = String(u).toLowerCase();
    return s.includes("youtube.com") || s.includes("youtu.be");
  };

  const isYouTube = isYouTubeUrl(normalizedPlayerUrl) || isYouTubeUrl(playerUrl);

  const getYouTubeEmbedUrl = (u) => {
    if (!u) return "";
    const url = String(u).trim();
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace(/^www\./, "").toLowerCase();

      let id = "";
      if (host === "youtu.be") {
        id = parsed.pathname.split("/").filter(Boolean)[0] || "";
      } else if (host === "youtube.com" || host === "m.youtube.com") {
        id = parsed.searchParams.get("v") || "";
      }

      if (!id) return "";
      const params = new URLSearchParams({
        rel: "0",
        playsinline: "1",
      });
      return `https://www.youtube.com/embed/${id}?${params.toString()}`;
    } catch {
      return "";
    }
  };

  useEffect(()=>{
  const setVideoSpecificDetails = async() => {
    //aagar data na hoi to return kari do
    if(!courseSectionData.length){
      console.log("Data Nahi aaya Hai");
      return;
    }

    if(!courseId || !sectionId || !subSectionId){
      navigate("/dashboard/enrolled-courses");
    }
    else{
      //let's assume all three fields are present
      const filteredData = courseSectionData.filter(
        (course) => course._id === sectionId 
      )

      //niche na thi aapde exact video nikadi ne lavisu
      const filteredVideoData = filteredData?.[0]?.subSection?.filter(
        (data) => data._id === subSectionId
      )

      setVideoData(filteredVideoData?.[0]);
      setVideoEnded(false);
    }

  }
  setVideoSpecificDetails();
  },[courseSectionData,courseEntireData,location.pathname])

  // Reset error state when the lecture changes.
  useEffect(() => {
    setPlayerError(null);
    setVideoEnded(false);
  }, [subSectionId]);
  
  const isFirstVideo = () => {
    
      const currentSectionIndex = courseSectionData?.findIndex(
        (data)=>data?._id === sectionId
      )

      const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
        (data) => data._id === subSectionId
      )

      if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
        return true;
      }
      else{
        return false;
      }
  }

  const isLastVideo = () => {
        const currentSectionIndx = courseSectionData?.findIndex(
      (data) => data?._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx]?.subSection?.length || 0

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId)

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }

  }

  const goToNextVideo = async () => {
    // Automatically mark current video as completed when moving to next
    if (!completedLectures?.includes(subSectionId)) {
      await handelLectureCompletion();
    }

     // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData?.findIndex(
      (data) => data?._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx]?.subSection?.length || 0

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId)

    // console.log("no of subsections", noOfSubsections)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData?.findIndex(
      (data) => data?._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  const handelLectureCompletion = async() => {
    setLoading(true);
    const res = await markLectureAsComplete(
      {courseId:courseId,subSectionId:subSectionId},token
    )

    //state update
    if(res){
      dispatch(updateCompletedLectures(subSectionId));
    }


    setLoading(false);

  }



  return (
    <div className="flex flex-col gap-5 text-white">
      {
        //aagar mere pass videoData nai hai to..
        !videoData ? (<div>No Data Found</div>) 
                   :(<div>
                   {
                        <div className="w-full relative h-[70vh] rounded-xl overflow-hidden shadow-lg border border-richblack-700 bg-black">
                          {!playerUrl ? (
                            <div className="absolute inset-0 z-[10] grid place-content-center px-4 text-sm text-richblack-5">
                              Video URL not available for this lecture.
                            </div>
                          ) : (
                            <>
                              {isYouTube ? (
                                <iframe
                                  key={subSectionId}
                                  src={getYouTubeEmbedUrl(normalizedPlayerUrl || playerUrl)}
                                  title={videoData?.title || "Course lecture video"}
                                  className="absolute top-0 left-0 h-full w-full"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              ) : (
                                <video
                                  key={`${subSectionId}-native`}
                                  src={normalizedPlayerUrl || playerUrl}
                                  controls
                                  className="absolute top-0 left-0 h-full w-full object-contain"
                                  onEnded={() => setVideoEnded(true)}
                                  onError={(e) => {
                                    console.log("HTML5 <video> error:", e, {
                                      playerUrl,
                                      normalizedPlayerUrl,
                                      subSectionId,
                                      videoData,
                                    });
                                    setPlayerError(e);
                                  }}
                                />
                              )}
                            </>
                          )}
                            {
                              videoEnded && (
                                <div style={{
                                backgroundImage:
                                "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                              }}
                              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
                                  <Iconbtn
                                    disabled={loading}
                                    onClick={()=>{
                                      if(playerRef?.current){
                                          playerRef?.current?.seekTo(0);
                                          setVideoEnded(false);
                                      }
                                    }}
                                    text="Rewatch"
                                    customClasses="text-xl max-w-max px-4 mx-auto mt-2"/>

                                  <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                    {
                                      !isFirstVideo() && (
                                          <button disabled={loading}
                                          onClick={goToPrevVideo}
                                          className='bg-yellow-50 px-4 py-2 rounded-md font-bold text-richblack-800 hover:scale-95 transition-all duration-200'>
                                              Previous
                                          </button>
                                      )
                                    }

                                    {
                                      !isLastVideo() && <button  disabled={loading}
                                          onClick={goToNextVideo}
                                          className='bg-yellow-50 px-4 py-2 rounded-md font-bold text-richblack-800 hover:scale-95 transition-all duration-200'>
                                            Next
                                      </button>
                                    }
                                  </div>
                                </div>
                              )
                            }
                        </div>
                   }
                   </div>)
      }

      {playerError && (
        <p className="mt-2 text-sm text-pink-200">
          Video failed to load. Check console for details.
        </p>
      )}

      <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">{videoData?.title}</h1>
        {!completedLectures?.includes(subSectionId) ? (
          <Iconbtn
            disabled={loading}
            onClick={() => handelLectureCompletion()}
            text={!loading ? "Mark As Completed" : "Loading..."}
            customClasses="text-xl"
          />
        ) : (
          <span className="text-caribbeangreen-200 font-semibold text-lg flex items-center gap-2">
            ✓ Completed
          </span>
        )}
      </div>
      <p className="pt-2 pb-6">{videoData?.description}</p>

      {/* ── Section Quiz Gate ── show quiz after last video in the section */}
      {(() => {
        const currentSectionIdx = courseSectionData?.findIndex((d) => d._id === sectionId);
        if (currentSectionIdx === -1 || currentSectionIdx === undefined) return null;
        const section = courseSectionData[currentSectionIdx];
        if (!section) return null;
        const noOfSubSections = section.subSection?.length || 0;
        const currentSubIdx = section.subSection?.findIndex((d) => d._id === subSectionId);
        const isLastInSection = currentSubIdx === noOfSubSections - 1;
        if (!isLastInSection) return null;
        return (
          <SectionQuiz
            key={sectionId}
            sectionId={sectionId}
            courseId={courseId}
            onQuizPassed={() => console.log("Quiz passed for section:", sectionId)}
          />
        );
      })()}
    </div>
  )
}






//niche no code upper jevo j che pn aama styleing apply kareli che
// import React, { useEffect, useRef, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useLocation, useNavigate, useParams } from "react-router-dom"
// import { Player, BigPlayButton } from "video-react"
// import "video-react/dist/video-react.css"
// import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
// import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
// import { Iconbtn } from "../../common/Iconbtn"

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams()
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const location = useLocation()
//   const playerRef = useRef()
//   const { token } = useSelector((state) => state.auth)
//   const { courseSectionData, courseEntireData, completedLectures } = useSelector(
//     (state) => state.viewCourse
//   )

//   const [videoData, setVideoData] = useState(null)
//   const [videoEnded, setVideoEnded] = useState(false)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const setVideoSpecificDetails = async () => {
//       if (!courseSectionData.length) return

//       if (!courseId || !sectionId || !subSectionId) {
//         navigate("/dashboard/enrolled-courses")
//       } else {
//         const filteredData = courseSectionData.filter(
//           (course) => course._id === sectionId
//         )
//         const filteredVideoData = filteredData?.[0]?.subSection.filter(
//           (data) => data._id === subSectionId
//         )
//         setVideoData(filteredVideoData[0])
//         setVideoEnded(false)
//       }
//     }
//     setVideoSpecificDetails()
//   }, [courseSectionData, courseEntireData, location.pathname])

//   const isFirstVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )
//     const currentSubSectionIndex = courseSectionData[
//       currentSectionIndex
//     ]?.subSection.findIndex((data) => data._id === subSectionId)

//     return currentSectionIndex === 0 && currentSubSectionIndex === 0
//   }

//   const isLastVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )
//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length
//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     return (
//       currentSectionIndx === courseSectionData.length - 1 &&
//       currentSubSectionIndx === noOfSubsections - 1
//     )
//   }

//   const goToNextVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )
//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length
//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     if (currentSubSectionIndx !== noOfSubsections - 1) {
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx + 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
//       )
//     } else {
//       const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx + 1].subSection[0]._id
//       navigate(
//         `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
//       )
//     }
//   }

//   const goToPrevVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )
//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     if (currentSubSectionIndx !== 0) {
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx - 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
//       )
//     } else {
//       const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
//       const prevSubSectionLength =
//         courseSectionData[currentSectionIndx - 1].subSection.length
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx - 1].subSection[
//           prevSubSectionLength - 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
//       )
//     }
//   }

//   const handleLectureCompletion = async () => {
//     setLoading(true)
//     const res = await markLectureAsComplete(
//       { courseId: courseId, subsectionId: subSectionId },
//       token
//     )
//     if (res) dispatch(updateCompletedLectures(subSectionId))
//     setLoading(false)
//   }

//   return (
//     <div className="flex flex-col gap-6 text-white px-6 pl-24 md:px-16 py-6">
//       {/* ---------- Video Section ---------- */}
//       {!videoData ? (
//         <div className="text-center text-lg text-gray-400">No Data Found</div>
//       ) : (
//         <div className="w-full h-[70vh] rounded-xl overflow-hidden shadow-lg">
//           <Player
//             ref={playerRef}
//             playsInline
//             aspectRatio="16:9"
//             className="w-full h-full object-cover"
//             onEnded={() => setVideoEnded(true)}
//             src={videoData?.videoUrl}
//           >
//             <BigPlayButton position="center" />
//             {/* Overlay when video ends */}
//             {videoEnded && (
//               <div
//                 className="absolute inset-0 z-[100] grid h-full place-content-center font-inter"
//                 style={{
//                   backgroundImage:
//                     "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
//                 }}
//               >
//                 {!completedLectures.includes(subSectionId) && (
//                   <Iconbtn
//                     disabled={loading}
//                     onClick={handleLectureCompletion}
//                     text={!loading ? "Mark As Completed" : "Loading..."}
//                     customClasses="text-xl max-w-max px-4 mx-auto"
//                   />
//                 )}
//                 <Iconbtn
//                   disabled={loading}
//                   onClick={() => {
//                     if (playerRef?.current) {
//                       playerRef.current.seek(0)
//                       setVideoEnded(false)
//                     }
//                   }}
//                   text="Rewatch"
//                   customClasses="text-xl max-w-max px-4 mx-auto mt-2"
//                 />
//                 <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
//                   {!isFirstVideo() && (
//                     <button
//                       disabled={loading}
//                       onClick={goToPrevVideo}
//                       className="blackButton"
//                     >
//                       Prev
//                     </button>
//                   )}
//                   {!isLastVideo() && (
//                     <button
//                       disabled={loading}
//                       onClick={goToNextVideo}
//                       className="blackButton"
//                     >
//                       Next
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </Player>
//         </div>
//       )}

//       {/* ---------- Video Info ---------- */}
//       <div className="mt-4">
//         <h1 className="text-3xl font-semibold">{videoData?.title}</h1>
//         <p className="pt-2 pb-6 text-richblack-200">{videoData?.description}</p>
//       </div>
//     </div>
//   )
// }

// export default VideoDetails
