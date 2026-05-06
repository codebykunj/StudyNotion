// import React, { useEffect, useRef, useState } from "react"
// import { AiOutlineDown } from "react-icons/ai"
// import { HiOutlineVideoCamera } from "react-icons/hi"

// function CourseSubSectionAccordion({ subSec }) {
//   return (
//     <div>
//       <div className="flex justify-between py-2">
//         <div className={`flex items-center gap-2`}>
//           <span>
//             <HiOutlineVideoCamera />
//           </span>
//           <p>{subSec?.title}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CourseSubSectionAccordion
import React from "react"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div className="rounded-md border border-richblack-600 bg-richblack-700 text-richblack-5 p-4">
      <div className="flex justify-between items-center gap-2 py-2">
        <div className="flex items-center gap-2">
          <HiOutlineVideoCamera className="text-xl text-richblack-50" />
          <p className="font-semibold text-richblack-50">
            {subSec?.title}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion
