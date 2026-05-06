// const express = require("express")
// const route = express.Router()

// const { auth,  isStudent  } = require("../middleware/auth")
// const{capturePayment,verifySignature,sendPaymentSuccessEmail}=require("../controller/Payments")

// route.post("/capturePayment", auth, isStudent, capturePayment)
// route.post("/verifyPayment",auth, isStudent, verifySignature)
// //aa niche nu extra che remove kari sako cho.....
// route.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);


// module.exports = route

const express = require("express");
const route = express.Router();

const { auth, isStudent } = require("../middleware/auth");
const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controller/Payments");

// Capture Payment
route.post("/capturePayment", auth, isStudent, capturePayment);

// Verify Payment
route.post("/verifyPayment", auth, isStudent, verifyPayment);

// Optional: Send Payment Success Email
route.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = route;