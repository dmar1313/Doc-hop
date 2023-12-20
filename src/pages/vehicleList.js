import React, { useState, useEffect } from 'react';

const VehicleList = () => {
  const [vehicleList, setVehicleList] = useState([]);
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/vehicles');
        const vehiclesData = await response.json();
        setVehicleList(vehiclesData);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <h1>Vehicle List</h1>
      {vehicleList.length > 0 ? (
        vehicleList.map((vehicle) => (
          <div key={vehicle.id}>
            <h3>{vehicle.name}</h3>
            <p>{vehicle.description}</p>
          </div>
        ))
      ) : (
        <p>No vehicles found.</p>
      )}
    </div>
  );
};

export default VehicleList;