//sendOTP
// const { response, request } = require("express")
// const User = require("../models/User")
// const OTP = require("../models/OTP");
// // const {mailSender} = require("../utils/mailSender");
// require("dotenv").config();

// exports.sendOTP = async(request,response) =>{
//     try{
// //fetch email from request ki body
//     const {email } = request.body;

//     //check if user is already exist 
//     const checkUserPresent = await User.findOne({email})

//     //if user is already exists..then return responce
//     if(checkUserPresent)
//     {
//         return response.status(401).json({
//             success:false,
//             message:"The User is Alredy Exists"
//         }) 
//     }
//     //generate otp
//     const otpGenerator = require("otp-generator")
//     const otp = otpGenerator.generate(6,{
//         upperCaseAlphabets:false,
//         lowerCaseAlphabets:false,
//         specialChars:false,
//     });
//     console.log("OTP generated",otp);

//     //after generating otp use have to make sure the generated OTP is unique..
//     //check unique otp or not
//     let result = await OTP.findOne({otp:otp});

//     while(true)
//     {
//         otp = otpGenerator(6,{
//         upperCaseAlphabets:false,
//         lowerCaseAlphabets:false,
//         specialChars:false,
//         });
//     result = await OTP.findOne({otp:otp})
//     break;
//     }

//     //after generating otp...store email , and that corresponding email a generated OTP in database
//     const otpPayload = {email,otp}

//     //create an entry foor OTP
//     const otpBody = await OTP.create(otpPayload);
//     console.log(otpBody);

//     response.status(200).json({
//         success:true,
//         message:"OTP Sent Successfully",
//         otp,
//     })
//     }
//     catch(error)
//     {
//       return response.status(500).json({
//         success:false,
//         message: "Failed to send OTP. Please try again.",
//         error: error.message
//       })
//     }    
// }







const { response, request } = require("express");
const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt")
const Profile = require("../models/Profile")


require("dotenv").config();

// destructure generate from otp-generator
const { generate } = require("otp-generator");

exports.sendOTP = async (request, response) => {
  try {
    // fetch email from request body
    let { email } = request.body;
    email = email?.toLowerCase().trim();

    // check if user already exists
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return response.status(401).json({
        success: false,
        message: "The User is Already Exists",
      });
    }

    // generate otp
    let otp = generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated", otp);

    // ensure otp is unique
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    // save otp and email in db
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    return response.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again.",
      error: error.message,
    });
  }
};
























//signUp
exports.signUp = async(request,response)=>{
    try{
    //data fetch from request ki body
    const {firstName,
           lastName,
           password, 
           email,
           confirmPassword,
           contactNumber,
           otp,
           accountType,
        //    aditionalDetails,
        //    courses,
        //    courseProgress,
        }= request.body;
        
        email = email?.toLowerCase().trim();
    
        //vadilate karo
        if(!firstName || !lastName || !password || !email ||!confirmPassword || !otp)
        {
            return response.status(403).json({
                success:false,
                message:"all the fields required"
            });
        }

        // check user already Exits or not
        const existingUser = await User.findOne({email})
        if(existingUser)
        {
            return response.status(400).json({
                success:false,
                message:"Email is already Exists"
            });
        }


        //password and confirom password ko match karo
        if(password !== confirmPassword)
        {
            return response.status(400).json({
                success:false,
                message:"Password and Confirm Password value does not match...Please try again"
            })
        }
        //find most recent OTP for the user
        //The following are the syntax to fnd most recent otp...
        const  recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
        
        //input me jo otp aaya hai or aapka database me jo otp hai dono ko match karlo
        //validate OTP
        if(recentOtp.length == 0)
        {
            return response.status(400).json({
                success:false,
                message:"OTP Length is Zero...OTP Not Found",
            })
        }
        else if(otp !== recentOtp[0].otp)
        {
            return response.status(400).json({
                success:false,
                message:"Enter OTP is does not Match....Invalid OTP"
            })
        }
        //Password ko hash karke database me store kar lo
        // const bcrypt = require("bcrypt")
        const hashPassword = await bcrypt.hash(password,10)

        //create profile to store in additionalDetails
        // const Profile = require("../models/Profile")
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
            
        });
               
                        //or

        //create profile to store in additionalDetails
        // const Profile = require("../models/Profile")
        // const {gender,dateOfBirth,about,contactNumber} = request.body;
        // const profileDetails = await Profile.create({
        //     gender,
        //     dateOfBirth,
        //     about,
        //     contactNumber
        // });


        //create entry in DB
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword,
            accountType,
            // If the account is an Instructor, set status to Pending for Admin verification
            instructorStatus: accountType === "Instructor" ? "Pending" : "Approved",
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            contactNumber
        })

        //return responce
        return response.status(200).json({
            success:true,
            message:"User Sign-in Successfully / User registered Successfully",
            user,
            //user store all sign-in details
        })
    }
    catch(error){
    console.log(error)
    return response.status(500).json({
        success:false,
        message:"User cannot be registrered...Please try again",
        error: error.message,
    });

    }
}



// Signup controller
// Required models and modules
// const bcrypt = require("bcrypt");
// const Profile = require("../models/Profile");
// exports.signUp = async (request, response) => {
//     try {
//         // Destructure data from request body
//         const {
//             firstName,
//             lastName,
//             password,
//             email,
//             confirmPassworrd,
//             contactNumber,
//             otp,
//             accountType,
//         } = request.body;

//         // ✅ Validate required fields
//         if (!firstName || !lastName || !password || !email || !confirmPassworrd || !otp) {
//             return response.status(403).json({
//                 success: false,
//                 message: "All fields are required",
//             });
//         }

//         // ✅ Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return response.status(400).json({
//                 success: false,
//                 message: "Email is already registered",
//             });
//         }

//         // ✅ Check password and confirmPassword match
//         if (password !== confirmPassworrd) {
//             return response.status(400).json({
//                 success: false,
//                 message: "Password and Confirm Password do not match",
//             });
//         }

//         // ✅ Get the most recent OTP for this email
//         const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
//         console.log("Recent OTP:", recentOtp);

//         // ✅ Validate OTP existence and match
//         if (!recentOtp || recentOtp.length === 0) {
//             return response.status(400).json({
//                 success: false,
//                 message: "OTP not found or expired",
//             });
//         }

//         if (otp !== recentOtp[0].otp) {
//             return response.status(400).json({
//                 success: false,
//                 message: "Invalid OTP",
//             });
//         }

//         // ✅ Hash password
//         const hashPassword = await bcrypt.hash(password, 10);

//         // ✅ Create profile for user
//         const profileDetails = await Profile.create({
//             gender: null,
//             dateOfBirth: null,
//             about: null,
//             contactNumber: null,
//         });

//         // ✅ Create user in database
//         const user = await User.create({
//             firstName,
//             lastName,
//             email,
//             password: hashPassword,
//             accountType,
//             additionalDetails: profileDetails._id, // Use _id to reference
//             image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
//             contactNumber,
//         });

//         // ✅ Return success response
//         return response.status(200).json({
//             success: true,
//             message: "User registered successfully",
//             user,
//         });

//     } catch (error) {
//         console.error("Signup Error:", error);
//         return response.status(500).json({
//             success: false,
//             message: "User registration failed. Please try again.",
//             error: error.message,
//         });
//     }
// };


// {
//     "firstName":"Tirth",
//     "lastName":"Patel",
//     "password":"YahiHePassword",
//     "email":"pateltirth1926@gmail.com",
//     "confirmPassworrd":"12345678",
//     " contactNumber":"1234567867",
//     "accountType":"Admin",
//     "otp":""
// }


// {
    
//     "firstName":"Kreya",
//     "lastName":"Patel",
//     "password":"12345678",
//     "email":"patelkreya47@gmail.com",
//     "confirmPassword":"12345678",
//     " contactNumber":"1234567867",
//     "accountType":"Admin",
//     "otp":"433732"
// }


//  {"firstName":"Bhani",
//     "lastName":"Patel",
//     "password":"1234",
//     "email":"pateltirth5235@gmail.com",
//     "confirmPassword":"12348878",
//     " contactNumber":"1234569967",
//     "accountType":"Instructor",
//     "otp":"966785"
// }








//Login
// exports.login = async(request,response)=>{
//     try{
//     //fetch data
//     const {email , password} = request.body;

//     //validate user enter email or password 
//     if(!email || !password)
//     {
//         return response.status(403).json({
//             success:false,
//             message:"all fields are required"
//         });
//     }
//     //check user already exists or not
//     const user = await User.findOne({email})
//     // const user = await User.findOne({email}).populate("additionalDetails")

//     if(!user)
//     {
//         return response.status(400).json({
//             success:false,
//             message:"User is not Exists.."
//         });
//     }

//     //if user is Exists the.......compare password..if password matches send token & cookie
//     if(await bcrypt.compare(password,user.password))
//     {
//         //scfeate token
//         const jwt = require("jsonwebtoken");
    
//         const payload = {
//         id:user._id,
//         email:user.email,
//         accountType:user.accountType,}

//         const token = jwt.sign(payload,process.env.JWT_SECRET,{
//         expiresIn:"2h",
//         })

//         const userData = user.toObject();
//         userData.token = token;
//         userData.password=undefined;

//         console.log("UserToken",userData.token);

//         // user = user.toObject();
//         // user.token = token;
//         // user.password=undefined;

//         //send cookie
//         const options = {
//             expires: new Date(Date.now()+ 3*24*60*60*1000)
//         }
//         response.cookie("token",token,options).status(200).json({
//             success:true,
//             message:"Logged in Successfully",
//             token,
//             user,
            
//         })
//     }
//     else
//     {
//         return response.status(401).json({
//         success:false,
//         message:"Password not matches.../passwrd is incorrect"        
            
//         })
//     }
    

    
//     }
//     catch(error)
//     {
//         return response.status(500).json({
//             success:false,
//             message:"User not Login....",
//             error:error.message,
//         })
//     }
// }
exports.login = async (request, response) => {
  try {
    // fetch data
    let { email, password } = request.body;
    email = email?.toLowerCase().trim();

    // validate user entered email and password
    if (!email || !password) {
      return response.status(400).json({  // 403 ની જગ્યાએ 400 use કરો (Bad Request)
        success: false,
        message: "All fields are required",
      });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({  // 400 ના બદલે 404 use કરવો logical છે (Not Found)
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // --- Gamification Streak Logic ---
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    
    let newStreak = user.streak || 0;
    if (user.lastLogin) {
      const lastLoginDate = new Date(user.lastLogin);
      lastLoginDate.setHours(0, 0, 0, 0);
      
      const diffTime = Math.abs(today - lastLoginDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newStreak = newStreak + 1; // Logged in next day
      } else if (diffDays > 1) {
        newStreak = 1; // Missed a day, reset
      }
      // If diffDays === 0, newStreak stays the same
    } else {
      newStreak = 1; // First time login
    }
    
    // Use findByIdAndUpdate to bypass full document validation that might fail on older documents
    await User.findByIdAndUpdate(user._id, {
      streak: newStreak,
      lastLogin: new Date()
    });
    // Update local user object for the response
    user.streak = newStreak;
    user.lastLogin = new Date();
    // ---------------------------------

    // create token
    const jwt = require("jsonwebtoken");
    const payload = {
      id: user._id,
      email: user.email,
      accountType: user.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // prepare user data without password
    const userData = user.toObject();
    userData.password = undefined;
    userData.token = token;

    // send cookie options
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true, // security improvement, cookie not accessible by JS
      // secure: true, // use if you are in https environment
      // sameSite: "strict" // optional for CSRF protection
    };

    // send response with token cookie
    return response
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
        token,
        user: userData,
      });
  } catch (error) {
    console.error("Login Error:", error);
    return response.status(500).json({
      success: false,
      message: "User login failed",
      error: error.message,
    });
  }
};



// const jwt = require("jsonwebtoken");

// exports.login = async (request, response) => {
//     try {
//         // ✅ Fetch email and password
//         const { email, password } = request.body;

//         // ✅ Validate input
//         if (!email || !password) {
//             return response.status(403).json({
//                 success: false,
//                 message: "All fields are required",
//             });
//         }

//         // ✅ Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return response.status(400).json({
//                 success: false,
//                 message: "User does not exist",
//             });
//         }

//         // ✅ Compare password
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return response.status(401).json({
//                 success: false,
//                 message: "Incorrect password",
//             });
//         }

//         // ✅ Create JWT token
//         const payload = {
//             id: user._id,
//             email: user.email,
//             accountType: user.accountType,
//         };

//         const token = jwt.sign(payload, process.env.JWT_SECRET, {
//             expiresIn: "2h", // ✅ spelling corrected
//         });

//         // ✅ Remove password from response
//         const userData = user.toObject();
//         userData.password = undefined;
//         userData.token = token;

//         // ✅ Set cookie options
//         const options = {
//             httpOnly: true,
//             expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
//             secure: process.env.NODE_ENV === "production" // only in production over HTTPS
//         };

//         // ✅ Send response with cookie
//         return response.cookie("token", token, options).status(200).json({
//             success: true,
//             message: "Logged in successfully",
//             token,
//             user: userData,
//         });

//     } catch (error) {
//         console.error("Login Error:", error);
//         return response.status(500).json({
//             success: false,
//             message: "Login failed. Please try again.",
//             error: error.message,
//         });
//     }
// };


// {
  
//     "password":"12345677",
//     "email":"patelkreya47@gmail.com",
 
// }

//changePassword
exports.changePassword = async(request,response)=>{
    try{
    //get data from request ki body
    //get oldPassword,newpassword,confirmpassword
    const {email, newPassword,confirmPassword}= request.body;
    //validatin
    if(!email || !newPassword || !confirmPassword)
    {
        return response.status(400).json({
            success:false,
            message:"All fields are required",
        })
    }

    //validation  
    if(newPassword !== confirmPassword) {
  return response.status(400).json({ success:false, message:"Passwords do not match" });
}

    //check user Exists
    const user = await User.findOne({email})
     if(!user)
    {
        return response.status(404).json({
            success:false,
            message:"User is not Exists.."
        });
    }

    //update password in database
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();




    // send mail-password is updated
    return response.status(200).json({
        success:true,
        message:"Mail Send Successfully",
        
    });
    
    //return responce
    }
    catch(error){
        return response.status(400).json({
            success:false,
            message:"Password is Not Updated/Changed"
        })
    }
}

 
// exports.changePassword = async (request, response) => {
//     try {
//         const { email, newPassword, confirmPassword } = request.body;

//         if (!email || !newPassword || !confirmPassword) {
//             return response.status(400).json({
//                 success: false,
//                 message: "All fields are required",
//             });
//         }

//         if (newPassword !== confirmPassword) {
//             return response.status(400).json({
//                 success: false,
//                 message: "Passwords do not match",
//             });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return response.status(404).json({
//                 success: false,
//                 message: "User does not exist",
//             });
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;
//         await user.save();

//         return response.status(200).json({
//             success: true,
//             message: "Password updated successfully",
//         });

//     } catch (error) {
//         console.error("Error changing password:", error); // Full error
//         return response.status(500).json({
//             success: false,
//             message: "Password is Not Updated/Changed",
//             error: error.message // Show error reason for debugging
//         });
//     }
// };
