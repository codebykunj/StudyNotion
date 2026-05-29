// import React, { useEffect, useState } from 'react'
// import {useForm} from 'react-hook-form'
// import { apiconnector } from '../services/apiconnector';
// import { contactusEndpoint } from '../services/apis';
// import CountryCode from "../data/countrycode.json"



// export const ContactUsForm  = () => {
//     const [loading,setLoading] = useState(false);
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState:{errors , isSubmitSuccessful} 
//     } = useForm();

//     const submitContactForm = async(data) => {
//          console.log("Submitted data: ", data); // <-- ADD THIS
//          try {
//       setLoading(true)
//       const res = await apiconnector(
//         "POST",
//         contactusEndpoint.CONTACT_US_API,
//         data
//       )
//       console.log("Email Res - ", res)
//       setLoading(false)
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message)
//       setLoading(false)
//     }
//     }

//     useEffect(()=>{
//     if(isSubmitSuccessful)
//     {
//         reset({
//             firstname:"",
//             lastname:"",
//             email:"",
//             message: "",
//             mobileNo: ""
//         })
//     }
//     },[reset,isSubmitSuccessful])

//   return (
//     <div className='text-white'> 
//         <form className='flex flex-col gap-8 w-full' onSubmit={handleSubmit(submitContactForm)}>

//         {/* firstname & lastname  */}
//             <div className='flex flex-row gap-2 '>
//                 <div className='flex flex-col w-[50%]'>
//                     <label htmlFor='firstname'>First name</label>
//                     <input type='text'  id='firstname' name='firstname' placeholder='Firstname' className='text-black'
//                     {...register("firstname",{required:"true"})}/>
//                 </div>
//                 <div className='flex flex-col w-[50%]'>
//                     <label htmlFor='lastname'>lastname</label>
//                     <input type='text' id='lastname' name='lastname' placeholder='Lastname' className='text-black'
//                     {...register("lastname",{required:"true"})}/>

//                     {
//                         errors.lastname && (
//                             <span>Please enter your last name</span>
//                         )
//                     }
//                 </div>
//             </div>
//         {/* email  */}
//             <div className='flex'>
//                 <div className='flex flex-col w-full'>
//                 <label htmlFor='email'>Email</label>
//                 <input type='email' id='email' name='email' placeholder='email' className='text-black'
//                 {...register("email",{required:"true"})} />

//                 {
//                     errors.email && (
//                         <span>please enter your email</span>
//                     )
//                 }
//                 </div>
//             </div>

//         {/* MobileNo  */}
//             <div className='flex flex-col w-full'>
//                   <div>
//                       <label htmlFor='mobileNo' className='text-white'>MobileNo:</label>
//                   </div>

//                 <div className='flex gap-3'>
//                 <select className='text-black w-[25%] '  defaultValue="India">
//                     {
//                         CountryCode.map((data ,index)=>{
//                             return (
//                                 /* <select> */
//                                     <option key={index}  value={data.country}>{data.country} - {data.code}</option>
//                                 /* </select> */
//                             )
//                         })
//                     }
//                 </select>

//                 <div className='text-black  w-[calc(100%-25%-0.75rem)]'>
//                     <input type='number' id="mobileNo" name='mobileNo' placeholder='enter Your Number'
//                         {...register("mobileNo",{required:"true"})}
//                     />
//                     {
//                         errors.mobileNo && (
//                             <span>mobileNo is required</span>
//                         )
//                     }
//                 </div>
//                   </div>

//             </div>






//         {/* message  */}
//             <div className='flex'>
//                 <div className='flex flex-col w-full text-b'>
//                 <label htmlFor='message'>Message</label>
//                 <textarea  id='message' name='message' cols="30" rows="7" placeholder='message' className='text-black'
//                 {...register("message",{required:"true"})} />

//                 {
//                     errors.message && (
//             <span>
//             Please enter your Message.
//            </span>
//                     )
//                 }
//                 </div>
//             </div>
//         {/* button   */}
//             <div className='w-full bg-yellow-50 p-2 text-center rounded-md text-black font-bold'>
//                 <button type='submit' disabled={loading}>
//                     Send Message
//                 </button>
//             </div>


//         </form>
//     </div>
//   )
// }

//niche na code upper jevo j che pn niche na code ma styeling apply kari che                        
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { apiconnector } from "../services/apiconnector"
import { contactusEndpoint } from "../services/apis"
import CountryCode from "../data/countrycode.json"

export const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    console.log("Submitted data: ", data)
    try {
      setLoading(true)
      const res = await apiconnector("POST", contactusEndpoint.CONTACT_US_API, data)
      console.log("Email Res - ", res)
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
        mobileNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <div className="text-white">
      <form
        className="flex flex-col gap-8 w-full"
        onSubmit={handleSubmit(submitContactForm)}
      >
        {/* FIRST & LAST NAME */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="firstname" className="text-sm font-medium text-richblack-50">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter your first name"
              className="bg-richblack-800 text-richblack-5 rounded-lg px-4 py-3 border border-richblack-600 placeholder:text-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50"
              {...register("firstname", { required: "First name is required" })}
            />
            {errors.firstname && (
              <span className="text-sm text-pink-300 mt-1">
                {errors.firstname.message}
              </span>
            )}
          </div>

          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="lastname" className="text-sm font-medium text-richblack-50">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              placeholder="Enter your last name"
              className="bg-richblack-800 text-richblack-5 rounded-lg px-4 py-3 border border-richblack-600 placeholder:text-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50"
              {...register("lastname", { required: "Last name is required" })}
            />
            {errors.lastname && (
              <span className="text-sm text-pink-300 mt-1">
                {errors.lastname.message}
              </span>
            )}
          </div>
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-richblack-50">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="bg-richblack-800 text-richblack-5 rounded-lg px-4 py-3 border border-richblack-600 placeholder:text-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-sm text-pink-300 mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* MOBILE NUMBER */}
        <div className="flex flex-col gap-2">
          <label htmlFor="mobileNo" className="text-sm font-medium text-richblack-50">
            Mobile Number
          </label>

          <div className="flex gap-3">
            <select
              className="w-[25%] bg-richblack-800 text-richblack-5 rounded-lg px-3 py-3 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-50"
              defaultValue="India"
            >
              {CountryCode.map((data, index) => (
                <option key={index} value={data.code}>
                  {data.country} - {data.code}
                </option>
              ))}
            </select>

            <input
              type="number"
              id="mobileNo"
              placeholder="Enter your number"
              className="w-[75%] bg-richblack-800 text-richblack-5 rounded-lg px-4 py-3 border border-richblack-600 placeholder:text-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50"
              {...register("mobileNo", { required: "Mobile number is required" })}
            />
          </div>

          {errors.mobileNo && (
            <span className="text-sm text-pink-300 mt-1">
              {errors.mobileNo.message}
            </span>
          )}
        </div>

        {/* MESSAGE */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-richblack-50">
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            placeholder="Write your message here..."
            className="bg-richblack-800 text-richblack-5 rounded-lg px-4 py-3 border border-richblack-600 placeholder:text-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-50 resize-none"
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && (
            <span className="text-sm text-pink-300 mt-1">
              {errors.message.message}
            </span>
          )}
        </div>

        {/* BUTTON */}
        <div className="w-full">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-50 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-100 transition-all duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
            
          </button>
        </div>
      </form>
    </div>
  )
}
