import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import NavBar from "../components/NavBar"; // ✅ Import NavBar
import "./profile.css"; 
import ProfileInfo from "./profileInfo";
import PetCard from "./petCard";

const Profile = () => {
  const { username } = useParams(); // ✅ Get username from URL
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pets"); // ✅ Proper tab management

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("❌ No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    // ✅ Determine API endpoint (Own Profile or Another User)
    const endpoint = username 
      ? `http://localhost:5555/users/profile/${username}`  // ✅ Visiting another user's profile
      : "http://localhost:5555/users/me";                 // ✅ Viewing own profile

    axios
      .get(endpoint, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      })
      .then((response) => {
        console.log("✅ User Data Received:", response.data);
        setUserData(response.data);
        setUserPets(response.data.pets || []);
      })
      .catch((error) => {
        console.error("❌ Error fetching user data:", error);
        alert("Failed to load profile.");
      })
      .finally(() => setLoading(false));
  }, [username, navigate]);

  const handleAddPet = () => {
    navigate(`/petCardForm/${username}`);

  };

  return (
    <>
      {/* ✅ NavBar remains visible on the profile page */}
      <NavBar user={userData} isGuest={!userData} />

      <div className="profile-page">
        {loading ? (
          <p>Loading profile...</p>
        ) : userData ? (
          <>
            {/* ✅ Display User Info Dynamically */}
            <ProfileInfo
              profilePic={userData.profilePictureURL || "/default-profile.png"}
              username={userData.username || "User"}
              bio={userData.bio || "No bio available"}
            />

            {/* ✅ Tabs Section with Add Pet Button */}
            <div className="profile-tabs">
              <button 
                className={`tab-btn ${activeTab === "pets" ? "active" : ""}`} 
                onClick={() => setActiveTab("pets")}
              >
                Your Pets
              </button>
              <button 
                className={`tab-btn ${activeTab === "favorite" ? "active" : ""}`} 
                onClick={() => setActiveTab("favorite")}
              >
                Favorite
              </button>

              {/* ✅ Add Pet Button (Only for Own Profile) */}
              {username && (
                <button className="add-pet-btn" onClick={handleAddPet}>
                  <img src="/Paw.png" alt="Paw Icon" className="pawIcon" />
                  <FaPlus className="plus-icon" />
                </button>
              )}
            </div>

            {/* ✅ Dynamic Tab Content */}
            <div className="tab-content">
              {activeTab === "pets" ? (
                <div className="pet-grid">
                  {userPets.length > 0 ? (
                    userPets.map((pet) => (
                      <PetCard
                        key={pet.id}
                        petName={pet.name}
                        petImage={pet.image}
                        petBreed={pet.breed}
                        petGender={pet.gender}
                        petAge={pet.age}
                        petSize={pet.size}
                        petLocation={pet.location}
                        petDescription={pet.description}
                      />
                    ))
                  ) : (
                    <p>No pets found.</p>
                  )}
                </div>
              ) : (
                <div className="favorite">
                  <p>Here are your favorite pets!</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>Failed to load profile.</p>
        )}
      </div>
    </>
  );
};

export default Profile;
