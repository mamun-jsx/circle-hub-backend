import axios from "axios";

async function testLogin() {
  try {
    console.log("Testing Login at https://event-circle-backend.vercel.app/api/login");
    const res = await axios.post("https://event-circle-backend.vercel.app/api/login", {
      email: "admin@gmail.com",
      password: "12345678"
    });
    console.log("Login Result:", res.data);
  } catch (error: any) {
    console.error("Login Failed:", error.response?.data || error.message);
  }
}

testLogin();
