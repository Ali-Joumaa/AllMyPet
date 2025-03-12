import "./ForgetPassword.css";
import { FaEnvelope } from "react-icons/fa";
import DogAndCatImage from "../images/DogAndCat.svg";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  return (
    <div className="forget-password-container">
      <div className="forget-password-box">
        
        {/* Logo (Top Left)
        <div className="logo-container">
          <img src="/AllMyPetLogo.png" alt="AllMyPet Logo" className="logo-img" />
          <div className="paws-container">
            <img src="/paw.png" alt="Paw 1" className="paw" />
            <img src="/paw.png" alt="Paw 2" className="paw" />
          </div>
        </div> */}

        {/* Left Side - Image and Branding */}
        <div className="leftt">
          <h2 className="welcome-text">
            Forgot your password? <span className="highlight">No worries!</span> 🐾
          </h2>
          <img src={DogAndCatImage} alt="Pets" className="forget-password-image" />
        </div>

        {/* Right Side - Forget Password Form */}
        <div className="rightt">
          <h2 className="forget-password-title">Reset Password 🐾</h2>
          <p className="subtitle">
            Enter your email to receive a reset link.
          </p>
          <form className="forget-password-form">
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input type="email" placeholder="Email" className="input-field" required />
            </div>
            <button type="submit" className="reset-button">Send Reset Link</button>
          </form>
          <p className="back-to-login">
            Remember your password? <Link to="/login" className="login-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
