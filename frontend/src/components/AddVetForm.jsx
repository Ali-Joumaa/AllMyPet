import React, { useState } from 'react';
import './AddVetForm.css';

export default function AddVetForm() {
  const [vetData, setVetData] = useState({
    FirstName: '',
    LastName: '',
    email: '',
    exp_years: '',
    sex: '',
    location: '',
    profilePicture: '',
    PhoneNumber: ''
  });

  // Handles changes to each input field.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVetData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Submits form data to the Spring Boot backend.
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/vets/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vetData)
    })
      .then(res => {
        if (res.ok) {
          alert('Veterinarian added successfully!');
        } else {
          alert('Error adding vet');
        }
      })
      .catch(err => console.error('Error:', err));
  };

  return (
    <div className="vet-form-container">
      <h2 className="vet-form-header">Add Veterinarian</h2>
      <form onSubmit={handleSubmit} className="vet-form">
        <label>First Name</label>
        <input
          type="text"
          name="FirstName"
          required
          minLength="2"
          maxLength="30"
          value={vetData.FirstName}
          onChange={handleChange}
        />

        <label>Last Name</label>
        <input
          type="text"
          name="LastName"
          required
          minLength="2"
          maxLength="30"
          value={vetData.LastName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          value={vetData.email}
          onChange={handleChange}
        />

        <label>Experience (Years)</label>
        <input
          type="number"
          name="exp_years"
          min="0"
          required
          value={vetData.exp_years}
          onChange={handleChange}
        />

        <label>Sex</label>
        <select
          name="sex"
          required
          value={vetData.sex}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Location</label>
        <input
          type="text"
          name="location"
          maxLength="100"
          value={vetData.location}
          onChange={handleChange}
        />

        <label>Profile Picture URL</label>
        <input
          type="text"
          name="profilePicture"
          value={vetData.profilePicture}
          onChange={handleChange}
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="PhoneNumber"
          required
          value={vetData.PhoneNumber}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}