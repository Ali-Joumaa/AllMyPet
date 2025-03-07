import React from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RaiseAPet from "./components/raiseAPet";
import TopHomePage from "./components/topHomePage";
import OurPetsSection from "./components/ourPetsSection";
import ReviewSection from "./components/reviewSection";
import PetCare from "./components/petCare";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <TopHomePage/>
      <OurPetsSection/>
      <PetCare/>
      <ReviewSection/>
      <Footer/>

      

    </div>
  );
}

export default App;
