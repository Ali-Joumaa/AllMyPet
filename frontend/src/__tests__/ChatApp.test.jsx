import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ChatApp from "../components/ChatApp";

// Mock subcomponents
jest.mock("../components/NavBar", () => () => <div data-testid="navbar" />);
jest.mock("../components/Footer", () => () => <div data-testid="footer" />);
jest.mock("../components/SideBar", () => ({ onSelectUser }) => (
  <div data-testid="sidebar">
    <button onClick={() => onSelectUser("tester123")}>Select Tester</button>
  </div>
));
jest.mock("../components/ChatWindow", () => ({ user, currentUser }) => (
  <div data-testid="chat-window">
    Chat between {currentUser} and {user}
  </div>
));

describe("ChatApp Component", () => {
  test("renders NavBar, Footer, SideBar, and default ChatWindow", () => {
    render(<ChatApp />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("chat-window")).toHaveTextContent("benkhalifay and aj123");
  });

  test("updates ChatWindow when a new user is selected from SideBar", () => {
    render(<ChatApp />);

    fireEvent.click(screen.getByText("Select Tester"));

    expect(screen.getByTestId("chat-window")).toHaveTextContent("benkhalifay and tester123");
  });
});
