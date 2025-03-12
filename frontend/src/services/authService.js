import axios from "axios";

const API_URL = "http://localhost:5555/api/auth";

export const signup = async (formData) => {
  try {
    // Split full name into firstName and lastName
    const nameParts = formData.fullName.trim().split(" ");
    const firstname = nameParts[0];
    const lastname = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const requestBody = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstname,
      lastname,
    }; 

    const response = await axios.post(`${API_URL}/signup`, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("✅ Signup successful:", response.data); // ✅ Debug response

    return response.data; // Return response data (success message)
  } catch (error) {
    throw error.response?.data || "Signup failed. Try again.";
  }
};

// ✅ Login function
export const login = async (formData) => {
  try {
    const requestBody = {
      username: formData.username,
      password: formData.password,
    };

    const response = await axios.post(`${API_URL}/login`, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("✅ Login successful:", response.data);
    
     // ✅ Store only the token and username
     localStorage.setItem("token", response.data.token);
     localStorage.setItem("username", response.data.username);
 
     return "Login successful! Redirecting...";  // ✅ Returning a string for React to render


  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    throw error.response?.data || "Login failed. Try again.";
  }
};
