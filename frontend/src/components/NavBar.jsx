import React, { useEffect, useState } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ To fetch user data
import "./NavBar.css";

function NavBar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isGuest, setIsGuest] = useState(true);

    const handleProtectedNavigation = (path) => {
        if (isGuest) {
          navigate("/login");
        } else {
          navigate(path);
        }
      };
      

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsGuest(true);
            return;
        }

        // ✅ Fetch logged-in user details
        axios
            .get("http://localhost:5555/users/me", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                setUser(response.data);
                setIsGuest(false);
            })
            .catch((error) => {
                console.error("❌ Failed to fetch user:", error);
                setIsGuest(true);
            });
    }, []);

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
                        <img src="/Paw.png" alt="Paw 1" className="paw paw1" />
                        <img src="/Paw.png" alt="Paw 2" className="paw paw2" />
                        <img src="/Paw.png" alt="Paw 3" className="paw paw3" />
                        <img src="/Paw.png" alt="Paw 4" className="paw paw4" />
                    </div>
                </div>

                {/* Middle - Navigation Links */}
                <div className="nav-links">
                    <Link to="/home">Home</Link> 
                    <Link to="/#" onClick={(e) => {e.preventDefault(); handleProtectedNavigation("/adopt");}}>Adopt</Link>
                    
                    <a href="./form">Community</a>


                    <Link to="/#" onClick={(e) => {e.preventDefault(); handleProtectedNavigation("/raisePets");}}>Raise A Pet</Link>
                    <Link to="/#" onClick={(e) => {e.preventDefault(); handleProtectedNavigation("/vets");}}>Veterinarians</Link>
                    
                </div>

                {/* Right - Icons & User Section */}
                <div className="nav-icons">
                    <button className="notification-button">
                        <FaBell />
                    </button>

                    {isGuest ? (
                        // Guest View: Show Login/Register button
                        <button className="user-button" onClick={() => navigate("/login")}>
                            <FaUser className="mr-2" />
                            <span>Login | Register</span>
                        </button>
                    ) : (
                        // Logged-in User View
                        <div className="user-info">
                            {/* ✅ Profile Picture (Clickable) */}
                            
                            
                            {/* ✅ Username (Clickable) */}
                            <button className="username-button" onClick={() => navigate("/profile/me")}>
                                <img 
                                src={user.profilePictureURL || "/default-profile.png"} 
                                alt="User Profile" 
                                className="user-avatar" 
                                onClick={() => navigate(`/profile/${user.username}`)} // ✅ Navigates to the correct profile
                                style={{ cursor: "pointer" }} 
                            />
                            {user.username || "User"}
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
