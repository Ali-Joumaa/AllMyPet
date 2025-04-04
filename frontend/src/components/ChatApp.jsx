// ChatApp.jsx
import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import ChatWindow from "./ChatWindow";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = "http://localhost:5555";

const ChatApp = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setCurrentUser(res.data.username);
    });
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setUsers(res.data.filter(u => u.username !== currentUser));
    });
  }, [currentUser]);

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${u.firstname} ${u.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <SideBar users={filteredUsers} onSelectUser={setSelectedUser} onSearch={setSearchTerm} />
        {selectedUser && <ChatWindow user={selectedUser} currentUser={currentUser} />}
      </div>
    </div>
  );
};

export default ChatApp;