import React from 'react';

const Step = ({ number, title, description, image, arrow }) => {
  return (
    <div className="step">
      {/* Step Number */}
      <div className="step-number">
        <h2>{number}</h2>
      </div>

      {/* Step Content */}
      <div className="step-content">
        <h3 className="step-title">{title}</h3>
        <p className="step-description">{description}</p>
      </div>

      {/* Step Image */}
      <div className="step-image">
        <img src={image} alt={`Step ${number}`} className="img-fluid" />
      </div>

      {/* Arrow (if applicable) */}
      {arrow && (
        <div className="arrow">
          <img src={arrow} alt="Arrow" className="img-fluid" />
        </div>
      )}
    </div>
  );
};

export default Step;