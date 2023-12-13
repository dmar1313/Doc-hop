import React, { useState } from 'react';

// Firebase imports
import { db } from './firebase'; 
import { doc, setDoc } from 'firebase/firestore';

const AddDriverForm = ({ onClose }) => {

  const [driver, setDriver] = useState({
    firstName: '',
    lastName: '', 
    dlNumber: '',
    address: '',
    phone: '',
    vehicle: '' 
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Add driver to 'drivers' collection
      await setDoc(doc(db, 'drivers', driver.dlNumber), driver);

      setLoading(false);
      setMessage('Driver added successfully');

      // Clear form
      setDriver({
        firstName: '',
        lastName: '',
        dlNumber: '',
        address: '',
        phone: '',
        vehicle: ''
      });

    } catch (err) {
      setLoading(false);
      setMessage('Error adding driver');
      console.error(err);
    }
  }

  return (
     <div className="form-card">
      <div className="form-header">
        <h2>Add New Driver</h2>
      </div>
      
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>First Name</label>
          <input 
            type="text" 
            className="form-control"
          />
        </div>

        <input 
          type="text"
          placeholder="First Name"
          value={driver.firstName}
          onChange={(e) => setDriver({...driver, firstName: e.target.value})} 
        />
        <input 
          type="text"
          placeholder="Last Name"
          value={driver.lastName}
          onChange={(e) => setDriver({...driver, lastName: e.target.value})} 
              />
              <input 
          type="text"
          placeholder="dlNumber" 
          value={driver.dlNumber} 
          onChange={(e) => setDriver({...driver, dlNumber: e.target.value})} 
              />
               <input 
          type="text"
          placeholder="phone" 
          value={driver.phone} 
          onChange={(e) => setDriver({...driver, phone: e.target.value})} 
              />
               <input 
          type="text"
          placeholder="vehicle" 
          value={driver.vehicle} 
          onChange={(e) => setDriver({...driver, vehicle: e.target.value})} 
              />
                <div className="form-group">
          {loading && <p>Loading...</p>}
          {message && <p>{message}</p>}
        </div>
 <div className="form-footer">
          <button 
            type="button" 
            className="btn btn-secondary"
             onClick={onClose}
           Close
        ></button>
                </div>
            
          
        {/* other input fields */}

        {loading && <p>Loading...</p>}

        {message && <p>{message}</p>}

        <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            Add Driver
          </button>
      </form>
    </div>
  );
}

export default AddDriverForm;
