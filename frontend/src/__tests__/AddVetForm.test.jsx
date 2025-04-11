import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddVetForm from "../components/AddVetForm";

// Mock alert and reload
beforeEach(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
  jest.spyOn(window.location, "reload").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("AddVetForm Component", () => {
  test("renders all form fields", () => {
    render(<AddVetForm />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sex/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Profile Picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  });

  test("updates input values on change", () => {
    render(<AddVetForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput.value).toBe("John");
  });

  test("submits the form successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200
      })
    );

    render(<AddVetForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "Jane" } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/Experience/i), { target: { value: "5" } });
    fireEvent.change(screen.getByLabelText(/Sex/i), { target: { value: "Female" } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: "Beirut" } });
    fireEvent.change(screen.getByLabelText(/Profile Picture/i), { target: { value: "http://image.com/pic.jpg" } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "12345678" } });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("✅ Veterinarian added successfully!")
    );
    await waitFor(() => expect(window.location.reload).toHaveBeenCalled());
  });

  test("handles failed submission", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500
      })
    );

    render(<AddVetForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "Fail" } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Fail" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "fail@example.com" } });
    fireEvent.change(screen.getByLabelText(/Experience/i), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText(/Sex/i), { target: { value: "Male" } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: "Nowhere" } });
    fireEvent.change(screen.getByLabelText(/Profile Picture/i), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "00000000" } });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("❌ Error adding vet. Check console and backend logs.")
    );
  });
});
