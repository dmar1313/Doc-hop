import React, { useState } from "react";
import "./form-styles.css";

const AddTripForm = ({ onClose }) => {
  const [tripDetails, setTripDetails] = useState({
    name: "",
    pickupAddress: "",
    vehicleType: "",
    destinationAddress: "",
    appointmentTime: "",
    pickupTime: "",
    driverNotes: "",
    contactNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await setTripDetails(tripDetails);
      setLoading(false);
      if (response.success) {
        setMessage("Trip added successfully");
        setTripDetails({
          // Reset form fields
        });
        // Additional success handling
      } else {
        setMessage(response.message || "Failed to add trip");
      }
    } catch (error) {
      setLoading(false);
      setMessage("An error occurred");
    }
  };

  return (
    <div classname="add-trip-form">
    <div className="form-container">
      <form>
        <div className="form-container bg-white p-4 rounded-lg shadow-sm w-sm">
          <form onSubmit={handleSubmit}>
            {/* Form input fields */}
            <input
              type="text"
              name="name"
              value={tripDetails.name}
              onChange={(e) =>
                setTripDetails({ ...tripDetails, name: e.target.value })
              }
              placeholder="Passenger Name"
            />
            <input
              type="text"
              name="pickupAddress"
              value={tripDetails.pickupAddress}
              onChange={(e) =>
                setTripDetails({
                  ...tripDetails,
                  pickupAddress: e.target.value,
                })
              }
              placeholder="Pickup Address"
            />
            <input
              type="text"
              name="vehicleType"
              value={tripDetails.vehicleType}
              onChange={(e) =>
                setTripDetails({ ...tripDetails, vehicleType: e.target.value })
              }
              placeholder="Vehicle Type"
            />
            <input
              type="text"
              name="destinationAddress"
              value={tripDetails.destinationAddress}
              onChange={(e) =>
                setTripDetails({
                  ...tripDetails,
                  destinationAddress: e.target.value,
                })
              }
              placeholder="Destination Address"
            />
            <input
              type="datetime-local"
              name="appointmentTime"
              value={tripDetails.appointmentTime}
              onChange={(e) =>
                setTripDetails({
                  ...tripDetails,
                  appointmentTime: e.target.value,
                })
              }
              placeholder="Appointment Time"
            />
            <input
              type="datetime-local"
              name="pickupTime"
              value={tripDetails.pickupTime}
              onChange={(e) =>
                setTripDetails({ ...tripDetails, pickupTime: e.target.value })
              }
              placeholder="Requested Pickup Time"
            />
            <textarea
              name="driverNotes"
              value={tripDetails.driverNotes}
              onChange={(e) =>
                setTripDetails({ ...tripDetails, driverNotes: e.target.value })
              }
              placeholder="Driver Notes"
            />
            <input
              type="tel"
              name="contactNumber"
              value={tripDetails.contactNumber}
              onChange={(e) =>
                setTripDetails({
                  ...tripDetails,
                  contactNumber: e.target.value,
                })
              }
              placeholder="Contact Number"
            />

            {/* Display success or error message */}
            {message && <p>{message}</p>}
            </form>
             </div></form>
        </div>
    </div>
  );
};

export default AddTripForm;
