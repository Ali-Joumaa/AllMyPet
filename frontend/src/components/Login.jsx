import "./Login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import DogAndCatImage from "../images/DogAndCat.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";

export default function Login() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
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
        const responseMessage = await login(formData);
        setSuccess(responseMessage);
        setTimeout(() => navigate("/home"), 2000); // Redirect to login after 2s
      } catch (errorMessage) {
        setError(errorMessage);
      }
    };

  return (
    <div className="login-container">
      <div className="login-box">

        
        {/* <div className="Logo-container">
                      <div className="Logo">
                          <img src="/AllMyPetLogo.png" alt="AllMyPet Logo" className="Logo-img" />
                      </div>
                      <div className="paws-container">
                          <img src="/paw.png" alt="Paw 1" className="paw paw1" />
                          <img src="/paw.png" alt="Paw 2" className="paw paw2" />
                          <img src="/paw.png" alt="Paw 3" className="paw paw3" />
                          <img src="/paw.png" alt="Paw 4" className="paw paw4" />
                      </div>
                  </div> */}
        


        {/* Left Side - Image and Branding */}
        <div className="left">
          <h2 className="welcome-text">
            Welcome to <span className="highlight">AllMyPet</span> 🐾
          </h2>
          <img src={DogAndCatImage} alt="Pets" className="login-image" />
        </div>

        {/* Right Side - Login Form */}
        <div className="right">
          <h2 className="login-title">Get Started 🐾</h2>
          <p className="subtitle">
            Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
          </p>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input type="text" name="username" placeholder="Username" className="input-field" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input type="password" name="password" placeholder="Password" className="input-field" required onChange={handleChange} />
            </div>
            <Link to="/forgetpassword" className="forgot-password">Forgot Password?</Link>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
