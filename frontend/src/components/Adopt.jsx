import React, { useState, useEffect } from "react";
import NavBar from "./NavBar"; 
import Footer from "./Footer"; 
import AdoptionPost from "./Adoptionpost";
import AdoptionPostForm from "./AdoptionPostForm";
import "./Adopt.css";

function Adopt() {
    const [posts, setPosts] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch("http://localhost:5555/api/adoption-posts", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }finally {
                setLoading(false); // ✅ Now it's only called once the fetch finishes
              }
        };

        fetchPosts();
    }, 2000);
    }, []);

    const handleAddPost = (newPost) => {
        setPosts([...posts, newPost]);
        setIsFormOpen(false);
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
                    posts.map((post, index) => (
                    <div key={index} className="adoption-card-wrapper">
                        <AdoptionPost data={post} />
                    </div>
                    ))
                ) : (
                    <div className="adoption-placeholder empty">
                    <img src="/images/empty-box.png" alt="No Posts" className="placeholder-image" />
                    <p>No adoption posts available at the moment.</p>
                    </div>
                )}
                </div>
                </main>


            <button className="adopt-add-btn" onClick={() => setIsFormOpen(true)}>+</button>

            {isFormOpen && (
                <div className="adopt-modal">
                    <div className="adopt-modal-content">
                        <button className="adopt-close-btn" onClick={() => setIsFormOpen(false)}>×</button>
                        <AdoptionPostForm onPostAdded={handleAddPost} />
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Adopt;
