import React, { useState, useEffect } from 'react';

const DriverListPage = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch('/api/drivers')
      .then(res => res.json())
      .then(data => setDrivers(data.data))
  }, []);

  return (
    <div>
      <h1>Driver List</h1>
      {drivers.map(driver => (
        <div key={driver.id}>
          <h3>{driver.name}</h3>
          <p>{driver.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DriverListPage;