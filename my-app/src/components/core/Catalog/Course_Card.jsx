// import React, { useEffect, useState } from 'react'
// import RatingStars from '../../common/RatingStars'
// import { Link } from 'react-router-dom'
// import GetAvgRating from '../../../utils/avgRating';

// export const Course_Card = ({course,Height}) => {
//     const [avgReviewCount,setAvgReviewCount] = useState(0);

//     //jayare pn aapdi pase course no data insert/aavse tayare aa function call/populate thase.
//     useEffect(()=>{
//         const count = GetAvgRating(course.ratingAndReviews)
//         setAvgReviewCount(count);
//     },[course])


//   return (
//     <div className='w-full'>
//     {/*hu pn jayare koi cart pr click karu chu tayare hu te card course pr jav chu thai mane course ni badhi detail madi jase   */}
//         <Link to={`/courses/${course._id}`}>
//             <div>
//                 <div>
//                     <img src={course?.thumbnail} alt="imade" 
//                     className={`w-full ${Height} rounded-xl object-cover`}/>
//                 </div>

//                 <div>
//                     <p>{course?.courseName}</p>
//                     <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
//                     <div className='flex gap-x-3'>
//                     {/* aai avgReviewCount ni value hase to te print  karse nai no(|| aa) 0 print karse  */}
//                         <span>{avgReviewCount||0}</span>
//                         {/* aai RatingStars vada component ma aapde 2 vastu parameter ma pass karta hata
//                         aathi aai aapde Review_Count,Star_Size ni value and ketla star show karvana aa be vastu
//                         RatingStars input ma le che aathi aai component ma teni value pass kare che */}

//                         {/* aai Star_Size ni value pass nai karu to pn chalse because me RatingStarts vada component ma jo 
//                         Star_Size ni value pass nai kari hoi by default teni value 20 set kari didhi che */}
//                         <RatingStars Review_Count={avgReviewCount} />
//                         <span>{course?.ratingAndReviews?.length} | Ratings</span>
//                     </div>

//                     <p>{course?.price}</p>
//                 </div>
//             </div>
//         </Link>
//     </div>
//   )
// }
import React, { useEffect, useState } from "react"
import RatingStars from "../../common/RatingStars"
import GetAvgRating from "../../../utils/avgRating"
import { Link } from "react-router-dom"

export const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews || [])
    setAvgReviewCount(count)
  }, [course])

  return (
    <div className="w-full rounded-md border border-richblack-600 bg-richblack-700 text-richblack-5 overflow-hidden">
      <Link to={`/courses/${course._id}`} className="block">
        <div>
          <img
            src={course?.thumbnail}
            alt="course thumbnail"
            className={`w-full ${Height} rounded-t-md object-cover`}
          />
        </div>

        <div className="flex flex-col gap-2 px-4 py-3">
          <p className="text-xl font-semibold text-richblack-5">
            {course?.courseName}
          </p>
          <p className="text-sm text-richblack-50">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-50">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richblack-400">
              {course?.ratingAndReviews?.length || 0} Ratings
            </span>
          </div>
          <p className="text-xl font-semibold text-richblack-5">
            Rs. {course?.price}
          </p>
        </div>
      </Link>
    </div>
  )
}
