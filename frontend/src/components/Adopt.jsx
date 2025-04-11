import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import AdoptionPost from "./Adoptionpost";
import AdoptionPostForm from "./AdoptionPostForm";
import "./Adopt.css";

// Decode JWT to extract username
function getUsernameFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub || payload.username || null;
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
}

function Adopt() {
  const [posts, setPosts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchBreed, setSearchBreed] = useState("");

  const token = localStorage.getItem("token");
  const currentUsername = getUsernameFromToken(token);

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5555/api/adoption-posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const timeout = setTimeout(fetchPosts, 2000); // Simulate loading
    return () => clearTimeout(timeout);
  }, [fetchPosts]);

  // Handle Add Post
  const handleAddPost = () => {
    setIsFormOpen(false);
    fetchPosts(); // Refresh after adding
  };

  // Handle Delete Post
  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    fetchPosts();
  };

  // Handle Update Post
  const handleUpdate = () => {
    fetchPosts(); // Re-fetch from backend
  };

  // Filter by breed
  const filteredPosts = posts.filter((post) =>
    post.petBreed?.toLowerCase().includes(searchBreed.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <NavBar />

      <main className="main-content">
        {/*  Search Bar */}
        <div className="search-add-container">
  <input
    type="text"
    className="search-input"
    placeholder="Search by breed..."
    value={searchBreed}
    onChange={(e) => setSearchBreed(e.target.value)}
  />

  <button className="adopt-add-btn-inline" onClick={() => setIsFormOpen(true)}>
    +
  </button>
</div>


        <div className="adoption-posts-wrapper">
          {loading ? (
            <div className="adoption-placeholder loading">
              <p>Loading adoption posts...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="adoption-card-wrapper">
                <AdoptionPost
                  data={post}
                  currentUsername={currentUsername}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              </div>
            ))
          ) : (
            <div className="adoption-placeholder empty">
              <img
                src="/images/empty-box.png"
                alt="No Posts"
                className="placeholder-image"
              />
              <p>No adoption posts found for this breed.</p>
            </div>
          )}
        </div>
      </main>

      {isFormOpen && (
        <div className="adopt-modal">
          <div className="adopt-modal-content">
            <button
              className="adopt-close-btn"
              onClick={() => setIsFormOpen(false)}
            >
              ×
            </button>
            <AdoptionPostForm onPostAdded={handleAddPost} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Adopt;
