import React, { useState } from 'react';

const AddVehicleForm = ({ onClose }) => {
    const [vehicleDetails, setVehicleDetails] = useState({
        make: '',
        model: '',
        year: '',
        vin: '',
        licensePlate: '',
        type: '' 
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await setVehicleDetails(vehicleDetails); 
            setLoading(false);
            if (response.success) {
                setMessage('Vehicle added successfully');
                setVehicleDetails({ 
                    make: '',
                    model: '',
                    year: '',
                    vin: '',
                    licensePlate: '',
                    type: '' 
                });
                // Additional success handling
            } else {
                setMessage(response.message || 'Failed to add vehicle');
            }
        } catch (error) {
            setLoading(false);
            setMessage('An error occurred');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Form input fields */}
                <input 
                    type="text" 
                    name="make" 
                    value={vehicleDetails.make} 
                    onChange={(e) => setVehicleDetails({...vehicleDetails, make: e.target.value})} 
                    placeholder="Make" 
                />
                <input 
                    type="text" 
                    name="model" 
                    value={vehicleDetails.model} 
                    onChange={(e) => setVehicleDetails({...vehicleDetails, model: e.target.value})} 
                    placeholder="Model" 
                />
                <input 
                    type="number" 
                    name="year" 
                    value={vehicleDetails.year} 
                    onChange={(e) => setVehicleDetails({...vehicleDetails, year: e.target.value})} 
                    placeholder="Year" 
                />
                <input 
                    type="text" 
                    name="vin" 
                    value={vehicleDetails.vin} 
                    onChange={(e) => setVehicleDetails({...vehicleDetails, vin: e.target.value})} 
                    placeholder="VIN" 
                />
                <input 
                    type="text" 
                    name="licensePlate" 
                    value={vehicleDetails.licensePlate} 
                    onChange={(e) => setVehicleDetails({...vehicleDetails, licensePlate: e.target.value})} 
                    placeholder="License Plate" 
                />
                <select name="type" value={vehicleDetails.type} onChange={(e) => setVehicleDetails({...vehicleDetails, type: e.target.value})}>
                    <option value="">Select Vehicle Type</option>
                    <option value="AMB">AMB</option>
                    <option value="W/C Van">W/C Van</option>
                </select>

                {/* Display loading indicator */}
                {loading && <p>Loading...</p>}
                {/* Display success or error message */}
                {message && <p>{message}</p>}
                <button type="button" onClick={onClose}>Close</button>
                <button type="submit" disabled={loading}>Add Vehicle</button>
            </form>
        </div>
    );
};

export default AddVehicleForm;