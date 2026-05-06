//aa final code che je correct pn che and run pn thai che
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import copy from "copy-to-clipboard"
// import toast from 'react-hot-toast';
// import { ACCOUNT_TYPE } from '../../../utils/constants';
// import { addToCart } from '../../../slices/cartSlice';

// export const CourseDetailsCard = ({course,setConfirmationModal,handleBuyCourse}) => {
//     const {user}=useSelector((state)=>state.profile);
//     const {token}= useSelector((state)=>state.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();


//     const {
//         thumbnail:ThumbnailImage,
//         price:CurrentPrice,
//     }=course;
//     console.log("COURSE",course);
    
    
//     const handleAddToCart = () => {
//        //mari pase valid user che pn te instructor che to te Add to cart nai kari sake
//        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR)
//         {
//             toast.error("You are instructor,you can't buy a course")
//             return;
//         } 
//         //aagar tamari pase valid token aavi jai.that means user login hoi because user login hase to j token generate thase
//         if(token)
//         {
//             console.log("dispatch add to cart");
//             dispatch(addToCart(course));
//             return;
//         }
//         //aagar user logged-in nai hoi to modal show  karo
//         setConfirmationModal({
//             text1:"You are not logged in",
//             text2:"Please login to add to card",
//             btn1Text:"Login",
//             btn2Text:"Cancel",
//             btn1Handler:()=>navigate("/login"),
//             btn2Handler:setConfirmationModal(null),


//         })
//     }

//     const handleShare = () => {
//       //niche na copy() function ni help thi aapde aapda browser na current path ne copy kari sakiye che
//       copy(window.location.href);
//       toast.success("Link copy to clipboard");
//     }

//   return (
//     <div>
        
//         <img src={ThumbnailImage} alt='ThumbnailImage' 
//         className='w-[400px] min-h-[180px] max-h-[300px] rounded-xl'/>

//         <div>
//             Rs.{CurrentPrice}
//         </div>

//         <div className='flex flex-col gap-y-6'>
//         {/* Course Buy button pr clickkarnaru logic  */}
//             <button onClick={user && course?.studentsEnrolled?.includes(user?._id)
//             ?()=>navigate("/dashboard/enrolled-courses")
//             :handleBuyCourse}
//             className='bg-yellow-50 w-fit text-richblack-900'>
//                 {
//                     user && course?.studentsEnrolled?.includes(user?._id)
//                     ?"Go to Course"
//                     :"Buy Now"
//                 }
//             </button>
//             {/* ADD to Card vadu logic  */}
//             {
//                 (!course?.studentsEnrolled.includes(user?._id))&&(
//                     <button onClick={handleAddToCart} className='bg-yellow-50 w-fit text-richblack-900'>
//                         Add to Cart
//                     </button>
//                 )
//             }
//         </div>

//         <div>
//             <p>30-Day Money-Back Guarantee</p>
//             <p>This Course Includes:</p>
//             <div className='flex flex-col gap-y-3'>
//                 {
//                     course?.instructions?.map((item,index)=>(
//                         <p key={index}>
//                             <span>{item}</span>
//                         </p>
//                     ))
//                 }
//             </div>    
//         </div>
//         {/* share button  */}
//         <div>
//             {/* Add share logo here  */}
//             <button onClick={handleShare} 
//             className='flex mx-auto items-center gap-2 p-6 text-yellow-50'>
//                 Share
//             </button>
//         </div>


//     </div>
//   )
// }


//aa code upper jevo j che pn tema style apply kareli che
import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <div className="flex flex-col gap-4 rounded-md border border-richblack-600 bg-richblack-700 text-richblack-5 p-4">
      {/* Course Image */}
      <img
        src={ThumbnailImage}
        alt={course?.courseName}
        className="max-h-[300px] min-h-[180px] w-full overflow-hidden rounded-2xl object-cover"
      />

      <div className="px-4">
        <div className="pb-4 text-3xl font-semibold text-richblack-5">
          Rs. {CurrentPrice}
        </div>

        <div className="flex flex-col gap-4">
          <button
            className="rounded-md bg-yellow-50 text-richblack-900 py-2 px-4 font-semibold w-full text-center"
            onClick={
              user && course?.studentsEnrolled?.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && course?.studentsEnrolled?.includes(user?._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>

          {(!user || !course?.studentsEnrolled?.includes(user?._id)) && (
            <button
              onClick={handleAddToCart}
              className="rounded-md bg-richblack-900 border border-richblack-600 text-yellow-50 py-2 px-4 font-semibold w-full text-center"
            >
              Add to Cart
            </button>
          )}
        </div>

        <div className="pt-6 text-center text-sm text-richblack-25">
          30‑Day Money‑Back Guarantee
        </div>

        <div className="mt-6">
          <p className="mb-3 text-xl font-semibold text-richblack-5">
            This Course Includes:
          </p>
          <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
            {course?.instructions?.map((item, i) => (
              <p key={i} className="flex items-center gap-2">
                <BsFillCaretRightFill className="text-yellow-50" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            className="mx-auto flex items-center gap-2 text-yellow-100 py-4"
            onClick={handleShare}
          >
            <FaShareSquare size={15} />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsCard









// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// export const CourseDetailsCard = ({course,setConfirmationModal,handelBuyCourse}) => {
//     const {user}=useSelector((state)=>state.profile);
//     const {token}= useSelector((state)=>state.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const {
//         thumbnail:ThumbnailImage,
//         price:CurrentPrice,
//     }=course||{};

//     // ✅ enrolled check ne ek variable ma store karu
//     const isEnrolled = course?.studentEnrolled?.includes(user?._id) || false;

//     const handleAddToCart = () => {
//         // Add to Cart logic
//     }

//   return (
//     <div>
//         <img src={ThumbnailImage} alt='ThumbnailImage' 
//         className='w-[400px] min-h-[180px] max-h-[300px] rounded-xl'/>

//         <div>
//             Rs.{CurrentPrice}
//         </div>

//         <div>
//         {/* Course Buy button pr clickkarnaru logic */}
//             <button onClick={user && isEnrolled
//             ?()=>navigate("/dashboard/enrolled-courses")
//             :handelBuyCourse}>
//                 {
//                     user && isEnrolled
//                     ?"Go to Course"
//                     :"Buy Now"
//                 }
//             </button>
//             {/* ADD to Cart vadu logic */}
//             {
//                 !isEnrolled &&(
//                     <button onClick={handleAddToCart}>
//                         Add to Cart
//                     </button>
//                 )
//             }
//         </div>
//     </div>
//   )
// }


















// // NOTE : NICHE NA code ma je comment che te jarur thi vach jo 
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom';
// import copy from "copy-to-clipboard"
// import toast from 'react-hot-toast';
// import { ACCOUNT_TYPE } from '../../../utils/constants';
// import { addToCart } from '../../../slices/cartSlice';

// export const CourseDetailsCard = ({
//     course,
//     setConfirmationModal,
// }) => {
//     const { user } = useSelector((state) => state.profile);
//     const { token } = useSelector((state) => state.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const includesUser = Array.isArray(course?.studentEnrolled) && user
//         ? course.studentEnrolled.includes(user._id)
//         : false;

//     const handleAddToCart = () => {
//         if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
//             toast.error("You are Instructor, you can't buy course");
//             return;
//         }

//         if (token) {
//             dispatch(addToCart(course));
//             return;
//         }

//         setConfirmationModal({
//             text1: "You are not logged in",
//             text2: "Please login to add to cart",
//             btn1Text: "Login",
//             btn2Text: "Cancel",
//             btn1Handler: () => navigate("/login"),
//             btn2Handler: () => setConfirmationModal(null),
//         });
//     };

//     const handleShare = () => {
//         copy(window.location.href);
//         toast.success("Link Copied to Clipboard");
//     };

//     return (
//         <div>
//             <img
//                 src={course?.thumbnail}
//                 alt='image'
//                 className='w-[400px] rounded-xl max-h-[300px] min-h-[180px]'
//             />
//             <div>Rs. {course?.price}</div>

//             <div className='flex flex-col gap-y-6'>
//                 <button
//                     className='bg-yellow-50 w-fit p-2 text-richblack-800'
//                     onClick={
//                         includesUser
//                             ? () => navigate("/dashboard/enrolled-courses")
//                             : () => {
//                                 // handle buy course here or other logic
//                               }
//                     }
//                 >
//                     {includesUser ? "Go to Course" : "Buy Now"}
//                 </button>

//                 {!includesUser && (
//                     <button
//                         onClick={handleAddToCart}
//                         className='bg-yellow-50 w-fit text-richblack-800'
//                     >
//                         Add to Cart
//                     </button>
//                 )}
//             </div>

//             <div>
//                 <p>30 Day Money-Back Guarantee</p>
//                 <p>This Course Includes:</p>
//                 <div className='flex flex-col gap-y-3'>
//                     {course?.instructions?.map((item, index) => (
//                         <p key={index} className='flex gap-x-2'>
//                             <span>{item}</span>
//                         </p>
//                     ))}
//                 </div>
//             </div>

//             <div>
//                 <button
//                     onClick={handleShare}
//                     className='flex items-center gap-2 p-6 text-yellow-50 mx-auto'
//                 >
//                     Share
//                 </button>
//             </div>
//         </div>
//     );
// };




















































































































// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom';
// import copy from "copy-to-clipboard"
// import toast from 'react-hot-toast';
// import { ACCOUNT_TYPE } from '../../../utils/constants';
// import { addToCart } from '../../../slices/cartSlice';
// export const CourseDetailsCard = ({
//     course,
//     setConfirmationModal,
//     // handleBuyCourse
// }) => {

// //niche ni syntax ni helo thi aapde course mathi  thumbnail and price ni value nikadi daisu..

//     // const{
//     //     thumbnail:ThumbnailImage,
//     //     price:CurrentPrice,
//     // }=course;

//     const {user} = useSelector((state)=>state.profile);
//     const {token} = useSelector((state)=>state.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleAddToCart = () => {
//         //instructor and je persone/student logged-in nathi te ADD TO CART nai kari sake..

//         //AAGAR TAMARI PASE AEK VALID USER logged-in che pn te instructor che aa 
//         //case ma tame error toast mokalo
//         if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
//             toast.error("You are Instructor,you Can't Buy Course ")
//             return;
//         }
        
//         // aai  aem check kare che aagar tamari pase koi valid token hoi(Student,Admin But Not Instructor)
//         //to tame te case ma niche no code execute kari do..
//         //bacause Admin to koi pn kari sake che course Buy pn and create pn kari sake che.
//         if(token){
//             dispatch(addToCart(course));
//             return;
//         }
//         //aagar valid token nai aavyu tamari pase that means user logged-in j nathi
//         //aa case ma confirmation modal show karavi do..
//         setConfirmationModal({
//             text1:"You are not logged in",
//             text2:"Please login to add to cart",
//             btn1Text:"login",
//             btn2Text:"Cancle",
//             btn1Handler:()=>navigate("/login"),
//             btn2Handler:()=>setConfirmationModal(null)
//         })
//     }

//     const handleShare = () => {
//         // copy karva mate aa package install karo:npm i copy-to-clipboard 
//         // copy function ni ander aapde current url ne copy karva mate aapde aa path use karisu window.location.href
//         copy(window.location.href)
//         toast.success("Like Copied to Clipboard")
//     }
//   return (
//     <div>
//         <img src={course?.ThumbnailImage} alt='image' className='w-[400px] rounded-xl max-h-[300px] min-h-[180px]'/>
//          <div>
//             Rs. {course?.CurrentPrice}
//          </div>
//         {/* <img src={ThumbnailImage} alt='image'/>
//         <div>Rs.{CurrentPrice}</div> */}
//         <div className='flex flex-col gap-y-6'>
//         {/* aa course?.studentEnrolled.includes(user?._id lakhi ne aapde check kariye che ke
//         aagar student ae pele thi course buy kari rakhyo hoi to aapde tenr nevigate 
//         karavi daisu navigate(dashboard/enrolledCourse)  */}
//             <button className='bg-yellow-50 w-fit p-2 text-richblack-800'
//              onClick={user && course?.studentEnrolled.includes(user?._id)
//             ?()=>navigate("/dashboard/enrolled-courses")
//             :"Hello"
//             // :handleBuyCourse
//             }>
//                 {
//                    user && course?.studentEnrolled.includes(user._id)
//                    ? "Go to Course"
//                    : "Buy Now" 
//                 }
//             </button>

//             {
//                 //aagae student enrolled nathi(student ae course buy nai karyo)
//                 // to hu Add to card vadu button dekhadis
//                 (!course?.studentEnrolled.includes(user?._id)) && (
//                     <button onClick={handleAddToCart} 
//                     className='bg-yellow-50 w-fit text-richblack-800'>
//                         Add to Cart
//                     </button>
//                 )
//             }
//         </div>

//         <div>
//             <p>30 Day Money-Back Guarantee </p>
//             <p>This Course Includes:</p>
//             <div className='flex flex-col gap-y-3'>
//                 {
//                 course?.instructions?.map((item,index)=>(
//                     <p key={index} className='flex gap-x-2'>
//                         <span>{item}</span>
//                     </p>
//                 ))
//                 }
//             </div>
//         </div>

//         <div>
//             <button onClick={handleShare} 
//             className='flex items-center gap-2 p-6 text-yellow-50 mx-auto'>
//                 Share
//             </button>
//         </div>
//     </div>
//   )
// }


