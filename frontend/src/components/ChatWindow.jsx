import React, { useEffect, useState, useRef } from "react";

const ChatWindow = ({ user, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    setMessages([]); // Reset messages on new chat
  }, [user]);

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        sender: { username: currentUser }
      };
      setMessages([...messages, newMessage]);
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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

      <div className="p-3 border-top d-flex align-items-end">
        <textarea
          ref={textareaRef}
          rows={1}
          className="form-control me-2"
          placeholder="Message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ resize: "none", overflow: "hidden" }}
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;