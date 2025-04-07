import React from "react";
import "./newsCard.css";

export default function NewsCard({ title, imageUrl, date, category, content, onReadMore }) {
  return (
    <div className="news-card">
      <img src={imageUrl} alt={title} className="news-card-image" />
      <div className="news-card-content">
        <div className="news-card-header">
          <span className="news-card-category">{category}</span>
          <span className="news-card-date">{new Date(date).toLocaleDateString()}</span>
        </div>
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-description">
          {content.length > 100 ? content.substring(0, 100) + "..." : content}
        </p>
        <button className="news-card-button" onClick={onReadMore}>Read More</button>
      </div>
    </div>
  );
}
