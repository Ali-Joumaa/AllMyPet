import React from "react";

const users = [
  {
    username: "ajj06",
    firstname: "Ali",
    lastname: "Joumaa",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    username: "zeina01",
    firstname: "Zeina",
    lastname: "Khalil",
    image: "https://randomuser.me/api/portraits/women/21.jpg"
  },
  {
    username: "jean01",
    firstname: "Jean",
    lastname: "Houwayek",
    image: "https://randomuser.me/api/portraits/men/76.jpg"
  }
];

const SideBar = ({ onSelectUser }) => (
  <div className="col-3 border-end bg-light">
    <div className="p-3 border-bottom">
      <input
        type="text"
        className="form-control"
        placeholder="Search users..."
        disabled
      />
    </div>
    <ul className="list-group list-group-flush overflow-auto" style={{ height: "85vh" }}>
      {users.map((user) => (
        <li
          key={user.username}
          className="list-group-item list-group-item-action d-flex align-items-center"
          onClick={() => onSelectUser(user.username)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={user.image}
            alt={user.username}
            className="rounded-circle me-3"
            width="40"
            height="40"
          />
          <div>
            <div className="fw-bold">{user.firstname} {user.lastname}</div>
            <div className="text-muted small">@{user.username}</div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default SideBar;
