import React from 'react';
import './HouseComponent.css';

function HouseComponent({ house, onDelete, onEdit }) {
  return (
    <div className="house">
      <h2>{house.name} (ID: {house.id})</h2>
      <p>{house.description}</p>
      <button onClick={() => onEdit(house)}>Edit</button>
      <button onClick={() => onDelete(house.id)}>Delete</button>
    </div>
  );
}

export default HouseComponent;