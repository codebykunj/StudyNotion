const axios = require('axios');

async function debugSignup() {
  const testEmail = 'test.inst5@example.com';

  // 1. Send OTP via API
  console.log("Sending OTP...");
  let otpCode;
  try {
    const res = await axios.post('http://localhost:4000/api/v1/users/sendOTP', { email: testEmail });
    otpCode = res.data.otp;
    console.log("Found OTP from response:", otpCode);
  } catch (e) {
    console.error("Failed to send OTP", e.response ? e.response.data : e.message);
    process.exit(1);
  }

  // 2. Try to signup as Instructor
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
  } catch (e) {
    if (e.response) {
      console.error("Signup Error:", e.response.data);
    } else {
      console.error("Signup Error:", e.message);
    }
  }
}

debugSignup();
