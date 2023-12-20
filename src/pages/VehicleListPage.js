import React, { useState, useEffect } from 'react';

const VehicleListPage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch('/api/vehicles')
      .then(res => res.json())
      .then(data => setVehicles(data.data))
  }, []);

  return (
    <div>
      <h1>Vehicle List</h1>
      {vehicles.map(vehicle => (
        <div key={vehicle.id}>
          <h3>{vehicle.name}</h3>
          <p>{vehicle.description}</p>
        </div>
      ))}
    </div>
  );
};

export default VehicleListPage;