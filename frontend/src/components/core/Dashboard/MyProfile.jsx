import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import { Iconbtn } from "../../common/Iconbtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div className="animate-fade-in">
      <h1 className="mb-10 text-4xl font-bold text-richblack-5 tracking-tight shadow-richblack-900/50">
        My Profile
      </h1>
      
      {/* Section 1: Profile Header */}
      <div className="flex items-center justify-between rounded-2xl border border-richblack-700 bg-richblack-800/80 p-8 px-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:border-richblack-600">
        <div className="flex items-center gap-x-6">
          <div className="relative">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[90px] rounded-full object-cover ring-4 ring-richblack-700 p-1 shadow-lg shadow-yellow-50/10 transition-transform duration-300 hover:scale-105 bg-richblack-800"
            />
            {/* Online Indicator */}
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-caribbeangreen-300 border-[3px] border-richblack-800 shadow-sm shadow-caribbeangreen-200/50"></div>
          </div>
          <div className="space-y-1 mt-1">
            <p className="text-2xl font-bold text-richblack-5 bg-gradient-to-r from-richblack-5 to-richblack-300 bg-clip-text text-transparent">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm font-medium text-richblack-300 opacity-90">{user?.email}</p>
          </div>
        </div>
        <div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-50/20 rounded-lg">
          <Iconbtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine className="text-lg" />
          </Iconbtn>
        </div>
      </div>

      {/* Section 2: About */}
      <div className="my-10 flex flex-col gap-y-6 rounded-2xl border border-richblack-700 bg-richblack-800/80 p-8 px-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:border-richblack-600">
        <div className="flex w-full items-center justify-between border-b border-richblack-700/60 pb-5">
          <p className="text-xl font-bold text-richblack-5 tracking-wide">About</p>
          <div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-50/20 rounded-lg">
            <Iconbtn
              text="Edit"
              onClick={() => {
                navigate("/dashboard/settings")
              }}
            >
              <RiEditBoxLine className="text-lg" />
            </Iconbtn>
          </div>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400 italic"
          } text-base font-medium leading-relaxed tracking-wide mt-2`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself..."}
        </p>
      </div>

      {/* Section 3: Personal Details */}
      <div className="my-10 flex flex-col gap-y-8 rounded-2xl border border-richblack-700 bg-richblack-800/80 p-8 px-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:border-richblack-600">
        <div className="flex w-full items-center justify-between border-b border-richblack-700/60 pb-5">
          <p className="text-xl font-bold text-richblack-5 tracking-wide">
            Personal Details
          </p>
          <div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-50/20 rounded-lg">
            <Iconbtn
              text="Edit"
              onClick={() => {
                navigate("/dashboard/settings")
              }}
            >
              <RiEditBoxLine className="text-lg" />
            </Iconbtn>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mt-2">
          {/* Column 1 */}
          <div className="flex flex-col gap-y-7">
            <div className="group rounded-md transition-all duration-300 p-2 -ml-2 hover:bg-richblack-700/30">
              <p className="mb-1 text-sm font-medium text-richblack-400 transition-colors group-hover:text-richblack-300 uppercase tracking-wider text-xs">First Name</p>
              <p className="text-base font-semibold text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div className="group rounded-md transition-all duration-300 p-2 -ml-2 hover:bg-richblack-700/30">
              <p className="mb-1 text-sm font-medium text-richblack-400 transition-colors group-hover:text-richblack-300 uppercase tracking-wider text-xs">Email</p>
              <p className="text-base font-semibold text-richblack-5 break-words">
                {user?.email}
              </p>
            </div>
            <div className="group rounded-md transition-all duration-300 p-2 -ml-2 hover:bg-richblack-700/30">
              <p className="mb-1 text-sm font-medium text-richblack-400 transition-colors group-hover:text-richblack-300 uppercase tracking-wider text-xs">Gender</p>
              <p className="text-base font-semibold text-richblack-5">
                {user?.additionalDetails?.gender ?? "Not specified"}
              </p>
            </div>
          </div>
          
          {/* Column 2 */}
          <div className="flex flex-col gap-y-7">
            <div className="group rounded-md transition-all duration-300 p-2 -ml-2 hover:bg-richblack-700/30">
              <p className="mb-1 text-sm font-medium text-richblack-400 transition-colors group-hover:text-richblack-300 uppercase tracking-wider text-xs">Last Name</p>
              <p className="text-base font-semibold text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div className="group rounded-md transition-all duration-300 p-2 -ml-2 hover:bg-richblack-700/30">
              <p className="mb-1 text-sm font-medium text-richblack-400 transition-colors group-hover:text-richblack-300 uppercase tracking-wider text-xs">Phone Number</p>
              <p className="text-base font-semibold text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Not provided"}
              </p>
            </div>
            <div className="group rounded-md transition-all duration-300 p-2 -ml-2 hover:bg-richblack-700/30">
              <p className="mb-1 text-sm font-medium text-richblack-400 transition-colors group-hover:text-richblack-300 uppercase tracking-wider text-xs">Date Of Birth</p>
              <p className="text-base font-semibold text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}