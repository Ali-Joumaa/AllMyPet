import React from "react";
import { FaBell, FaUser } from "react-icons/fa";
import "./NavBar.css"; // Import the CSS file

function NavBar() {
    return (
        <>
            <nav className="navbar">
                {/* Left - Logo + Paw Prints */}
                <div className="logo-container">
                    <div className="logo">
                        <img src="/AllMyPetLogo.png" alt="AllMyPet Logo" className="logo-img" />
                    </div>
                    <div className="paws-container">
                        <img src="/paw.png" alt="Paw 1" className="paw paw1" />
                        <img src="/paw.png" alt="Paw 2" className="paw paw2" />
                        <img src="/paw.png" alt="Paw 3" className="paw paw3" />
                        <img src="/paw.png" alt="Paw 4" className="paw paw4" />
                    </div>
                </div>

                {/* Middle - Navigation Links */}
                <div className="nav-links">
                    <a href="#">Home</a>
                    <a href="#">Adopt</a>
                    <a href="#">Community</a>
                    <a href="#">Raise A Pet</a>
                    <a href="#">Veterinarians</a>
                </div>

                {/* Right - Icons & Buttons */}
                <div className="nav-icons">
                    <button className="notification-button">
                        <FaBell />
                    </button>

                    <button className="user-button">
                        <FaUser className="mr-2" />
                        <span>Login | Register</span> {/* Wrap in <span> for spacing */}
                    </button>

                </div>
            </nav>

            {/* Bottom Bar */}
            <div className="navbar-bottom-bar"></div>
        </>
    );
}

export default NavBar;
