import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5555";

const ChatWindow = ({ user, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios.get(`${API_BASE}/api/messages/${user}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setMessages(res.data))
    .catch(err => {
      console.error("Failed to load messages:", err);
    });
  }, [user]);

  const sendMessage = () => {
    if (input.trim()) {
      const token = localStorage.getItem("token");
      axios.post(`${API_BASE}/api/messages`, {
        receiver: user,
        text: input,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => {
        setMessages([...messages, res.data]);
        setInput("");
      }).catch(err => {
        console.error("Failed to send message:", err);
      });
    }
  };

  return (
    <div className="col-9 d-flex flex-column">
      <div className="border-bottom p-3">
        <h5 className="mb-0">Chat with @{user}</h5>
      </div>

      <div className="flex-grow-1 p-3 overflow-auto" style={{ background: "#f9f9f9" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded ${msg.sender.username === currentUser ? "bg-primary text-white text-end ms-auto" : "bg-light"}`}
            style={{ maxWidth: "75%" }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-3 border-top d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
