import React from "react";

const SideBar = ({ users, onSelectUser, onSearch }) => (
  <div className="col-3 border-end bg-light">
    <div className="p-3 border-bottom">
      <input
        type="text"
        className="form-control"
        placeholder="Search users..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
    <ul className="list-group list-group-flush overflow-auto" style={{ height: "85vh" }}>
      {users.map((user) => (
        <li
          key={user.username}
          className="list-group-item list-group-item-action"
          onClick={() => onSelectUser(user.username)}
          style={{ cursor: "pointer" }}
        >
          <div className="fw-bold">{user.firstname} {user.lastname}</div>
          <div className="text-muted small">@{user.username}</div>
        </li>
      ))}
    </ul>
  </div>
);

export default SideBar;