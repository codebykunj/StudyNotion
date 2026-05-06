
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import { Error } from './Error';
import { formatDate } from '../services/formateDate';
import CourseDetailsCard  from '../components/core/Course/CourseDetailsCard';

export const CourseDetails = () => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();

    const {loading} = useSelector((state)=>state.profile);
    const {paymentLoading} = useSelector((state)=>state.course)
    const [confirmationModal,setConfirmationModal] = useState(null);
    const [courseData,setCourseData] = useState(null);
    useEffect(()=>{
        const getCourseFullDetails = async()=>{
            try{
            const result = await fetchCourseDetails(courseId,token);
            console.log("PRINTING COURSE DATA->",result);
            setCourseData(result);

        }
        catch(error){
            console.log("could not fetch course details");
        }
        }
        getCourseFullDetails();
    },[courseId,token]);

    //average review count pn aapde joi su
    const [avgReviewCount,setAverageReviewCount] = useState(0);
    useEffect(()=>{
        const count = GetAvgRating(courseData?.courseDetails?.ratingAndReviews);
        setAverageReviewCount(count);
    },[courseData])

    //set total number of lecture
    const [totalNoOfLectures,setTotalNoOfLecture] = useState(0)
    useEffect(()=>{
        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec)=>{
            //courseContent ni ander forEach/darek courseContent ni ander aek
            //section hase and darek/forEach section/sec ni ander subSection hase
            //total subsection aej aapda totalNoOfLecture hase.
            lectures += sec?.subSection?.length || 0
        })
        setTotalNoOfLecture(lectures);
    },[courseData]);

    const handleBuyCourse = () =>{
        console.log("Hello ji");
        if(token){
            buyCourse(token,[courseId],user,navigate,dispatch);
            return;
        }

        //aagar mari pase token nai hoi teno matablab ae thai koi person te logged
        //in nathi to pn te course buy karvano try kare che...
        setConfirmationModal({
            text1:"You are not Logged in",
            text2:"Please Login to purchase the Course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),



    })

    }

    if(loading || !courseData){
        return(
            <div>
                Loading...
            </div>
        )
    }

    if(!courseData?.courseDetails){
        return(
            <div>
                <Error/>
            </div>
        )
    }

    const{
        _id:course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData?.courseDetails;


  return (
    <div className='min-h-screen w-full bg-richblack-900 text-white'>
        {/* <p>{courseData?.data?.courseDetails?.courseName}</p> 
                       OR
            <p>{courseName}</p>           
        */}
        <div className='w-full bg-richblack-800 py-10 px-5 md:px-20'>
        <div className='max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-start'>
        {/* Left: Course Info */}
        <div className='flex-1 space-y-5'>
            <h1 className='text-3xl md:text-4xl font-bold text-richblack-5"'>{courseName}</h1>  
            <p className='text-richblack-200 text-lg'>{courseDescription}</p>
            <div className='flex flex-wrap items-center gap-3 text-yellow-25 text-sm">'>
                <span className='text-lg font-semibold'>{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount || 0} Star_Size={24}/>
                <span className="text-richblack-100">{`(${ratingAndReviews?.length || 0} reviews)`}</span>
                <span className="text-richblack-100">{`(${studentsEnrolled?.length || 0} students Enrolled)`}</span>
            </div>

            <div className="text-richblack-100 text-sm">
              Created by{" "}
              <span className="font-semibold text-richblack-5">
                {`${instructor?.firstName || ''} ${instructor?.lastName || ''}`}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-richblack-200 text-sm">
              <p>Created on {formatDate(createdAt)}</p>
              <p>• English</p>
            </div>
        </div>
        {/* Right: Purchase Card */}
        <div className='w-full lg:w-[500px] shadow-lg border border-richblack-700 rounded-lg overflow-hidden bg-richblack-800/50'>
            <CourseDetailsCard 
            course={courseData?.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}/>
        </div>
    </div>
    </div>


        {/* aagar confirmation modal ma koi data hoi to confirmtion modal ne show kar de */}
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
       
    </div>
  )
}

