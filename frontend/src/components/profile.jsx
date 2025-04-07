import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import NavBar from "../components/NavBar";
import ProfileInfo from "./profileInfo";
import PetCard from "./petCard";
import PetDetailsModal from "../components/PetDetailsModal";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pets");
  const [selectedPet, setSelectedPet] = useState(null);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    if (!token) {
      console.warn("❌ No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:5555/users/me", { headers });
        setUserData(response.data);
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
        alert("Failed to load profile.");
      }
    };

    const fetchUserPets = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/pets/myPets", { headers });
        setUserPets(response.data);
      } catch (error) {
        console.error("❌ Error fetching pet cards:", error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/favorites/my-favorites", { headers });
        setFavorites(response.data);
      } catch (error) {
        console.error("❌ Error fetching favorites:", error);
      }
    };

    Promise.all([fetchProfileData(), fetchUserPets(), fetchFavorites()]).finally(() =>
      setLoading(false)
    );
  }, [navigate]);

  const handleAddPet = () => {
    navigate("/PetCardForm");
  };

  const handleEditPet = (pet) => {
    navigate(`/PetCardForm/${pet.petId}`, { state: { pet } });
  };

  const handleToggleFavorite = async (petId) => {
    try {
      const isAlreadyFavorite = favorites.some((f) => f.petId === petId);

      const url = isAlreadyFavorite
        ? `http://localhost:5555/api/favorites/remove/${petId}`
        : `http://localhost:5555/api/favorites/add/${petId}`;

      const response = await fetch(url, {
        method: isAlreadyFavorite ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const updatedFavorites = await fetch(
        "http://localhost:5555/api/favorites/my-favorites",
        { headers }
      );
      const data = await updatedFavorites.json();
      setFavorites(data);
    } catch (err) {
      console.error("❌ Error toggling favorite:", err);
    }
  };

  return (
    <>
      <NavBar user={userData} isGuest={false} />
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
              isOwnProfile={true}
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

              <button className="add-pet-btn" onClick={handleAddPet}>
                <img src="/Paw.png" alt="Paw Icon" className="pawIcon" />
                <FaPlus className="plus-icon" />
              </button>
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
                        petSex={pet.sex}
                        petAge={pet.age}
                        petSpecies={pet.species}
                        petLocation={pet.location}
                        petDescription={pet.description}
                        petData={pet}
                        onMoreInfo={setSelectedPet}
                        onEdit={handleEditPet}
                        isFavorite={favorites.some(f => f.petId === pet.petId)}
                        onToggleFavorite={() => handleToggleFavorite(pet.petId)}
                      />
                    ))
                  ) : (
                    <p>No pets found.</p>
                  )}
                </div>
              ) : (
                <div className="pet-grid">
                  {favorites.length > 0 ? (
                    favorites.map((fav) => (
                      <PetCard
                        key={fav.petId}
                        petName={fav.petName}
                        petImage={fav.imageUrl}
                        petBreed={fav.breed}
                        petSex={fav.sex}
                        petAge={fav.age}
                        petSpecies={fav.petSpecies}
                        petLocation={fav.location}
                        petDescription={fav.description}
                        petData={fav}
                        onMoreInfo={setSelectedPet}
                        onToggleFavorite={() => handleToggleFavorite(fav.petId)}
                        isFavorite={true}
                      />
                    ))
                  ) : (
                    <p>No favorites yet.</p>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <p>Failed to load profile.</p>
        )}
      </div>

      {selectedPet && (
        <PetDetailsModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
        />
      )}
    </>
  );
};

export default Profile;
