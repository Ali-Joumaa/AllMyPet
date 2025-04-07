import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Adoptionpost.css";
import AdoptionPostEditForm from "./AdoptionPostEditForm";
import PetDetailsModal from "./PetDetailsModal";
import pitterImage from "../images/pitter.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faMessage, faBars } from "@fortawesome/free-solid-svg-icons";

const AdoptionPost = ({ data, currentUsername, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5555/api/adoption-posts/${data.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert("Failed to delete: " + errorText);
        return;
      }

      alert("Post deleted successfully!");
      if (onDelete) onDelete(data.id);
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Something went wrong while deleting.");
    }
  };

  const handleUpdate = (updatedPost) => {
    alert("Post updated successfully!");
    setEditMode(false);
    if (onUpdate) onUpdate(updatedPost);
  };

  const goToProfile = () => {
    const username = data.user.username;
    navigate(username === currentUsername ? "/profile/me" : `/profile/${username}`);
  };

  return (
    <div className="adoption-card">
      {editMode ? (
        <AdoptionPostEditForm
          postData={data}
          onPostUpdated={handleUpdate}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <>
          <div className="adoption-header">
            <div className="adoption-profile" onClick={goToProfile} style={{ cursor: "pointer" }}>
              <img
                src={data.user.profilePictureURL || pitterImage}
                alt="Profile"
                className="adoption-profile-pic"
              />
              <div className="adoption-user-info">
                <h2 className="username-with-message">
                  {data.user.username}
                  {data.user.username !== currentUsername && (
                    <FontAwesomeIcon
                      icon={faMessage}
                      className="message-icon"
                      title="Message this user"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Messaging ${data.user.username}...`);
                      }}
                    />
                  )}
                </h2>
                <p className="adoption-date">{data.postedDate}</p>
              </div>
            </div>

            <div className="adoption-actions-wrapper">
              <button
                className={`adoption-available-btn ${
                  data.status !== "Available" ? "not-available" : ""
                } ${showActions ? "pushed-left" : ""}`}
              >
                {data.status}
              </button>

              {data.user.username === currentUsername && (
                <div className="actions-menu">
                  <FontAwesomeIcon
                    icon={faBars}
                    className="actions-toggle-icon"
                    onClick={() => setShowActions(!showActions)}
                  />
                  {showActions && (
                    <div className="actions-dropdown">
                      <button
                        className="adoption-edit-btn"
                        onClick={() => {
                          setEditMode(true);
                          setShowActions(false);
                        }}
                        title="Edit Post"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        className="adoption-delete-btn"
                        onClick={() => {
                          handleDelete();
                          setShowActions(false);
                        }}
                        title="Delete Post"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="adoption-title-container">
            <h1 className="adoption-title">{data.title}</h1>
            <div className="adoption-toggle-container">
              <div
                className="pet-badge"
                onClick={() =>
                  setSelectedPet({
                    petPhoto: data.imageUrl,
                    name: data.petName,
                    species: data.petSpecies,
                    breed: data.petBreed,
                    sex: data.petSex,
                    age: data.petAge,
                    location: data.petLocation,
                    status: data.status,
                    description: data.description,
                    vaccines: data.vaccines || "",
                    healthInfo: data.healthInfo || "",
                    username: data.user?.username || "Unknown",
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <img
                  src={
                    data.imageUrl ||
                    "https://i0.wp.com/meissaprint.co.uk/wp-content/uploads/2022/06/mini-paw.png?fit=2084%2C2084&ssl=1"
                  }
                  alt="Pet"
                  className="pet-badge-avatar"
                />
                <span className="pet-badge-name">{data.petName}</span>
              </div>
            </div>
          </div>

          <p className="adoption-description">{data.description}</p>
          <p className="adoption-type">Adoption Type: {data.adoptionType}</p>
        </>
      )}

      {selectedPet && <PetDetailsModal pet={selectedPet} onClose={() => setSelectedPet(null)} />}
    </div>
  );
};

export default AdoptionPost;
