import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import VetsPage from "./components/VetsPage";
import RaisePet from "./components/raiseAPetPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgetPassword from "./components/ForgetPassword";
import Adopt from "./components/Adopt";
import Profile from "./components/profile";
import ViewProfile from "./components/ViewProfile";
import AddVetPage from "./components/AddVetPage";
import PetCardForm from "./components/PetCardForm";
import ChatApp from "./components/ChatApp";
import AdminPage from "./components/AdminPage";
import AdminUserProfile from './components/AdminUserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/me" element={<Profile />} /> {/* ✅ Your Profile */}
        <Route path="/profile/:username" element={<ViewProfile />} /> {/* ✅ View Someone Else */}
        <Route path="/petCardForm" element={<PetCardForm />} />
        <Route path="/PetCardForm/:petId" element={<PetCardForm />} />
        <Route path="/form" element={<PetCardForm />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/adminPage" element={<AdminPage/>}/>
        <Route path="/raisePets" element={<RaisePet />} />  {/* Raise a pet Page */}
        <Route path="/vets" element={<VetsPage />} />  {/* Vets Page */}
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/addvet" element={<AddVetPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/adminPage" element={<AdminPage/>}/>
        <Route path="/admin/users/:userId" element={<AdminUserProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
