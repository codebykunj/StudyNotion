const mongoose = require('mongoose');
const axios = require('axios');
const OTP = require('./server/models/OTP');

async function debugSignup() {
  await mongoose.connect('mongodb://localhost:27017/StudyNotion');
  const testEmail = 'test.inst2@example.com';
  
  // 1. Send OTP via API
  console.log("Sending OTP...");
  try {
    await axios.post('http://localhost:4000/api/v1/users/sendOTP', { email: testEmail });
  } catch (e) {
    console.error("Failed to send OTP", e.response ? e.response.data : e.message);
    return;
  }
  
  // 2. Fetch OTP from DB
  console.log("Fetching OTP from DB...");
  const recentOtp = await OTP.find({ email: testEmail }).sort({ createdAt: -1 }).limit(1);
  if (!recentOtp || recentOtp.length === 0) {
    console.log("No OTP found in DB.");
    return;
  }
  const otpCode = recentOtp[0].otp;
  console.log("Found OTP:", otpCode);
  
  // 3. Try to signup as Instructor
  console.log("Signing up as Instructor...");
  try {
    const signupData = {
      accountType: "Instructor",
      firstName: "Test",
      lastName: "Inst",
      email: testEmail,
      password: "password123",
      confirmPassword: "password123",
      otp: otpCode
    };

    const res = await axios.post('http://localhost:4000/api/v1/users/signup', signupData);
    console.log("Signup Response:", res.data);
  } catch(e) {
    if (e.response) {
      console.error("Signup Error:", e.response.data);
    } else {
      console.error("Signup Error:", e.message);
    }
  } finally {
    process.exit(0);
  }
}

debugSignup();
