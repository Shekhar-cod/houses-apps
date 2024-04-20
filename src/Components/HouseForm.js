import React, { useState, useEffect } from 'react';
import './HouseForm.css';

function HouseForm({ onSave, initialData = {} }) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (JSON.stringify(initialData) !== JSON.stringify(formData)) {
        setFormData(initialData);
    }
}, [initialData]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        placeholder="House Name"
        required
      />
      
      <button type="submit">submit</button>
    </form>
  );

  
}

export default HouseForm;