// src/components/RaiseAPet.js
import React from 'react';
import Cat from './Cat';
import 'bootstrap/dist/css/bootstrap.min.css';

const RaiseAPet = () => {
  const cats = ['Hero', 'Hero', 'Hero', 'Hero'];

  return (
    <div className="container">
      <h1>Raise A Pet</h1>
      <p>Find out which Pet can survive the weather of your city!</p>
      <h2>Beirut</h2>
      <div className="d-flex flex-wrap">
        {cats.map((cat, index) => (
          <Cat key={index} name={cat} />
        ))}
      </div>
    </div>
  );
};

export default RaiseAPet;