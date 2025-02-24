import React from "react";
import "./App.css";
import OurPetsSection from "./components/ourPetsSection";
import TopHomePage from "./components/topHomePage";
import PetCare from "./components/petCare";
import ReviewSection from "./components/reviewSection";

function App() {
  return (
    <div>
      <TopHomePage />
      <OurPetsSection/>
      <PetCare/>
      <ReviewSection/>
    </div>
  );
}

export default App;
