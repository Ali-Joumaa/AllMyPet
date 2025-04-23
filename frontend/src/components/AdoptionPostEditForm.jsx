import React from 'react';

export default function AdoptionPostEditForm({ postData, onPostUpdated, onCancel }) {
  const [formData, setFormData] = React.useState(postData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPostUpdated(formData);
  };

  return (
    <form className="edit-form" aria-label="Edit Adoption Post" onSubmit={handleSubmit}>
      <h2>Edit Adoption Post</h2>

      <label htmlFor="title">Title:</label>
      <input
        id="title"
        name="title"
        type="text"
        value={formData.title}
        required
        onChange={handleChange}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        required
        onChange={handleChange}
      />

      <label htmlFor="status">Adoption Status:</label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Available">Available</option>
        <option value="Not Available">Not Available</option>
      </select>

      <label htmlFor="adoptionType">Adoption Type:</label>
      <select
        id="adoptionType"
        name="adoptionType"
        value={formData.adoptionType}
        onChange={handleChange}
      >
        <option value="Temporary">Temporary</option>
        <option value="Permanent">Permanent</option>
      </select>

      <label htmlFor="pet">Pet:</label>
      <input
        id="pet"
        type="text"
        value={`${formData.petName} (${formData.petType})`}
        disabled
        readOnly
      />

      <div className="edit-form-buttons">
        <button className="edit-form-submit" type="submit">Update</button>
        <button className="edit-form-cancel" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
