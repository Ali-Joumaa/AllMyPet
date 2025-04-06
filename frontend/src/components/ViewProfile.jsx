import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import ProfileInfo from "./profileInfo";
import PetCard from "./petCard";
import PetDetailsModal from "./PetDetailsModal";
import "./profile.css";

const ViewProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
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
        const response = await axios.get(
          `http://localhost:5555/users/profile/${username}`,
          { headers }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
        alert("Failed to load profile.");
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/api/favorites/my-favorites",
          { headers }
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("❌ Error fetching favorites:", error);
      }
    };

    const fetchUserPets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/pets/userPets/${username}`,
          { headers }
        );
        setUserPets(response.data);
      } catch (error) {
        console.error("❌ Error fetching user pets:", error);
      }
    };

    Promise.all([fetchProfileData(), fetchUserPets(), fetchFavorites()]).finally(() =>
      setLoading(false)
    );
  }, [username, navigate]);

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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await updatedFavorites.json();
      setFavorites(data);
    } catch (err) {
      console.error("❌ Error toggling favorite:", err);
    }
  };

  return (
    <>
      <NavBar user={userData} isGuest={true} />
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
              isOwnProfile={false} // ✅ Guest view: no edit icon
              updateUser={() => {}} // ✅ Dummy function to avoid error
            />

            <div className="profile-tabs">
              <button className="tab-btn active">Their Pets</button>
            </div>

            <div className="tab-content">
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
                      onEdit={null} // ❌ No edit button for guest
                      isFavorite={favorites.some((f) => f.petId === pet.petId)}
                      onToggleFavorite={() => handleToggleFavorite(pet.petId)}
                    />
                  ))
                ) : (
                  <p>No pets found.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Failed to load profile.</p>
        )}
      </div>

      {selectedPet && (
        <PetDetailsModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
      )}
    </>
  );
};

export default ViewProfile;
