import React, { useState, useEffect } from 'react';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        console.log('Fetching drivers...');
        const response = await fetch('/api/drivers'); // Replace '/api/drivers' with the actual API endpoint for getting the drivers list
        console.log('Response:', response);
        const data = await response.json();
        console.log('Data:', data);
        setDrivers(data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div>
      <h1>Drivers List</h1>
      <ul>
        {drivers.map((driver) => (
          <li key={driver.id}>{driver.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DriverList;
