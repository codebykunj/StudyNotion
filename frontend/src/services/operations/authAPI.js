import { toast } from "react-hot-toast"

import { setLoading, setToken} from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiconnector } from "../apiconnector";
import axios from "axios";
import { categories } from "../apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API
} = categories

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try 
    {
      const response = await apiconnector("POST", SENDOTP_API, {
      email,
      checkUserPresent: true,
    });

    // const response = await axios.post("http://localhost:4000/api/v1/users/sendOTP", {
    //   email,
    //   checkUserPresent: true,
    // });

    console.log("SENDOTP API RESPONSE............", response);
    console.log(response.data.success);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("OTP Sent Successfully");
    navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error(error.response?.data?.message || "Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiconnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error(error.response?.data?.message || "Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiconnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error(error.response?.data?.message || "Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}

export function getPasswordResetToken (email,setEmailSent){
  return async(dispatch)=>{
    //backend/ database ma call/data leva jai che thai sudhi loading ne true mark kari do..
    dispatch(setLoading(true));
    try{
      //aama "POST" RESETPASSWORD_API pachi je clury bracke ma value pass kariye
      // che ne  {} {like email..etc}..to ae clurly bracket ma kai value pass karvani
      // te kemni khabar pade..to aapde pela je api/route ne call karta hoi tena backend na 
      // contoller ma javanu and tema je parameter/value aapde request ni body/request mathi
      //leta hoi te aai pass karvani..
      //Example:
      //aai backend na ResetPassword.jsx contoller ma hu khali email j lav chu
      // request ni body mathi aathi me aai khali email j pass karyu che clurly bracket ma.
        const response = await apiconnector("POST",RESETPASSTOKEN_API,{email})
        console.log("RESET PASSWORD TOKEN RESPONCE.....",response);
        //aagar response nathi aavi rayo to error show karo...
          if(!response.data.success)
          {
            throw new Error(response.data.message);
          }
          toast.success("ResetPassword Email Sent")
          //toast aave that means email send thai gayo che...to aa case ma setEmailSent(true)
          //kari do jethi Send Email vadu page dekhay
          setEmailSent(true);
    }
    catch(error){
    console.log(error);
    console.log('RESET PASSWORD TOKEN ERROR');
    }

    dispatch(setLoading(false));
  }
}

//resetPassword na parameter ma pn aej pass karisu je aapde backend na resetPassword.js
//na controller ma request ni body mathi parameter fetch karta hasu..
//aai backend resetPassword.js ma aapde password,confirmPassword and token ne request ni body mathi lai ae che..
//token ni value aapde reserPasswordToken.js ma je mail send karyo hato temathi token ni 
//value lai split kari resetPassword ma pass karisu... 
export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
//aam aai POST and RESERPASSWORD_APT pchi clurly bracket ma ma pn aej pass karisu je aapde backend na resetPassword.js
//na controller ma request ni body mathi parameter fetch karta hasu..
//aai backend resetPassword.js ma aapde password,confirmPassword and token ne request ni body mathi lai ae che..
//token ni value aapde reserPasswordToken.js ma je mail send karyo hato temathi token ni 
//value lai split kari resetPassword ma pass karisu... 
      const response = await apiconnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}
















































// import { toast } from "react-hot-toast"

// import { setLoading, setToken} from "../../slices/authSlice";
// import { resetCart } from "../../slices/cartSlice";
// import { setUser } from "../../slices/profileSlice";
// import { apiconnector } from "../apiconnector";
// import axios from "axios";
// import { categories } from "../apis";

// const {
//   SENDOTP_API,
//   SIGNUP_API,
//   LOGIN_API
// } = categories

// export function sendOtp(email, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try 
//     {

//       const response = await apiconnector("POST", SENDOTP_API, {
//       email,
//       checkUserPresent: true,
//     });

//     // const response = await axios.post("http://localhost:4000/api/v1/auth/sendOTP", {
//     //   email,
//     //   checkUserPresent: true,
//     // });

//     console.log("SENDOTP API RESPONSE............", response);
//     console.log(response.data.success);

//     if (!response.data.success) {
//       throw new Error(response.data.message);
//     }

//     toast.success("OTP Sent Successfully");
//     navigate("/verify-email");
//     } catch (error) {
//       console.log("SENDOTP API ERROR............", error)
//       toast.error("Could Not Send OTP")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }





// export function signUp(
//   accountType,
//   firstName,
//   lastName,
//   email,
//   password,
//   confirmPassword,
//   otp,
//   navigate
// ) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiconnector("POST", SIGNUP_API, {
//         accountType,
//         firstName,
//         lastName,
//         email,
//         password,
//         confirmPassword,
//         otp,
//       })

//       console.log("SIGNUP API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }
//       toast.success("Signup Successful")
//       navigate("/login")
//     } catch (error) {
//       console.log("SIGNUP API ERROR............", error)
//       toast.error("Signup Failed")
//       navigate("/signup")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function login(email, password, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiconnector("POST", LOGIN_API, {
//         email,
//         password,
//       })

//       console.log("LOGIN API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("Login Successful")
//       dispatch(setToken(response.data.token))
//       const userImage = response.data?.user?.image
//         ? response.data.user.image
//         : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
//       dispatch(setUser({ ...response.data.user, image: userImage }))
      
//       localStorage.setItem("token", JSON.stringify(response.data.token))
//       localStorage.setItem("user", JSON.stringify(response.data.user))
//       navigate("/dashboard/my-profile")
//     } catch (error) {
//       console.log("LOGIN API ERROR............", error)
//       toast.error("Login Failed")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }
































// import { toast } from "react-hot-toast"

// import { setLoading, setToken } from "../../slices/authSlice"
// import { resetCart } from "../../slices/cartSlice"
// import { setUser } from "../../slices/profileSlice"
// import { apiconnector } from "../apiconnector"
// import {endpoints } from "../apis"

// const {
//   SENDOTP_API,
//   SIGNUP_API,
//   LOGIN_API,
//   RESETPASSTOKEN_API,
//   RESETPASSWORD_API,
// } = endpoints

// export function sendOtp(email, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiconnector("POST", SENDOTP_API, {
//         email,
//         // checkUserPresent: true,
//       })
//       console.log("SENDOTP API RESPONSE............", response)

//       console.log(response.data.success)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("OTP Sent Successfully")
//       navigate("/verify-email")
//     } catch (error) {
//       console.log("SENDOTP API ERROR............", error)
//       toast.error("Could Not Send OTP")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function signUp(
//   accountType,
//   firstName,
//   lastName,
//   email,
//   password,
//   confirmPassword,
//   otp,
//   navigate
// ) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiconnector("POST", SIGNUP_API, {
//         accountType,
//         firstName,
//         lastName,
//         email,
//         password,
//         confirmPassword,
//         otp,
//       })

//       console.log("SIGNUP API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }
//       toast.success("Signup Successful")
//       navigate("/login")
//     } catch (error) {
//       console.log("SIGNUP API ERROR............", error)
//       toast.error("Signup Failed")
//       navigate("/signup")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function login(email, password, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiconnector("POST", LOGIN_API, {
//         email,
//         password,
//       })

//       console.log("LOGIN API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("Login Successful")
//       dispatch(setToken(response.data.token))
//       const userImage = response.data?.user?.image
//         ? response.data.user.image
//         : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
//       dispatch(setUser({ ...response.data.user, image: userImage }))
      
//       localStorage.setItem("token", JSON.stringify(response.data.token))
//       localStorage.setItem("user", JSON.stringify(response.data.user))
//       navigate("/dashboard/my-profile")
//     } catch (error) {
//       console.log("LOGIN API ERROR............", error)
//       toast.error("Login Failed")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }



































































































































































































































// export function signUp(
//   accountType,
//   firstName,
//   lastName,
//   email,
//   password,
//   confirmPassword,
//   otp,
//   navigate
// ) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiconnector("POST", SIGNUP_API, {
//         accountType,
//         firstName,
//         lastName,
//         email,
//         password,
//         confirmPassword,
//         otp,
//       })

//       console.log("SIGNUP API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }
//       toast.success("Signup Successful")
//       navigate("/login")
//     } catch (error) {
//       console.log("SIGNUP API ERROR............", error)
//       toast.error("Signup Failed")
//       navigate("/signup")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function login(email, password, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiconnector("POST", LOGIN_API, {
//         email,
//         password,
//       })

//       console.log("LOGIN API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("Login Successful")
//       dispatch(setToken(response.data.token))
//       const userImage = response.data?.user?.image
//         ? response.data.user.image
//         : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
//       dispatch(setUser({ ...response.data.user, image: userImage }))
      
//       localStorage.setItem("token", JSON.stringify(response.data.token))
//       localStorage.setItem("user", JSON.stringify(response.data.user))
//       navigate("/dashboard/my-profile")
//     } catch (error) {
//       console.log("LOGIN API ERROR............", error)
//       toast.error("Login Failed")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }
// export function sendOtp(email, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Sending OTP...");
//     dispatch(setLoading(true));

//     try {
//       const response = await apiconnector("POST", SENDOTP_API, {
//         email,
//         checkUserPresent: true,
//       });

//       console.log("SENDOTP API RESPONSE............", response);

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       toast.dismiss(toastId); // ✅ remove loading
//       toast.success("OTP Sent Successfully"); // ✅ show success
//       navigate("/verify-email");
//     } catch (error) {
//       console.log("SENDOTP API ERROR............", error);
//       toast.dismiss(toastId); // ✅ remove loading
//       toast.error(error.response?.data?.message || "Could Not Send OTP");
//     }

//     dispatch(setLoading(false));
//   };
// }
// export function sendOtp(email, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Sending OTP...");
//     dispatch(setLoading(true));

//     try {
//       const response = await apiconnector("POST", SENDOTP_API, {
//         email,
//         // checkUserPresent: true,
//       });
//       console.log("Email",email);
//       console.log("SENDOTP API RESPONSE............", response);

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       toast.dismiss(toastId); // ✅ remove loading toast
//       toast.success("OTP Sent Successfully"); // ✅ show success message
//       navigate("/verify-email");
//       return; // ✅ Prevents code after navigate from running
//     } catch (error) {
//       console.log("SENDOTP API ERROR............", error.response || error);
//       toast.dismiss(toastId); // ✅ ensure toast removed
//       toast.error(error.response?.data?.message || "Could Not Send OTP");
//     }

//     dispatch(setLoading(false));
//   };
// }


// export function signUp(
//   accountType,
//   firstName,
//   lastName,
//   email,
//   password,
//   confirmPassword,
//   otp,
//   navigate
// ) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiconnector("POST", SIGNUP_API, {
//         accountType,
//         firstName,
//         lastName,
//         email,
//         password,
//         confirmPassword,
//         otp,
//       })

//       console.log("SIGNUP API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }
//       toast.success("Signup Successful")
//       navigate("/login")
//     } catch (error) {
//       console.log("SIGNUP API ERROR............", error)
//       toast.error("Signup Failed")
//       navigate("/signup")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function login(email, password, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiconnector("POST", LOGIN_API, {
//         email,
//         password,
//       })

//       console.log("LOGIN API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("Login Successful")
//       dispatch(setToken(response.data.token))
//       const userImage = response.data?.user?.image
//         ? response.data.user.image
//         : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
//       dispatch(setUser({ ...response.data.user, image: userImage }))
      
//       localStorage.setItem("token", JSON.stringify(response.data.token))
//       localStorage.setItem("user", JSON.stringify(response.data.user))
//       navigate("/dashboard/my-profile")
//     } catch (error) {
//       console.log("LOGIN API ERROR............", error)
//       toast.error("Login Failed")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function logout(navigate) {
//   return (dispatch) => {
//     dispatch(setToken(null))
//     dispatch(setUser(null))
//     dispatch(resetCart())
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     toast.success("Logged Out")
//     navigate("/")
//   }
// }



// export function getPasswordResetToken(email , setEmailSent) {
//   return async(dispatch) => {
//     dispatch(setLoading(true));
//     try{
//       const response = await apiconnector("POST", RESETPASSTOKEN_API, {email,})

//       console.log("RESET PASSWORD TOKEN RESPONSE....", response);

//       if(!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       toast.success("Reset Email Sent");
//       setEmailSent(true);
//     }
//     catch(error) {
//       console.log("RESET PASSWORD TOKEN Error", error);
//       toast.error("Failed to send email for resetting password");
//     }
//     dispatch(setLoading(false));
//   }
// }

// export function resetPassword(password, confirmPassword, token) {
//   return async(dispatch) => {
//     dispatch(setLoading(true));
//     try{
//       const response = await apiconnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

//       console.log("RESET Password RESPONSE ... ", response);


//       if(!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       toast.success("Password has been reset successfully");
//     }
//     catch(error) {
//       console.log("RESET PASSWORD TOKEN Error", error);
//       toast.error("Unable to reset password");
//     }
//     dispatch(setLoading(false));
//   }
// }















// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const sendOtp = createAsyncThunk("auth/sendOtp", async (email, { rejectWithValue }) => {
//   try {
//     const response = await axios.post("/api/send-otp", { email }); // Adjust the URL as needed
//     return response.data; // Ensure this returns an object with a success property
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });


// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const sendOtp = createAsyncThunk("auth/sendOtp", async (email, { rejectWithValue }) => {
//   try {
//     const response = await axios.post("/sendOTP", { email }); // Ensure the URL matches your backend route
//     return response.data; // Ensure this returns an object with a success property
//   } catch (error) {
//     return rejectWithValue(error.response.data); // Return the error response
//   }
// });



















// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const sendOTP = createAsyncThunk("auth/sendOTP", async (email, { rejectWithValue }) => {
//   try {
//     const response = await axios.post("http://localhost:4000/sendOTP", { email }); // Use the full URL if needed
//     return response.data; // Ensure this returns an object with a success property
//   } catch (error) {
//     console.error("Error sending OTP:", error); // Log the error for debugging
//     return rejectWithValue(error.response ? error.response.data : { message: "Network error" }); // Handle network errors
//   }
// });
