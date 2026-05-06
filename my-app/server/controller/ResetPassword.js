const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const crypto = require('crypto')

//resetPasswordToken
exports.resetPasswordToken = async(request,response)=>{
    try{
     //get email from request ki body
        const {email} = request.body;

    //check user for this email ,
        const user = await User.findOne({email:email})
        if(!user)
        {
            return response.status(400).json({
                ssuccess:true,
                message:"Email is not Exists.../...User with this Email is not Exists"
            })    
        }  

    //generate token
    // npm i crypto =====> aa command download karvano che
        const token = crypto.randomUUID();
    
    //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                {email:email},
                                {
                                    token:token,
                                    resetPasswordExpires:Date.now() + 5*60*1000,
                                }
                                )
    console.log(updatedDetails);
    //create url
    const url = `http://localhost:3000/update-password/${token}`    
    
    await mailSender(email,"Password Reset Link",`Password Reset Link: <a href="${url}">${url}</a>`)

    //return responce
    return response.json({
        success:true,
        message:"Email Send Successfully...Please check email and change password",
        token:token,
    })    
    } 
    catch(error)
    {
        return response.status(500).json({
            success:false,
            message:"Something went wronge"
        })
    }
    
}
// resetPassword
exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({  token });
        console.log("userDetails",userDetails);
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid or Expired",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}

        const bcrypt = require("bcrypt")
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};





























// const User = require("../models/User");
// const mailSender = require("../utils/mailSender");
// const crypto = require("crypto");
// const bcrypt = require("bcrypt"); // ✅ import bcrypt

// // RESET PASSWORD TOKEN
// exports.resetPasswordToken = async (request, response) => {
//     try {
//         const { email } = request.body;

//         const user = await User.findOne({ email });

//         if (!user) {
//             return response.status(400).json({
//                 success: false,
//                 message: "User with this email does not exist.",
//             });
//         }

//         const token = crypto.randomUUID();
//         console.log("Token",token);

//         // Save token & expiry time in DB
//         await User.findOneAndUpdate(
//             { email },
//             {
//                 token: token,
//                 resetPasswordExpires: Date.now() + 5 * 60 * 1000, // 5 mins
//             }, { new: true }
//         );

//         const url = `http://localhost:3000/update-password/${token}`;

//         await mailSender(email, "Password Reset Link", `Password Reset Link: ${url}`);

//         return response.json({
//             success: true,
//             message: "Email sent successfully. Please check your inbox to reset password.",
//             token,
//         });
//     } catch (error) {
//         console.error(error);
//         return response.status(500).json({
//             success: false,
//             message: "Something went wrong while sending reset password link.",
//         });
//     }
// };

// // RESET PASSWORD
// exports.resetPassword = async (req, res) => {
//   try {
//     const { password, confirmPassword, token } = req.body;

//     console.log("Received token:", token);

//     if (password !== confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "Password and Confirm Password do not match.",
//       });
//     }

//     const userDetails = await User.findOne({ token });

//     console.log("Found user:", userDetails); // Should not be null

//     if (!userDetails) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired token.",
//       });
//     }

//     if (userDetails.resetPasswordExpires < Date.now()) {
//       return res.status(403).json({
//         success: false,
//         message: "Token expired. Please generate a new one.",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.findOneAndUpdate(
//       { token },
//       {
//         password: hashedPassword,
//         token: undefined,
//         resetPasswordExpires: undefined,
//       },
//       { new: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Password reset successfully.",
//     });
//   } catch (error) {
//     console.error("Reset Password Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while resetting the password.",
//     });
//   }
// };
