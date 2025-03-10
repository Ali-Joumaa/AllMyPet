import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./VetsPage.css";
import VetCardSlider from "./VetCardSlider";

export default function VetsPage() {
  const vets = [
    { name: "Dr. Sarah Thompson", specialty: "Exotic Pets", location: "New York, USA", contact: "+1 555-1234", image: "" },
    { name: "Dr. James Carter", specialty: "Surgery & Orthopedics", location: "Los Angeles, USA", contact: "+1 555-5678", image: "" },
    { name: "Dr. Emily Watson", specialty: "General Care", location: "Chicago, USA", contact: "+1 555-9101", image: "" },
    { name: "Dr. Robert Brown", specialty: "Dermatology", location: "Houston, USA", contact: "+1 555-2345", image: "" },
    { name: "Dr. Olivia Green", specialty: "Dentistry", location: "San Francisco, USA", contact: "+1 555-6789", image: "" }
  ];

  return (
    <>
      <NavBar />
      <div className="vets-container">
      <h1 className="vets-header">Available Veterinarians</h1>
      <VetCardSlider vets={vets} />
      </div>
      <Footer />
    </>
  );
}