import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import NavBar from "../components/NavBar";
import "./profile.css";
import ProfileInfo from "./profileInfo";
import PetCard from "./petCard";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pets");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("❌ No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const fetchProfileData = async () => {
      try {
        const endpoint = username
          ? `http://localhost:5555/users/profile/${username}`
          : "http://localhost:5555/users/me";

        const response = await axios.get(endpoint, { headers });
        console.log("✅ User Data:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
        alert("Failed to load profile.");
      }
    };

    const fetchUserPets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/api/pets/myPets",
          { headers }
        );
        console.log("✅ My Pet Cards:", response.data);
        setUserPets(response.data);
      } catch (error) {
        console.error("❌ Error fetching pet cards:", error);
        // if (error.response && error.response.status === 403) {
        //   console.warn("❌ Forbidden. Redirecting to login.");
        //   localStorage.removeItem("token");
        //   navigate("/login");
        // }
      }
    };
    Promise.all([fetchProfileData(), fetchUserPets()]).finally(() =>
      setLoading(false)
    );
  }, [username, navigate]);

  const handleAddPet = () => {
    navigate(`/petCardForm/${username || userData?.username}`);
  };

  const isOwnProfile = username;

  return (
    <>
      <NavBar user={userData} isGuest={!userData} />

      <div className="profile-page">
        {loading ? (
          <p>Loading profile...</p>
        ) : userData ? (
          <>
            <ProfileInfo
              profilePic={userData.profilePictureURL || "/default-profile.png"}
              username={userData.username || "User"}
              bio={userData.bio || "No bio available"}
              yearsPetting={userData.yearsPetting || 0}
              address={userData.address || "Nothing"}
            />

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

              {/* Only show Add Pet button if it's your own profile */}
              {isOwnProfile && (
                <button className="add-pet-btn" onClick={handleAddPet}>
                  <img src="/Paw.png" alt="Paw Icon" className="pawIcon" />
                  <FaPlus className="plus-icon" />
                </button>
              )}
            </div>

            <div className="tab-content">
              {activeTab === "pets" ? (
                <div className="pet-grid">
                  {userPets.length > 0 ? (
                    userPets.map((pet) => (
                      <PetCard
                        key={pet.petId}
                        petName={pet.name}
                        petImage={pet.petPhoto}
                        petBreed={pet.breed}
                        petGender={pet.sex}
                        petAge={pet.age}
                        petSize={pet.species}
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
