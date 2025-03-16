import React, { useState } from "react";
import { FaPlus } from "react-icons/fa"; // Import plus icon
import "./profile.css"; // Keep the same CSS
import ProfileInfo from "./profileInfo";
import PetCard from "./petCard"; // Import PetCard component
import pitter from "../images/pitter.png";

// Sample Pet Data
const samplePets = [
  
  { id: 4, petName: "Milo", petImage: "/pet4.jpg", petBreed: "Beagle", petGender: "Male", petAge: "2.5 Years", petSize: "Small", petLocation: "Florida", petDescription: "Loves playing fetch." },
  { id: 5, petName: "Bella", petImage: "/pet5.jpg", petBreed: "Poodle", petGender: "Female", petAge: "3 Years", petSize: "Small", petLocation: "Chicago", petDescription: "Smart and elegant." },
  { id: 6, petName: "Rocky", petImage: "/pet6.jpg", petBreed: "Labrador", petGender: "Male", petAge: "4 Years", petSize: "Large", petLocation: "Seattle", petDescription: "Great with families!" },
  { id: 7, petName: "Coco", petImage: "/pet7.jpg", petBreed: "Chihuahua", petGender: "Female", petAge: "1 Year", petSize: "Small", petLocation: "Arizona", petDescription: "Tiny but full of energy!" },
  { id: 8, petName: "Charlie", petImage: pitter, petBreed: "Pug", petGender: "Male", petAge: "3.5 Years", petSize: "Small", petLocation: "Nevada", petDescription: "Loves sleeping and eating." },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("pets");

  const handleAddPet = () => {
    alert("Add Pet button clicked! Implement functionality here.");
  };

  return (
    <div className="profile-page">
      <ProfileInfo 
        profilePic="" // Leave empty to test the default profile pic
        username="username123"
        bio="Loving pet owner and animal enthusiast!"
      />

      {/* Tabs Section with Add Pet Button */}
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

        {/* Add Pet Button (Paw with Plus) */}
        <button className="add-pet-btn" onClick={handleAddPet}>
          <img src="/Paw.png" alt="Paw Icon" className="pawIcon" />
          <FaPlus className="plus-icon" />
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "pets" ? (
          <div className="pet-grid">
            {samplePets.map((pet) => (
              <PetCard 
                petName={pet.petName} 
                petImage={pet.petImage} 
                petBreed={pet.petBreed} 
                petGender={pet.petGender} 
                petAge={pet.petAge} 
                petSize={pet.petSize} 
                petLocation={pet.petLocation} 
                petDescription={pet.petDescription} 
              />
            ))}
          </div>
        ) : (
          <div className="favorite">
            <p>Here are your favorite pets!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
