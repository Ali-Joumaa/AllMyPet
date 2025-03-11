import React from 'react';
import arrow1 from "../images/arrow1.png";
import arrow2 from "../images/arrow2.png";
import add from "../images/Add.svg";
import home from "../images/home_work.svg";
import paste from "../images/content_paste_search.svg";

const PetAdoptionSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Set up your profile",
      description: "Set up your profile (including photos) in minutes",
      image: add, // Use the imported image
      arrow: arrow1 // Use the imported arrow image
    },
    {
      number: 2,
      title: "Describe your home and routine",
      description: "Describe your home and routine so rehomers can see if it’s right for their pet",
      image: home, // Use the imported image
      arrow: arrow2 // Use the imported arrow image
    },
    {
      number: 3,
      title: "Start your search!",
      description: "Start your search!",
      image: paste, // Use the imported image
      arrow: null // No arrow for the last step
    }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="text-center my-5">
        <h1>Adopt or Rehome a pet in just 3 Easy Steps</h1>
      </header>

      {/* Steps */}
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index}>
            {/* Step Content */}
            <div className="step row align-items-center my-4">
              {/* Step Number */}
              <div className="col-md-1 text-center">
                <h2 className="step-number">{step.number}</h2>
              </div>

              {/* Text on the left */}
              <div className="col-md-7">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>

              {/* Image on the right */}
              <div className="col-md-4 text-center">
                <img src={step.image} alt={`Step ${step.number}`} className="img-fluid step-image" />
              </div>
            </div>

            {/* Arrow between steps (except for the last step) */}
            {step.arrow && (
              <div className="arrow text-center my-4">
                <img src={step.arrow} alt="Arrow" className="img-fluid" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetAdoptionSteps;