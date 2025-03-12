import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import DogAndCatImage from "../images/DogAndCat.svg";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/authService"; // ✅ Import API function
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const responseMessage = await signup(formData);
      setSuccess(responseMessage);
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2s
    } catch (errorMessage) {
      setError(errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* Left Side - Image and Branding */}
        <div className="leftt">
          <h2 className="welcome-text">
            Welcome to <span className="highlight">AllMyPet</span> 🐾
          </h2>
          <img src={DogAndCatImage} alt="Pets" className="signup-image" />
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="rightt">
          <h2 className="signup-title">Let’s sign up 🐾</h2>
          <p className="subtitle">
            Already have an account? <Link to="/login" className="login-link">Login</Link>
          </p>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser className="icon" />
              <input type="text" name="fullName" placeholder="Full Name" className="input-field" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <FaUser className="icon" />
              <input type="text" name="username" placeholder="Username" className="input-field" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input type="email" name="email" placeholder="Email" className="input-field" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input type="password" name="password" placeholder="Password" className="input-field" required onChange={handleChange} />
            </div>
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
