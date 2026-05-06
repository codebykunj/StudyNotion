// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"

// export default function RequirementsField({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   getValues,
// }) {
//   const { editCourse, course } = useSelector((state) => state.course)
//   const [requirement, setRequirement] = useState("")
//   const [requirementsList, setRequirementsList] = useState([])

//   useEffect(() => {
//     if (editCourse) {
//       setRequirementsList(course?.instructions)
//     }
//     register(name, { required: true, validate: (value) => value.length > 0 })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   useEffect(() => {
//     setValue(name, requirementsList)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [requirementsList])

//   const handleAddRequirement = () => {
//     if (requirement.trim() !== "") {
//       setRequirementsList([...requirementsList, requirement.trim()])
//       setRequirement("")
//     }
//   }

//   const handleRemoveRequirement = (index) => {
//     const updatedRequirements = [...requirementsList]
//     updatedRequirements.splice(index, 1)
//     setRequirementsList(updatedRequirements)
//   }

//   return (
//     <div className="flex flex-col space-y-3">
//       {/* Label */}
//       <label htmlFor={name} className="text-sm font-medium text-richblack-5">
//         {label} <sup className="text-pink-200">*</sup>
//       </label>

//       {/* Input + Add Button */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
//         <input
//           type="text"
//           id={name}
//           value={requirement}
//           onChange={(e) => setRequirement(e.target.value)}
//           placeholder="Enter course requirement..."
//           className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5 placeholder:text-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50"
//         />
//         <button
//           type="button"
//           onClick={handleAddRequirement}
//           className="rounded-md bg-yellow-50 px-4 py-2 font-semibold text-richblack-900 transition-all duration-200 hover:scale-105 hover:bg-yellow-100"
//         >
//           Add
//         </button>
//       </div>

//       {/* Requirements List */}
//       {requirementsList.length > 0 && (
//         <ul className="mt-3 list-inside list-disc space-y-2">
//           {requirementsList.map((req, index) => (
//             <li
//               key={index}
//               className="flex items-center justify-between rounded-md bg-richblack-700 px-3 py-2 text-sm text-richblack-5"
//             >
//               <span className="truncate">{req}</span>
//               <button
//                 type="button"
//                 className="ml-2 text-xs text-pink-200 hover:text-pink-100 transition-all duration-150"
//                 onClick={() => handleRemoveRequirement(index)}
//               >
//                 ✕
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Validation Error */}
//       {errors[name] && (
//         <span className="ml-1 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
// }

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions || [])
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList])

  const handleAddRequirement = () => {
    if (requirement.trim()) {
      setRequirementsList([...requirementsList, requirement.trim()])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder="Enter a requirement"
          className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((req, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{req}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300"
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
