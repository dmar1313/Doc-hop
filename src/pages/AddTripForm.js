import React, { useState } from 'react';

const AddTripForm = ({ onClose }) => {
    const [tripDetails, setTripDetails] = useState({
        // Use the column names from the import CSV as the initial state
        // For example:
        tripNumber: '',
        name: '',
        pickupAddress: '',
        pickupAddress2: '',
        pickupCounty: '',
        vehicleType: '',
        specialNeeds: '',
        destinationAddress: '',
        destinationAddress2: '',
        appointmentTime: '',
        pickupTime: '',
        mileage: '',
        providerNotes: '',
        pharmacyStop: false,
        wheelchair: false,
        highRisk: false,
        confirmationNumber: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await setTripDetails(tripDetails); 
            setLoading(false);
            if (response.success) {
                setMessage('Trip added successfully');
                setTripDetails({ 
                    // Reset form fields
                });
                // Additional success handling
            } else {
                setMessage(response.message || 'Failed to add trip');
            }
        } catch (error) {
            setLoading(false);
            setMessage('An error occurred');
        }
    };

     return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="tripNumber"
          value={tripDetails.tripNumber}
          onChange={(e) => setTripDetails({...tripDetails, tripNumber: e.target.value})}
          placeholder="Trip Number"
        />
        <input
          type="text" 
          name="name"
          value={tripDetails.name}
          onChange={(e) => setTripDetails({...tripDetails, name: e.target.value})}
          placeholder="Name"
        />
        <input
          type="text"
          name="pickupAddress"
          value={tripDetails.pickupAddress}
          onChange={(e) => setTripDetails({...tripDetails, pickupAddress: e.target.value})} 
          placeholder="Pickup Address"
        />
        <input
          type="text"
          name="pickupAddress2"
          value={tripDetails.pickupAddress2}
          onChange={(e) => setTripDetails({...tripDetails, pickupAddress2: e.target.value})}
          placeholder="Pickup Address 2"
        />
        <input
          type="text"
          name="pickupCounty"
          value={tripDetails.pickupCounty}
          onChange={(e) => setTripDetails({...tripDetails, pickupCounty: e.target.value})}
          placeholder="Pickup County"
        />
        <input
          type="text"
          name="vehicleType"
          value={tripDetails.vehicleType}
          onChange={(e) => setTripDetails({...tripDetails, vehicleType: e.target.value})}
          placeholder="Vehicle Type"
        />
        <input
          type="text"
          name="specialNeeds"
          value={tripDetails.specialNeeds}
          onChange={(e) => setTripDetails({...tripDetails, specialNeeds: e.target.value})}
          placeholder="Special Needs"
        />
        <input
          type="text"
          name="destinationAddress"
          value={tripDetails.destinationAddress}
          onChange={(e) => setTripDetails({...tripDetails, destinationAddress: e.target.value})}
          placeholder="Destination Address"
        />
        <input
          type="text"
          name="destinationAddress2"
          value={tripDetails.destinationAddress2}
          onChange={(e) => setTripDetails({...tripDetails, destinationAddress2: e.target.value})}
          placeholder="Destination Address 2"
        />
        <input
          type="text"
          name="appointmentTime"
          value={tripDetails.appointmentTime}
          onChange={(e) => setTripDetails({...tripDetails, appointmentTime: e.target.value})}
          placeholder="Appointment Time"
        />
        <input
          type="text"
          name="pickupTime"
          value={tripDetails.pickupTime}
          onChange={(e) => setTripDetails({...tripDetails, pickupTime: e.target.value})}
          placeholder="Pickup Time"
        />
        <input
          type="text"
          name="mileage"
          value={tripDetails.mileage}
          onChange={(e) => setTripDetails({...tripDetails, mileage: e.target.value})}
         placeholder="Mileage"
                 />
         <input
  type="text"
  name="providerNotes"
  value={tripDetails.providerNotes}
  onChange={(e) => setTripDetails({...tripDetails, providerNotes: e.target.value})}
  placeholder="Provider Notes"  
/>

<input
  type="checkbox"
  name="pharmacyStop"
  checked={tripDetails.pharmacyStop}
  onChange={(e) => setTripDetails({...tripDetails, pharmacyStop: e.target.checked})}
/>
<label htmlFor="pharmacyStop">Pharmacy Stop</label>

<input
  type="checkbox" 
  name="wheelchair"
  checked={tripDetails.wheelchair}
  onChange={(e) => setTripDetails({...tripDetails, wheelchair: e.target.checked})} 
/>
<label htmlFor="wheelchair">Wheelchair</label>

<input
  type="checkbox"
  name="highRisk"
  checked={tripDetails.highRisk}
  onChange={(e) => setTripDetails({...tripDetails, highRisk: e.target.checked})}
/>
<label htmlFor="highRisk">High Risk</label>

<input
  type="text"
  name="confirmationNumber"
  value={tripDetails.confirmationNumber}
  onChange={(e) => setTripDetails({...tripDetails, confirmationNumber: e.target.value})}
  placeholder="Confirmation Number"
                 />
          <div className="form-actions">
                    <button type="button" onClick={onClose}>Close</button>
                    <button type="submit" disabled={loading}>Add Trip</button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddTripForm;