import React from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import "./NavBar.css"; // Import the CSS file

function NavBar({ user, isGuest }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from storage
        navigate("/login"); // Redirect to login page
    };

    return (
        <>
            <nav id="navbar" className="navbar">
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
                    <Link to="/home">Home</Link>
                    <Link to="/adopt">Adopt</Link>
                    <a href="./form">Community</a>
                    <Link to="/raisePets">Raise A Pet</Link>
                    <Link to="/vets">Veterinarians</Link>
                </div> 

                {/* Right - Icons & User Section */}
                <div className="nav-icons">
                    <button className="notification-button">
                        <FaBell />
                    </button>

                    {isGuest || !user ? (
                        // Guest View: Show Login/Register button
                        <button className="user-button" onClick={() => navigate("/login")}>
                            <FaUser className="mr-2" />
                            <span>Login | Register</span>
                        </button>
                    ) : (
                        // Logged-in User View
                        <div className="user-info">
                            {/* Profile Picture (Handles Undefined) */}
                            <img 
                                src={user.profilePictureURL || "/default-user.png"} 
                                alt="User Profile" 
                                className="user-avatar" 
                                onClick={() => navigate("/profile")} // Navigate to profile on click
                                style={{ cursor: "pointer" }} // Make cursor pointer for clickable effect
                            />
                            
                            {/* Username (Clickable) */}
                            <button className="username-button" onClick={() => navigate("/profile")}>
                                Welcome, {user.username || "User"}!
                            </button>

                            {/* Logout Button */}
                            <button className="logout-button" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Bottom Bar */}
            <div className="navbar-bottom-bar"></div>
        </>
    );
}

export default NavBar;
