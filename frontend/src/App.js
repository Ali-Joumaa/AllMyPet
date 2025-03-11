import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";  // Import Home.jsx
import VetsPage from "./components/VetsPage";  // Import VetsPage
import RaisePet from "./components/raiseAPetPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home Page */}
        <Route path="/raisePets" element={<RaisePet />} />  {/* Raise a pet Page */}
        <Route path="/vets" element={<VetsPage />} />  {/* Vets Page */}
      </Routes>
    </Router>
  );
}

export default App;