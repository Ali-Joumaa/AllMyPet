import React from "react";
import "./App.css";
import OurPetsSection from "./components/ourPetsSection";
import TopHomePage from "./components/topHomePage";
import ReviewSection from "./components/reviewSection";
import NavBar from "./components/NavBar";
import PetCardsGrid from "./components/PetCardsGrid";
import Footer from "./components/Footer";
import PetCare from "./components/petCare";
function App() {
  return (
    <div>
      <NavBar/>
      <TopHomePage/>
      <OurPetsSection/>
      <PetCare/>
      <ReviewSection/>
      <PetCardsGrid/>
      <Footer/>

      

    </div>
  );
}

export default App;
