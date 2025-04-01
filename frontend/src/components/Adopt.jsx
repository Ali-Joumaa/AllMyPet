import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import AdoptionPost from "./Adoptionpost";
import AdoptionPostForm from "./AdoptionPostForm";
import "./Adopt.css";

// ✅ Decode JWT to extract username
function getUsernameFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub || payload.username || null;
  } catch (e) {
    console.error("❌ Failed to decode token:", e);
    return null;
  }
}

function Adopt() {
  const [posts, setPosts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const currentUsername = getUsernameFromToken(token);

  // ✅ Fetch all posts
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
    const timeout = setTimeout(() => {
      fetchPosts();
    }, 2000); // simulate loading delay

    return () => clearTimeout(timeout);
  }, [fetchPosts]);

  // ✅ Add post and refresh
  const handleAddPost = (newPost) => {
    setIsFormOpen(false);
    fetchPosts(); // refresh all posts
  };

  // ✅ Delete post and refresh
  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    fetchPosts();
  };

  return (
    <div className="page-wrapper">
      <NavBar />

      <main className="main-content">
        <div className="adoption-posts-wrapper">
          {loading ? (
            <div className="adoption-placeholder loading">
              <p>Loading adoption posts...</p>
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="adoption-card-wrapper">
                <AdoptionPost
                  data={post}
                  currentUsername={currentUsername}
                  onDelete={handleDelete}
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
              <p>No adoption posts available at the moment.</p>
            </div>
          )}
        </div>
      </main>

      <button className="adopt-add-btn" onClick={() => setIsFormOpen(true)}>
        +
      </button>

      {isFormOpen && (
        <div className="adopt-modal">
          <div className="adopt-modal-content">
            <button className="adopt-close-btn" onClick={() => setIsFormOpen(false)}>
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
