const express = require("express")
const route = express.Router();

const{signUp,login,changePassword,sendOTP}=require("../controller/Auth")
const{resetPasswordToken,resetPassword }= require("../controller/ResetPassword")
const {auth} = require("../middleware/auth")


//routes for user/User 
route.post("/signup",signUp)
route.post("/login",login)
route.post("/sendOTP",sendOTP)
route.post("/changePassword",auth,changePassword)

//reset password/ResetPassword
route.post("/resetPasswordToken",resetPasswordToken)
route.post("/resetPassword",resetPassword)

module.exports = route

// const express = require("express");
// const route = express.Router(); // express.Router() નો ઉપયોગ કરો

// const { signUp, login, changePassword, sendOTP } = require("../controller/Auth");
// const { resetPasswordToken, resetPassword } = require("../controller/ResetPassword");
// const { auth } = require("../middleware/auth");

// // Routes for user/Auth
// route.post("/signup", signUp);
// route.post("/login", login);
// route.post("/sendOTP", sendOTP);
// route.post("/changePassword", auth, changePassword);

// // Reset password routes
// route.post("/resetPasswordToken", resetPasswordToken);
// route.post("/resetPassword", resetPassword);

// module.exports = route; // CommonJS export - યોગ્ય રીતે export કરવા માટે
