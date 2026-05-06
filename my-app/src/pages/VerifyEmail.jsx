// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import OTPInput from 'react-otp-input'
// import { Link, useNavigate } from 'react-router-dom';
// import { signUp,sendOtp } from '../services/operations/authAPI';

// export const VerifyEmail = () => {
//     //authSlice ma aapde already loading and signupData na data che je aathi aapde authSlice mathi aapde sihnUp no data laisu
//    //state.auth mathi loading and signupData bev lai/fetch kari daisu.
//     const {loading,signupData} = useSelector((state)=>state.auth);
//     const [otp,setOtp] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     //aai aevu pn thai sake che ke signUpData na data na pn padya hoi aathi me useEffect no use
//     //kari ne first render ma tene process kari daisu..aagar aapdi pase signUpData nai hoi to
//     // farithi aapde tene "/signup" page pr pachu navigate karavi daisu
//     useEffect(()=>{
//         if(!signupData){
//             navigate("/signup");
//         }
//     },[])

//     const handleOnSubmit = (e) =>{
//         e.preventDefault();
//         //authSlice ma aapse already signUp na data che je aathi aapde authSlice mathi aapde sihnUp no data laisu..
//         //backend ma signUp controller ma aapde je pn data request ki body mathi fetch kariye che
//         //te data ne aek variable ma store kari ne te variable pass karo/kato tame direct te request ni body na variable
//         //ne as arguement pass kari sakiye che...

//         const{
//             accountType,
//             firstName,
//             lastName,
//             email,
//             password,
//             confirmPassword,
//             // otp,
//             // navigate
//         } = signupData
//         dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
//     }
//   return (
//     <div className='text-white flex items-center justify-center mt-[150px]'>
//        {
//         loading ? (<div>Loading...</div>) 
//                 : (<div>
//                     <h1>verify Email</h1>
//                     <p>A verification code has been sent to you. Enter the code below</p>
//                     <form onSubmit={handleOnSubmit}>
//                     {/* niche ni syntax OTP ne input levani che */}
//                         <OTPInput
//                            value={otp}
//                            onChange={setOtp}
//                            numInputs={6}
//                            renderSeparator={<span></span>}
//                            renderInput={(props)=><input {...props} className='bg-richblack-800'
//                         //    placeholder='-'
//                            />}
                         
//                            />

//                         <button type='submit'>
//                             Verify Email
//                         </button>   
                          
//                     </form>

//                     <div>
//                        <div>
//                         <Link to="/login">Back to login</Link>
//                        </div>
// {/* aapde jayare Resend it button pr  click karisu tayare pn aapde aek action(otp resend) dispatch karavisu 
// aai aapde suthAPI ma je sendOtp function che tene farithi dispatch/ call karavi daisu/\..
// otp signupData ni ander je email che tema OTP send karisu */}
//                        <button onClick={()=>dispatch(sendOtp(signupData.email,navigate))}>
//                            Resend it
//                        </button>
//                     </div>
//                 </div>)
//        }
//     </div>
//   )
// }

//niche no code upper jevo che pn tema styling apply kareli che
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { signUp, sendOtp } from "../services/operations/authAPI";

export const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>

          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />

            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>

            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
            >
              <RxCountdownTimer /> Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};




















