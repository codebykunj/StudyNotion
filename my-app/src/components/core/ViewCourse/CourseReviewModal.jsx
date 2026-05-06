import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import {Iconbtn} from "../../common/Iconbtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ratingChanged = (newRating) => {
    // console.log(newRating)
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div className="">
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex w-11/12 flex-col space-y-2">
              <label
                className="text-sm text-richblack-5"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full bg-richblack-500 text-white"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please Add Your Experience
                </span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => setReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                Cancel
              </button>
              <Iconbtn text="Save" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}




// COMMENT KARELO CODE FUNCTIONALITY VISE CORRECT WORK KARE CHE PN TEMA STYLEING APPLY KAREL NATHI JAYARE NICHE NA CODE MA STYLEING APPLY KARELI CHE

// import React, { useEffect } from 'react'
// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux'
// import ReactStars from "react-rating-stars-component"
// import { Iconbtn } from '../../common/Iconbtn';
// import { createRating } from '../../../services/operations/courseDetailsAPI';

// export const CourseReviewModal = ({setReviewModal}) => {

//     const {user} = useSelector((state)=>state.profile);
//     const {token} = useSelector((state)=>state.auth);
//     const {courseEntireData} = useSelector((state)=>state.viewCourse) 

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState:{errors}
//     }=useForm();

//     useEffect(()=>{
//         setValue("courseExperience","");
//         setValue("courseRating",0);
//     },[]);

//     const onSubmit = async(data) => {
//         await createRating({
//             courseId:courseEntireData?._id,
//             rating:data?.courseRating,
//             review:data?.courseExperience,
//         },token);
//         setReviewModal(false);
//     }

//     const ratingChanged = (newRating) => {
//         setValue("courseRating",newRating);
               
//     }
    
//   return (
//     <div className='text-white flex flex-col'>
//         <div className='flex flex-col'>
//             {/* Modal Header */}
//             <div>
//                 <p>Add Review</p>
//                 <button onClick={setReviewModal(false)}>Close</button>
//                     {/* or  */}
//                 {/* <button> Add close Icon </button> */}
//             </div>

//             {/* Modal Body */}
//             <div>
//                 <div>
//                     <img src={user?.image} alt='user Image'
//                         className='aspect-square w-[50px] rounded-full object-cover'/>
                    
//                     <div>
//                         <p>{user?.firstName}{user?.lastName}</p>
//                         <p>Posting Publicly</p>
//                     </div>
//                 </div>

//                 <form onSubmit={handleSubmit(onSubmit)}
//                 className='flex items-center mt-6'>
//                     <ReactStars
//                         count={5}
//                         onChange={ratingChanged}
//                         size={24}
//                         activeColor="#ffd700"
//                     />

//                     <div>
//                         <label htmlFor='courseExperience'>Add Your Experience</label>
//                         <textarea id='courseExperience' 
//                         placeholder='Add Your Experience'
//                         {...register("courseExperience",{required:true})}
//                         className='w-full min-h-[130px] form-style'/>
                            
//                         {
//                             errors.courseExperience && (
//                                 <span>
//                                     Please Add Your Experience 
//                                 </span>
//                             )
//                         }
//                     </div>

//                     <div>
//                         <button onClick={()=>setReviewModal(false)}>Cancle</button>
//                         <Iconbtn text="Save"/>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
//   )
// }
