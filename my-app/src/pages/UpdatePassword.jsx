// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// //love babber na code ma aa lakhelu che---> import { resetPassword } from '../../server/controller/ResetPassword';
// import { resetPassword } from '../services/operations/authAPI'
// import {Link, useLocation, useNavigate} from 'react-router-dom'
// import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'

// export const UpdatePassword = () => {
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const navigate = useNavigate();
//     //aai aapde formData and setFormData aavo usestate variable banayo che...tema clury
//     //bracket ma password and confirmPassword pass karyu che..aam password and confirmPassword
//     //ni value clurly bracke ma pass kari che to aa 2 value hovi j joi ae form/formdata ma
//     //initially teni value empty rakhi che..
//     const [formData , setFormData]= useState({
//         password:"",
//         confirmPassword:""
//     })
//     const {loading} = useSelector((state)=>state.auth);
//     //aa showPasssword and setShoePassword variable eye icon change/handle karva declare karyu che
//     const [showPassword,setShowPassword]= useState(false);
//     const [showConfirmPassword,setShowConfirmPassword]= useState(false);
//     const {password,confirmPassword} = formData;

//     const handleOnChange = (e) =>{
//         //set form data teni pase previous data hase...te previous data ne niche ni syntax
//         //ni help thi / mujab copy karase/thase..aama previous data (prevData) na purana/juna
//         //object no use kari lena...ans sate sate je pn particular field sathe tame interact
//         //kri rahya che teni value ne update kari dejo..
//         setFormData((prevData)=>(
//             {
//             ...prevData,
//             [e.target.name]:e.target.value,
//             }            
//         ))
//     }
//     // je pn dispatch kariae che action te badha action handle/dispatch aa handleOnSubmit function karse
//     // badha action dispatch aa function handleOnSubmit function ma thase..
//     const handleOnSubmit = (e) => {
//         e.preventDefault();
//         //location hook na pathname ni help thi aapde email ma je token no mail aavse ...
//         // te mail ne split kari niche ni syntax mujab tene split kari token ni value nikadi sakishu..
//         const token = location.pathname.split('/').at(-1);
//         //password and confirmPassword ae formData math fetch karyu che...
//         dispatch(resetPassword(password,confirmPassword,token,navigate));
//     }
//   return (
//     <div>
//     {
//         loading ? (<div>Loading...</div>) : 
//         (<div className='text-white'>
//             <h1>Choose New Password</h1>
//             <p>Almost done. Enter your new password and youre all set.</p>
//             <form onSubmit={handleOnSubmit}>
//                 <label>
//                    <p>New Password<sup>*</sup></p>
//                    {/* showPassword icon true hase to hu aene text mani laise and 
//                    false hase to hu aene password mani dais */}
//                    <input required 
//                    placeholder='Enter Password'
//                    type={showPassword ? "text" : "password"}
//                    name='password' //name='password' means aa input field nu name password aapelu che bijo koi meaning nathi aano
//                    value={password}
//                    onChange={handleOnChange}
//                    className='w-full p-6 bg-richblack-600 text-richblack-5'
//                    />
//                    <span onClick={()=>setShowPassword((prev)=>!prev)}>
//                     {/*aai eye icon ne chang/toggel karva mate span pr onclick function call karyo che.
//                     aam setShowPassword initially ma false (prev[prev state]) to [(prev) =>!prev ] lakhva thi
//                     setShowPassword true hase to false thase and false hase to true thase. */}
//                         {
//                             //aai showpassword na basis pr eye icon show thase..
//                            showPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/> 
//                         }
//                    </span>
//                 </label>


//                 <label>
//                    <p>Confirm New Password<sup>*</sup></p>
//                    {/* showPassword icon true hase to hu aene text mani laise and 
//                    false hase to hu aene password mani dais */}
//                    <input required 
//                    placeholder='Enter Confirm Password'
//                    type={showConfirmPassword ? "text" : "password"}
//                    name='confirmPassword' //name='password' means aa input field nu name password aapelu che bijo koi meaning nathi aano
//                    value={confirmPassword}
//                    onChange={handleOnChange}
//                    className='w-full p-6 bg-richblack-600 text-richblack-5'
//                    />
//                    <span onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
//                     {/*aai eye icon ne chang/toggel karva mate span pr onclick function call karyo che.
//                     aam setShowPassword initially ma false (prev[prev state]) to [(prev) =>!prev ] lakhva thi
//                     setShowPassword true hase to false thase and false hase to true thase. */}
//                         {
//                             //aai showpassword na basis pr eye icon show thase..
//                            showConfirmPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/> 
//                         }
//                    </span>
//                 </label>

//                 <button type='submit'>
//                     Reset Password
//                 </button>
//             </form>

//             <div>
//                 <Link to="/login">
//                     Back to Login
//                 </Link>
//             </div>
//         </div>
//       )
//     }
//     </div>
//   )
// }
//niche no code upper jevo che pn tema styling apply kareli che
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'

export const UpdatePassword = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const { password, confirmPassword } = formData
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split('/').at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] w-full p-4 lg:p-8 bg-richblack-800 rounded-xl shadow-lg">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            Almost done. Enter your new password and you’re all set.
          </p>

          <form onSubmit={handleOnSubmit}>
            {/* New Password Field */}
            <label className="relative block mb-4">
              <p className="mb-2 text-[0.9rem] leading-[1.3rem] text-richblack-5">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter your new password"
                className="w-full rounded-lg bg-richblack-700 text-richblack-5 placeholder:text-richblack-300 px-4 py-3 border border-richblack-600 focus:border-yellow-50 focus:shadow-[0_0_0_2px_#FFD60A] outline-none transition-all duration-300 !pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[45px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={22} fill="#AFB2BF" />
                )}
              </span>
            </label>

            {/* Confirm Password Field */}
            <label className="relative block">
              <p className="mb-2 text-[0.9rem] leading-[1.3rem] text-richblack-5">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm your new password"
                className="w-full rounded-lg bg-richblack-700 text-richblack-5 placeholder:text-richblack-300 px-4 py-3 border border-richblack-600 focus:border-yellow-50 focus:shadow-[0_0_0_2px_#FFD60A] outline-none transition-all duration-300 !pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[45px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={22} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 hover:scale-[1.02] transition-transform duration-200"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5 hover:text-yellow-50 transition-colors duration-200">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword
