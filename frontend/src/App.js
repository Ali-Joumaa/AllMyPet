import React from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RaiseAPet from "./components/raiseAPet";


function App() {
  return (
    <div className="App">
      <NavBar/>
      <RaiseAPet/>
      <Footer/>

      

    </div>
  );
}

export default App;
