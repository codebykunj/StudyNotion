const axios = require('axios');

async function testSignup() {
  try {
    const signupData = {
      accountType: "Instructor",
      firstName: "Test",
      lastName: "Inst",
      email: "test.inst@example.com",
      password: "password123",
      confirmPassword: "password123",
      otp: "123456" // We need a valid OTP, or we'll get "Invalid OTP"
    };

    const res = await axios.post('http://localhost:4000/api/v1/users/signup', signupData);
    console.log(res.data);
  } catch(e) {
    if (e.response) {
      console.error(e.response.data);
    } else {
      console.error(e.message);
    }
  }
}

testSignup();
