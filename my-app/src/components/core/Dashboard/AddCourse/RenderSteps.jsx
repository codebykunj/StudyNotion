import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
// import {CourseInformationForm} from './CourseInformation/CourseInformationForm'
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import { CourseBuilderForm } from './CourseBuilder/CourseBuilderForm'
import PublishCourse from './PublishCourse'
import { setStep } from '../../../../slices/courseSlice'
export const RenderSteps = () => {
  const { step } = useSelector((state) => state.course)
  const dispatch = useDispatch()

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" }
  ]

  return (
    <>
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => dispatch(setStep(item.id))}
                className={`grid cursor-pointer aspect-square w-[34px] place-items-center rounded-full border-[1px] transition-all duration-200 hover:scale-110 ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50 border-[0px]"}`}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
            </div>
            {item.id !== steps.length && (
              <div
                className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 ${
                  step > item.id ? "border-yellow-50" : "border-richblack-500"
                } `}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <div
            className="flex min-w-[130px] flex-col items-center gap-y-2 cursor-pointer"
            key={item.id}
            onClick={() => dispatch(setStep(item.id))}
          >
            <p
              className={`text-sm hover:text-yellow-50 transition-colors duration-200 ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {step ===1 && <CourseInformationForm/>}
      {step === 2 &&  <CourseBuilderForm/>}
      {step ===3 && <PublishCourse/>}

      {/* {step ===2  && <CourseBuilderForm/>
          {step ===3 && <PublisCourse/>}  */}
    </>

    
  )
}

// // src/components/core/Dashboard/AddCourse/RenderSteps.jsx
// import React from 'react'
// import { useSelector } from 'react-redux'
// import { FaCheck } from 'react-icons/fa'
// // import CourseInformationForm from './CourseInformation/CourseInformationForm'
// import  CourseInformationForm  from './CourseInformation/CourseInformationForm'

// import  {CourseBuilderForm}  from './CourseBuilder/CourseBuilderForm'
// import  PublisCourse  from './PublishCourse'

// export const RenderSteps = () => {
//   const { step } = useSelector((state) => state.course)

//   const steps = [
//     { id: 1, title: "Course Information" },
//     { id: 2, title: "Course Builder" },
//     { id: 3, title: "Publish" }
//   ]

//   return (
//     <>
//       <div className="flex items-center gap-2">
//         {steps.map((item, index) => (
//           <div key={item.id} className="flex items-center gap-2">
//             <div
//               className={`w-8 h-8 flex items-center justify-center rounded-full border-2
//                 ${step === item.id
//                   ? "bg-yellow-900 border-yellow-50 text-yellow-50"
//                   : "bg-richblack-800 border-richblack-300 text-richblack-300"
//                 }`}
//             >
//               {step > item.id ? <FaCheck className='text-yellow-200 border-yellow-200' /> : item.id}
//             </div>

//             {item.id !== steps.length && (
//               <div
//                 className={`w-16 h-[1px] border-dashed border ${
//                   step > item.id ? "border-yellow-50" : "border-richblack-500"
//                 }`}
//               ></div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-between mt-4">
//         {steps.map((item) => (
//           <p key={item.id} className="text-sm text-richblack-300">{item.title}</p>
//         ))}
//       </div>

//       {step === 1 && <CourseInformationForm />}
//       {step === 2 && <CourseBuilderForm />}
//       {step===3 && <PublisCourse/>}
//       {/* step === 3 પર PublishCourse પણ ઉમેરો જો જરૂર */}
//     </>
//   )
// }
