import "./SignUp.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import DogAndCatImage from "../images/DogAndCat.svg";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="signup-container">
      <div className="signup-box">
        
        {/* Logo (Top Left)
        <div className="logo-container">
          <img src="/AllMyPetLogo.png" alt="AllMyPet Logo" className="logo-img" />
          <div className="paws-container">
            <img src="/paw.png" alt="Paw 1" className="paw" />
            <img src="/paw.png" alt="Paw 2" className="paw" />
          </div>
        </div> */}

        {/* Left Side - Image and Branding */}
        <div className="left">
          <h2 className="welcome-text">
            Welcome to <span className="highlight">AllMyPet</span> 🐾
          </h2>
          <img src={DogAndCatImage} alt="Pets" className="signup-image" />
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="right">
          <h2 className="signup-title">Let’s sign up 🐾</h2>
          <p className="subtitle">
            Already have an account? <Link to="/login" className="login-link">Login</Link>
          </p>
          <form className="signup-form">
            <div className="input-group">
              <FaUser className="icon" />
              <input type="text" placeholder="Full Name" className="input-field" required />
            </div>
            <div className="input-group">
              <FaUser className="icon" />
              <input type="text" placeholder="Username" className="input-field" required />
            </div>
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input type="email" placeholder="Email" className="input-field" required />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input type="password" placeholder="Password" className="input-field" required />
            </div>
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
