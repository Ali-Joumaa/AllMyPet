import React from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./NavBar.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    return (
        <>
            <nav id ="navbar" className="navbar" >
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
                    <a href="./adopt">Adopt</a>
                    <a href="/#">Community</a>
                    {/* <a href="#">Raise A Pet</a> */}
                    <Link to="/raisePets">Raise A Pet</Link>
                    <Link to = '/vets'>Veterinarians</Link>
                </div> 

                {/* Right - Icons & Buttons */}
                <div className="nav-icons">
                    <button className="notification-button">
                        <FaBell />
                    </button>

                    <button className="user-button" onClick={() => {
                            navigate("/login");
                            console.log("Navigating to SignUp");
                        }}>
                        <FaUser className="mr-2" />
                        <span>
                            Login | Register
                        </span>{/* Wrap in <span> for spacing */}
                    </button>

                </div>
            </nav>

            {/* Bottom Bar */}
            <div className="navbar-bottom-bar"></div>
        </>
    );
}

export default NavBar;
