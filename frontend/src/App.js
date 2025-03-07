import React from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RaiseAPet from "./components/raiseAPet";
import TopHomePage from "./components/topHomePage";
import OurPetsSection from "./components/ourPetsSection";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <TopHomePage/>
      <TopHomePage/>
      <TopHomePage/>
      <TopHomePage/>
      <TopHomePage/>

      <Footer/>

      

    </div>
  );
}

export default App;
