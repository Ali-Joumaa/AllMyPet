import React from "react";
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
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: How Can We Help? */}
        <div className="footer-section">
          <h3>How Can We Help?</h3>
          <ul>
            <li>
              <a href="#">Adopt a pet</a>
            </li>
            <li>
              <a href="#">Rehome a pet</a>
            </li>
            <li>
              <a href="#">Adopt FAQ's</a>
            </li>
            <li>
              <a href="#">Rehome FAQ's</a>
            </li>
          </ul>
        </div>

        {/* Column 2: Contact Us */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            <FaMapMarkerAlt className="icon" /> 123 Main Street, Anytown, USA
          </p>
          <p>
            <FaPhone className="icon" /> +1 (555) 123-4567
          </p>
          <p>
            <FaEnvelope className="icon" /> FurryFriendsSupport@gmail.com
          </p>
        </div>

        {/* Column 3: Keep in Touch */}
        <div className="footer-section">
          <h3>Keep In Touch With Us</h3>
          <p>
            Join the FurryFriends magazine and be first to hear about news
          </p>
          <div className="subscribe">
            <div className="email-input-container">
              <FaEnvelope className="email-icon" />
              <input type="email" placeholder="E-mail Address" />
            </div>
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>©2025 AllMyPet.com</p>
        <div className="social-icons">
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaPinterest />
          </a>
          <a href="#">
            <FaTumblr />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;