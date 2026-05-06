const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:5*60,
    }
});


const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

async function sendVerificationEmail(email,otp)
{
    try{
    const mailResponce = await mailSender(email,"Verification Email from StudyNotion",otpTemplate(otp));
    console.log("Email sent Successfully:",mailResponce);
    }
    catch(error)
    {
        console.log("error occured while sending mail",error)
        throw error;
    }
}

OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})
module.exports = mongoose.model("OTP",OTPSchema);

// const mongoose = require("mongoose");
// const mailSender = require("../utils/mailSender");

// const OTPSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//     },
//     otp: {
//         type: String,
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now, // Use Date.now without ()
//         expires: 5 * 60,
//     }
// });

// // Function to send emails
// async function sendVerificationEmail(email, otp) {
//     try {
//         const mailResponce = await mailSender(email, "Verification Email from StudyNotion", otp);
//         console.log("Email sent Successfully:", mailResponce);
//     } catch (error) {
//         console.log("Error occurred while sending mail", error)
//         throw error;
//     }
// }

// OTPSchema.pre("save", async function (next) {
//     await sendVerificationEmail(this.email, this.otp);
//     next();
// })

// module.exports = mongoose.model("OTP", OTPSchema);
