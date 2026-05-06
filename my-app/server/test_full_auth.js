const axios = require('axios');
const mongoose = require('mongoose');

async function testAuthFlow() {
  const testEmail = `test.user.${Date.now()}@example.com`;
  const password = "password123";

  // 1. Send OTP
  console.log("-> Sending OTP...");
  let otpCode;
  try {
    const res = await axios.post('http://localhost:4000/api/v1/user/sendOTP', { email: testEmail });
    otpCode = res.data.otp;
    console.log("OTP:", otpCode);
  } catch (e) {
    
    try {
        const res2 = await axios.post('http://localhost:4000/api/v1/auth/sendOTP', { email: testEmail });
        otpCode = res2.data.otp;
        console.log("OTP (auth route):", otpCode);
    } catch (e2) {
        console.log("Failed to send OTP", e2.response?.data || e2.message);
        return;
    }
  }

  // 2. Signup
  console.log("-> Signing up...");
  try {
    const signupData = {
      accountType: "Student",
      firstName: "Test",
      lastName: "User",
      email: testEmail,
      password: password,
      confirmPassword: password,
      otp: otpCode,
      contactNumber: "1234567890"
    };

    let res;
    try {
        res = await axios.post('http://localhost:4000/api/v1/user/signup', signupData);
    } catch (e) {
        res = await axios.post('http://localhost:4000/api/v1/auth/signup', signupData);
    }
    console.log("Signup Response:", res.data.message);
  } catch (e) {
    console.log("Signup Error:", e.response?.data || e.message);
    return;
  }

  // 3. Login
  console.log("-> Logging in...");
  try {
    let res;
    try {
        res = await axios.post('http://localhost:4000/api/v1/user/login', { email: testEmail, password });
    } catch (e) {
         res = await axios.post('http://localhost:4000/api/v1/auth/login', { email: testEmail, password });
    }
    console.log("Login Response:", res.data.message, !!res.data.token);
  } catch (e) {
    console.log("Login Error:", e.response?.data || e.message);
  }
}

testAuthFlow();
