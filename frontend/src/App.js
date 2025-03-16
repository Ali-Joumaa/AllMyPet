import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home";  // Import Home.jsx
import VetsPage from "./components/VetsPage";  // Import VetsPage
import RaisePet from "./components/raiseAPetPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgetPassword from "./components/ForgetPassword";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home Page */}
        <Route path="/home" element={<Home />} />  {/* Home Page */}
        <Route path="/raisePets" element={<RaisePet />} />  {/* Raise a pet Page */}
        <Route path="/vets" element={<VetsPage />} />  {/* Vets Page */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
