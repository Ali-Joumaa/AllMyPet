import React, { useState } from "react";
import SideBar from "./SideBar";
import ChatWindow from "./ChatWindow";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState("aj123");
  const currentUser = "benkhalifay";

  return (
    <div>
      <NavBar/>
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <SideBar onSelectUser={setSelectedUser} />
        {selectedUser && <ChatWindow user={selectedUser} currentUser={currentUser} />}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ChatApp;