import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaPinterest,
  FaTumblr,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css"; // Import the CSS file

function Footer() {
  const navigate = useNavigate();
  const handleAdoptClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/adopt");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: How Can We Help? */}
        <div className="footer-section">
          <h3>How Can We Help?</h3>
          <ul>
            <li>
              <a href="" onClick={handleAdoptClick}>Adopt a pet</a>
            </li>
            <li>
              <a href="" onClick={handleAdoptClick}>Rehome a pet</a>
            </li>
            <li>
              <a href="/#">Adopt FAQ's</a>
            </li>
            <li>
              <a href="/#">Rehome FAQ's</a>
            </li>
          </ul>
        </div>

        {/* Column 2: Contact Us */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            <FaMapMarkerAlt className="icon" /> American University of Beirut
          </p>
          <p>
            <FaPhone className="icon" /> (+961) 71111567
          </p>
          <p>
            <FaEnvelope className="icon" /> AllMyPets@gmail.com
          </p>
        </div>

        {/* Column 3: Keep in Touch */}
        <div className="footer-section">
          <h3>Keep In Touch With Us</h3>
          <p>
            Join the AllMyPets newsletter and be first to hear about news
          </p>
          <div className="subscribe">
            <div className="email-input-container">
              <FaEnvelope className="email-icon" />
              <input type="email" placeholder="E-mail Address" />
            </div>
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>©2025 AllMyPet.com</p>
        <div className="social-icons">
          <a href="/#">
            <FaFacebook />
          </a>
          <a href="/#">
            <FaPinterest />
          </a>
          <a href="/#">
            <FaTumblr />
          </a>
          <a href="/#">
            <FaInstagram />
          </a>
          <a href="/#">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;