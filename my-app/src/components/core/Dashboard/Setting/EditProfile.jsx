import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import { Iconbtn } from "../../../common/Iconbtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)} className="space-y-8">
        {/* Profile Information */}
        <div className="flex flex-col gap-y-8 rounded-2xl border border-richblack-700 bg-richblack-800/80 p-8 px-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:border-richblack-600">
          <div className="border-b border-richblack-700/60 pb-5 mb-2">
            <h2 className="text-2xl font-bold text-richblack-5 tracking-tight">
              Edit Profile Information
            </h2>
            <p className="text-sm text-richblack-300 mt-1">
              Update your personal details below. Ensure all details are accurate to maintain your account properly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2 relative group">
              <label htmlFor="firstName" className="lable-style text-richblack-200 transition-colors group-focus-within:text-yellow-50 text-sm tracking-wide">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style transition-all duration-300 focus:ring-2 focus:ring-yellow-50/50 focus:border-transparent hover:bg-richblack-700/50"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="absolute -bottom-5 text-[12px] text-yellow-100 font-medium">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 relative group">
              <label htmlFor="lastName" className="lable-style text-richblack-200 transition-colors group-focus-within:text-yellow-50 text-sm tracking-wide">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="form-style transition-all duration-300 focus:ring-2 focus:ring-yellow-50/50 focus:border-transparent hover:bg-richblack-700/50"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="absolute -bottom-5 text-[12px] text-yellow-100 font-medium">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
            <div className="flex flex-col gap-2 relative group">
              <label htmlFor="dateOfBirth" className="lable-style text-richblack-200 transition-colors group-focus-within:text-yellow-50 text-sm tracking-wide">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style transition-all duration-300 focus:ring-2 focus:ring-yellow-50/50 focus:border-transparent hover:bg-richblack-700/50"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="absolute -bottom-5 text-[12px] text-yellow-100 font-medium">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 relative group">
              <label htmlFor="gender" className="lable-style text-richblack-200 transition-colors group-focus-within:text-yellow-50 text-sm tracking-wide">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="form-style transition-all duration-300 focus:ring-2 focus:ring-yellow-50/50 focus:border-transparent hover:bg-richblack-700/50"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele} className="bg-richblack-800 text-richblack-5">
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="absolute -bottom-5 text-[12px] text-yellow-100 font-medium">
                  Please select your gender.
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
            <div className="flex flex-col gap-2 relative group">
              <label htmlFor="contactNumber" className="lable-style text-richblack-200 transition-colors group-focus-within:text-yellow-50 text-sm tracking-wide">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style transition-all duration-300 focus:ring-2 focus:ring-yellow-50/50 focus:border-transparent hover:bg-richblack-700/50"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="absolute -bottom-5 text-[12px] text-yellow-100 font-medium">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 relative group lg:col-span-1">
              <label htmlFor="about" className="lable-style text-richblack-200 transition-colors group-focus-within:text-yellow-50 text-sm tracking-wide">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style transition-all duration-300 focus:ring-2 focus:ring-yellow-50/50 focus:border-transparent hover:bg-richblack-700/50"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="absolute -bottom-5 text-[12px] text-yellow-100 font-medium">
                  Please enter your About details.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-x-4 mt-8">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-lg bg-richblack-700 py-2.5 px-6 font-semibold tracking-wide text-richblack-50 transition-all duration-300 hover:bg-richblack-600 hover:scale-[1.05] active:scale-[0.95] shadow-md hover:shadow-lg"
          >
            Cancel
          </button>
          <div className="transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] shadow-md hover:shadow-yellow-50/20 rounded-lg">
            <Iconbtn type="submit" text="Save Changes" />
          </div>
        </div>
      </form>
    </>
  )
}