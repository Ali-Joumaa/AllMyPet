// src/components/Cat.js
import React from 'react';

const Cat = ({ name }) => {
  return (
    <div className="card" style={{ width: '18rem', margin: '10px' }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">This is a {name} cat that can survive the weather in your city.</p>
      </div>
    </div>
  );
};

export default Cat;