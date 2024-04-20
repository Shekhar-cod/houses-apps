import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HouseComponent from './Components/HouseComponent';
import HouseForm from './Components/HouseForm';
import './App.css';


function App() {
  const [houses, setHouses] = useState([]);
  const [editingHouse, setEditingHouse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  

  // Fetch houses from API
  useEffect(() => {
    setIsLoading(true);
    axios.get('https://ancient-taiga-31359.herokuapp.com/api/houses')
      .then(response => {
        setHouses(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching houses', error);
        setError('Failed to fetch houses');
        setIsLoading(false);
      });
  }, []);

  // Delete house
  const handleDelete = (id) => {
    setIsLoading(true);
    axios.delete(`https://ancient-taiga-31359.herokuapp.com/api/houses/${id}`)
      .then(() => {
        setHouses(houses.filter(house => house.id !== id));
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error deleting house', error);
        setError('Failed to delete house');
        setIsLoading(false);
      });
  };

  // Edit house
  const handleEdit = (house) => {
    setEditingHouse(house);
  };

  // Save or update house
  const handleSave = (houseData) => {
    setIsLoading(true);
    const method = houseData.id ? 'put' : 'post';
    const url = houseData.id ? `https://ancient-taiga-31359.herokuapp.com/api/houses/${houseData.id}` : 'https://ancient-taiga-31359.herokuapp.com/api/houses';
    axios[method](url, houseData)
      .then(response => {
        if (houseData.id) {
          setHouses(houses.map(house => house.id === houseData.id ? response.data : house));
        } else {
          setHouses([...houses, response.data]);
        }
        setEditingHouse(null);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error saving house', error);
        setError('Failed to save house');
        setIsLoading(false);
      });
  };

  // Component Render
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  console.log(houses.map(house => house.id));
  return (
    <div className="App">
      <h1>Houses App</h1>
      {editingHouse ? (
        <HouseForm onSave={handleSave} initialData={editingHouse} />
      ) : (
        <HouseForm onSave={handleSave} />
      )}
     {houses.map((house, index) => (
    <HouseComponent
        key={house.id || index}
        house={house}
        onDelete={handleDelete}
        onEdit={handleEdit}
    />
))};


    </div>
  );
}


export default App;