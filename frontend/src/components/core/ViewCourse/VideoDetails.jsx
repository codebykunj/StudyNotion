import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { setCompletedLectures, updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { setUser } from '../../../slices/profileSlice';
import ReactPlayer from 'react-player';
import { AiFillPlayCircle } from 'react-icons/ai';
import { Iconbtn } from '../../common/Iconbtn';
import SectionQuiz from './SectionQuiz';


export const VideoDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerError, setPlayerError] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizTriggered, setQuizTriggered] = useState(false);

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

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      //aagar data na hoi to return kari do
      if (!courseSectionData.length) {
        console.log("Data Nahi aaya Hai");
        return;
      }

      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      }
      else {
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
  }, [courseSectionData, courseEntireData, location.pathname])

  // Reset error state when the lecture changes.
  useEffect(() => {
    setPlayerError(null);
    setVideoEnded(false);
    setQuizTriggered(false);
    setShowQuizModal(false);
  }, [subSectionId]);

  const isFirstVideo = () => {

    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data?._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    }
    else {
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

  const handelLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId }, token
    )

    //state update
    if (res && res.success !== false) {
      dispatch(updateCompletedLectures(subSectionId));
      if (res.xp && user) {
        dispatch(setUser({ ...user, xp: res.xp }));
      }
    }


    setLoading(false);

  }



  return (
    <div className="flex flex-col gap-5 text-white">
      {
        //aagar mere pass videoData nai hai to..
        !videoData ? (<div>No Data Found</div>)
          : (<div>
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
                        ref={playerRef}
                        key={`${subSectionId}-native`}
                        src={normalizedPlayerUrl || playerUrl}
                        controls
                        className="absolute top-0 left-0 h-full w-full object-contain"
                        onEnded={() => {
                          setVideoEnded(true);
                          if (!completedLectures?.includes(subSectionId)) {
                            handelLectureCompletion();
                          }
                        }}
                        onTimeUpdate={(e) => {
                          const videoElement = e.target;
                          const progress = videoElement.currentTime / videoElement.duration;
                          if (progress >= 0.5 && !quizTriggered) {
                            setQuizTriggered(true);
                            videoElement.pause();
                            setShowQuizModal(true);
                          }
                        }}
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
                        onClick={() => {
                          if (playerRef?.current) {
                            playerRef?.current?.seekTo(0);
                            setVideoEnded(false);
                          }
                        }}
                        text="Rewatch"
                        customClasses="text-xl max-w-max px-4 mx-auto mt-2" />

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
                          !isLastVideo() && <button disabled={loading}
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
        {completedLectures?.includes(subSectionId) && (
          <span className="text-caribbeangreen-200 font-semibold text-lg flex items-center gap-2">
            ✓ Completed
          </span>
        )}
      </div>
      <p className="pt-2 pb-6">{videoData?.description}</p>

      {/* In-Video Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
          <div className="my-10 w-11/12 max-w-[500px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
            <h2 className="text-2xl font-bold text-yellow-50 mb-4">Mid-Video Knowledge Check</h2>
            <p className="text-richblack-5 mb-6">Before you continue, let's make sure you're following along!</p>

            <div className="flex flex-col gap-3">
              <p className="text-richblack-100 font-medium">What is the main topic covered in the first half of this video?</p>
              <button className="bg-richblack-700 hover:bg-richblack-600 text-left p-3 rounded-md transition-all text-richblack-5">A) Introduction to the subject</button>
              <button className="bg-richblack-700 hover:bg-richblack-600 text-left p-3 rounded-md transition-all text-richblack-5">B) Advanced practical examples</button>
              <button className="bg-richblack-700 hover:bg-richblack-600 text-left p-3 rounded-md transition-all text-richblack-5">C) Course conclusion and summary</button>
            </div>

            <button
              onClick={() => setShowQuizModal(false)}
              className="mt-6 w-full bg-yellow-50 text-richblack-900 font-bold py-2 rounded-md hover:scale-95 transition-all"
            >
              Continue Video
            </button>
          </div>
        </div>
      )}

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