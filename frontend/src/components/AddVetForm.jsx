import React, { useState } from 'react';
import './AddVetForm.css';

export default function AddVetForm() {
  const [vetData, setVetData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    expYears: '',
    sex: '',
    location: '',
    profilePicture: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVetData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the data to the console before sending
    console.log("Submitting vet data:", vetData);

    fetch('http://localhost:5555/vets/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vetData)
    })
      .then(res => {
        console.log("Response status:", res.status);
        if (res.ok) {
          alert('✅ Veterinarian added successfully!');
          // Refresh the page to reload data
          window.location.reload();
        } else {
          alert('❌ Error adding vet. Check console and backend logs.');
        }
      })
      .catch(err => {
        console.error('Error:', err);
        alert('❌ Network error or server is unreachable.');
      });
  };

  return (
    <div className="vet-form-container">
      <h2 className="vet-form-header">Add Veterinarian</h2>
      <form onSubmit={handleSubmit} className="vet-form">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          required
          minLength="2"
          maxLength="30"
          value={vetData.firstName}
          onChange={handleChange}
        />

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          required
          minLength="2"
          maxLength="30"
          value={vetData.lastName}
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
          name="expYears"
          min="0"
          required
          value={vetData.expYears}
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
          name="phoneNumber"
          required
          value={vetData.phoneNumber}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}