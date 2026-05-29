// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "react-hot-toast"
// import { HiOutlineCurrencyRupee } from "react-icons/hi"
// import { MdNavigateNext } from "react-icons/md"
// import { useDispatch, useSelector } from "react-redux"

// import {
//   addCourseDetails,
//   editCourseDetails,
//   fetchCourseCategories,
// } from "../../../../../services/operations/courseDetailsAPI"
// import { setCourse, setStep } from "../../../../../slices/courseSlice"
// import { COURSE_STATUS } from "../../../../../utils/constants"
// import { Iconbtn } from "../../../../common/Iconbtn"
// import Upload from "../Upload"
// import { ChipInput } from "./ChipInput"
// import RequirementsField from "./RequirementsField"

// export default function CourseInformationForm() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm()

//   const dispatch = useDispatch()
//   const { token } = useSelector((state) => state.auth)
//   const { course, editCourse } = useSelector((state) => state.course)
//   const [loading, setLoading] = useState(false)
//   const [courseCategories, setCourseCategories] = useState([])

//   useEffect(() => {
//     const getCategories = async () => {
//       setLoading(true)
//       const categories = await fetchCourseCategories()
//       if (categories.length > 0) setCourseCategories(categories)
//       setLoading(false)
//     }

//     if (editCourse) {
//       setValue("courseTitle", course.courseName)
//       setValue("courseShortDesc", course.courseDescription)
//       setValue("coursePrice", course.price)
//       setValue("courseTags", course.tag)
//       setValue("courseBenefits", course.whatYouWillLearn)
//       setValue("courseCategory", course.category)
//       setValue("courseRequirements", course.instructions)
//       setValue("courseImage", course.thumbnail)
//     }

//     getCategories()
//   }, [])

//   const isFormUpdated = () => {
//     const currentValues = getValues()
//     return (
//       currentValues.courseTitle !== course.courseName ||
//       currentValues.courseShortDesc !== course.courseDescription ||
//       currentValues.coursePrice !== course.price ||
//       currentValues.courseTags.toString() !== course.tag.toString() ||
//       currentValues.courseBenefits !== course.whatYouWillLearn ||
//       currentValues.courseCategory._id !== course.category._id ||
//       currentValues.courseRequirements.toString() !==
//         course.instructions.toString() ||
//       currentValues.courseImage !== course.thumbnail
//     )
//   }

//   const onSubmit = async (data) => {
//     const formData = new FormData()

//     if (editCourse) {
//       if (!isFormUpdated()) {
//         toast.error("No changes made to the form")
//         return
//       }

//       formData.append("courseId", course._id)
//       formData.append("courseName", data.courseTitle)
//       formData.append("courseDescription", data.courseShortDesc)
//       formData.append("price", data.coursePrice)
//       formData.append("tag", JSON.stringify(data.courseTags))
//       formData.append("whatYouWillLearn", data.courseBenefits)
//       formData.append("category", data.courseCategory)
//       formData.append("instructions", JSON.stringify(data.courseRequirements))
//       formData.append("thumbnailImage", data.courseImage)

//       setLoading(true)
//       const result = await editCourseDetails(formData, token)
//       setLoading(false)

//       if (result) {
//         dispatch(setCourse(result))
//         dispatch(setStep(2))
//       }
//     } else {
//       formData.append("courseName", data.courseTitle)
//       formData.append("courseDescription", data.courseShortDesc)
//       formData.append("price", data.coursePrice)
//       formData.append("tag", JSON.stringify(data.courseTags))
//       formData.append("whatYouWillLearn", data.courseBenefits)
//       formData.append("category", data.courseCategory)
//       formData.append("status", COURSE_STATUS.DRAFT)
//       formData.append("instructions", JSON.stringify(data.courseRequirements))
//       formData.append("thumbnailImage", data.courseImage)

//       setLoading(true)
//       const result = await addCourseDetails(formData, token)
//       setLoading(false)

//       if (result) {
//         dispatch(setCourse(result))
//         dispatch(setStep(2))
//       }
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-6"
//     >
//       {/* Course Title */}
//       <div className="flex flex-col space-y-1">
//         <label className="text-sm text-richblack-5" htmlFor="courseTitle">
//           Course Title <sup className="text-pink-200">*</sup>
//         </label>
//         <input
//           id="courseTitle"
//           placeholder="Enter Course Title"
//           {...register("courseTitle", { required: true })}
//           className="form-style w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
//         />
//         {errors.courseTitle && (
//           <span className="text-xs text-pink-200">Course title is required</span>
//         )}
//       </div>

//       {/* Course Short Description */}
//       <div className="flex flex-col space-y-1">
//         <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
//           Course Short Description <sup className="text-pink-200">*</sup>
//         </label>
//         <textarea
//           id="courseShortDesc"
//           placeholder="Enter Description"
//           {...register("courseShortDesc", { required: true })}
//           className="form-style w-full min-h-[130px] resize-none rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
//         />
//         {errors.courseShortDesc && (
//           <span className="text-xs text-pink-200">
//             Course Description is required
//           </span>
//         )}
//       </div>

//       {/* Course Price */}
//       <div className="flex flex-col space-y-1">
//         <label className="text-sm text-richblack-5" htmlFor="coursePrice">
//           Course Price <sup className="text-pink-200">*</sup>
//         </label>
//         <div className="relative">
//           <input
//             id="coursePrice"
//             placeholder="Enter Course Price"
//             {...register("coursePrice", {
//               required: true,
//               valueAsNumber: true,
//               pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
//             })}
//             className="form-style w-full rounded-md border border-richblack-600 bg-richblack-700 pl-12 pr-3 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
//           />
//           <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />
//         </div>
//         {errors.coursePrice && (
//           <span className="text-xs text-pink-200">Course Price is required</span>
//         )}
//       </div>

//       {/* Course Category */}
//       <div className="flex flex-col space-y-1">
//         <label className="text-sm text-richblack-5" htmlFor="courseCategory">
//           Course Category <sup className="text-pink-200">*</sup>
//         </label>
//         <select
//           {...register("courseCategory", { required: true })}
//           defaultValue=""
//           id="courseCategory"
//           className="form-style w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 focus:border-yellow-500 focus:outline-none"
//         >
//           <option value="" disabled>
//             Choose a Category
//           </option>
//           {!loading &&
//             courseCategories?.map((category, indx) => (
//               <option key={indx} value={category?._id}>
//                 {category?.name}
//               </option>
//             ))}
//         </select>
//         {errors.courseCategory && (
//           <span className="text-xs text-pink-200">Course Category is required</span>
//         )}
//       </div>

//       {/* Tags */}
//       <ChipInput
//         label="Tags"
//         name="courseTags"
//         placeholder="Enter Tags and press Enter"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       />

//       {/* Upload Thumbnail */}
//       <Upload
//         name="courseImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? course?.thumbnail : null}
//       />

//       {/* Benefits */}
//       <div className="flex flex-col space-y-1">
//         <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
//           Benefits of the course <sup className="text-pink-200">*</sup>
//         </label>
//         <textarea
//           id="courseBenefits"
//           placeholder="Enter benefits of the course"
//           {...register("courseBenefits", { required: true })}
//           className="form-style w-full min-h-[130px] resize-none rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
//         />
//         {errors.courseBenefits && (
//           <span className="text-xs text-pink-200">
//             Benefits of the course is required
//           </span>
//         )}
//       </div>

//       {/* Requirements */}
//       <RequirementsField
//         name="courseRequirements"
//         label="Requirements/Instructions"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         getValues={getValues}
//       />

//       {/* Buttons */}
//       <div className="flex justify-end gap-2">
//         {editCourse && (
//           <button
//             type="button"
//             onClick={() => dispatch(setStep(2))}
//             disabled={loading}
//             className="flex items-center gap-2 rounded-md bg-richblack-300 px-4 py-2 font-semibold text-richblack-900 hover:bg-richblack-400"
//           >
//             Continue Without Saving
//           </button>
//         )}
//         <Iconbtn
//           disabled={loading}
//           text={!editCourse ? "Next" : "Save Changes"}
//           type="submit"
//         >
//           <MdNavigateNext />
//         </Iconbtn>
//       </div>
//     </form>
//   )
// }

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import {Iconbtn} from "../../../../common/Iconbtn"
import Upload from "../Upload"
import { ChipInput } from "./ChipInput"
import RequirementsField from "./RequirementsField"

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) setCourseCategories(categories)
      setLoading(false)
    }

    if (editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }

    getCategories()
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    )
  }

  const onSubmit = async (data) => {
    const formData = new FormData()

    if (editCourse) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
        return
      }

      formData.append("courseId", course._id)
      formData.append("courseName", data.courseTitle)
      formData.append("courseDescription", data.courseShortDesc)
      formData.append("price", data.coursePrice)
      formData.append("tag", JSON.stringify(data.courseTags))
      formData.append("whatYouWillLearn", data.courseBenefits)
      formData.append("category", data.courseCategory)
      formData.append("instructions", JSON.stringify(data.courseRequirements))
      formData.append("thumbnailImage", data.courseImage)

      setLoading(true)
      const result = await editCourseDetails(formData, token)
      setLoading(false)

      if (result) {
        dispatch(setCourse(result))
        dispatch(setStep(2))
      }
    } else {
      formData.append("courseName", data.courseTitle)
      formData.append("courseDescription", data.courseShortDesc)
      formData.append("price", data.coursePrice)
      formData.append("tag", JSON.stringify(data.courseTags))
      formData.append("whatYouWillLearn", data.courseBenefits)
      formData.append("category", data.courseCategory)
      formData.append("status", COURSE_STATUS.DRAFT)
      formData.append("instructions", JSON.stringify(data.courseRequirements))
      formData.append("thumbnailImage", data.courseImage)

      setLoading(true)
      const result = await addCourseDetails(formData, token)
      setLoading(false)

      if (result) {
        dispatch(setCourse(result))
        dispatch(setStep(2))
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>

      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style w-full min-h-[130px] resize-none rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>

      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
            })}
            className="form-style w-full rounded-md border border-richblack-600 bg-richblack-700 pl-12 pr-3 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 focus:border-yellow-500 focus:outline-none"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

      {/* Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Course Thumbnail */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Benefits */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style w-full min-h-[130px] resize-none rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>

      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      {/* Buttons */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900 hover:bg-richblack-400"
          >
            Continue Without Saving
          </button>
        )}
        <Iconbtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
          type="submit"
        >
          <MdNavigateNext />
        </Iconbtn>
      </div>
    </form>
  )
}
