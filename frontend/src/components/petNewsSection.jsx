import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import "./petNewsSection.css";
import "./newsCard.css"; // for modal styles

export default function PetNewsSection() {
  const [newsItems, setNewsItems] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null); // new

  useEffect(() => {
    fetch("/pet-news.json")
      .then((res) => res.json())
      .then((data) => setNewsItems(data.news || []))
      .catch((err) => console.error("Error loading pet news:", err));
  }, []);

  useEffect(() => {
    if (selectedNews || newsItems.length <= 4) return;

    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setVisibleIndex((prevIndex) => (prevIndex + 4) % newsItems.length);
        setShow(true);
      }, 800);
    }, 6000);

    return () => clearInterval(interval);
  }, [newsItems, selectedNews]);

  const visibleItems = newsItems.slice(visibleIndex, visibleIndex + 4);

  const closeModal = () => setSelectedNews(null);

  return (
    <div className="pet-news-section position-relative">
  <h1 className="text-center-news">Pet News</h1>

  <div className={`row news-grid-transition ${show ? "news-fade-in" : "news-fade-out"}`}>
    {visibleItems.map((item) => (
      <div key={item.id} className="col-md-3 col-sm-6 col-12 mb-4">
        <NewsCard
          title={item.title}
          imageUrl={item.imageUrl}
          date={item.date}
          category={item.category}
          content={item.content}
          onReadMore={() => setSelectedNews(item)}
        />
      </div>
    ))}
  </div>

  {/* Scoped modal inside PetNewsSection */}
  {selectedNews && (
    <div className="news-modal-overlay local" onClick={closeModal}>
      <div className="news-modal" onClick={(e) => e.stopPropagation()}>
        <button className="news-modal-close" onClick={closeModal}>×</button>
        <img src={selectedNews.imageUrl} alt={selectedNews.title} className="news-modal-image" />
        <h2 className="news-modal-title">{selectedNews.title}</h2>
        <p className="news-modal-meta">
          <strong>{selectedNews.category}</strong> · {new Date(selectedNews.date).toLocaleDateString()}
        </p>
        <p className="news-modal-content">{selectedNews.content}</p>
      </div>
    </div>
  )}
</div>

  );
}
