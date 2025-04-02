import React, { useState } from "react";
import "./Adoptionpost.css";
import AdoptionPostEditForm from "./AdoptionPostEditForm";

const AdoptionPost = ({ data, currentUsername, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);

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
      if (onDelete) onDelete(data.id); // Inform parent to remove the post
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Something went wrong while deleting.");
    }
  };

  const handleUpdate = (updatedPost) => {
    alert("Post updated successfully!");
    setEditMode(false);
    if (onUpdate) {
      onUpdate(updatedPost); // pass new data to parent
    }
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
            <div className="adoption-profile">
              <img
                src={data.user.profilePictureURL || "/default-profile.png"}
                alt="Profile"
                className="adoption-profile-pic"
              />
              <div className="adoption-user-info">
                <h2>{data.user.username}</h2>
                <p className="adoption-date">{data.postedDate}</p>
              </div>
            </div>

            <div className="adoption-actions">
              <button className="adoption-available-btn">{data.status}</button>

              {data.user.username === currentUsername && (
                <>
                  <button
                    className="adoption-edit-btn"
                    onClick={() => setEditMode(true)}
                    title="Edit Post"
                  >
                    ✏️
                  </button>
                  <button
                    className="adoption-delete-btn"
                    onClick={handleDelete}
                    title="Delete Post"
                  >
                    🗑
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="adoption-title-container">
            <h1 className="adoption-title">{data.title}</h1>
            <div className="adoption-toggle-container">
              <label className="adoption-toggle">
                <img
                  src={data.imageUrl || "/default-pet.png"}
                  alt="Pet"
                  className="adoption-pet-pic"
                />
              </label>
              <span className="toggle-label">{data.petName}</span>
            </div>
          </div>

          <p className="adoption-description">{data.description}</p>
          <p className="adoption-type">Adoption Type: {data.adoptionType}</p>
        </>
      )}
    </div>
  );
};

export default AdoptionPost;
