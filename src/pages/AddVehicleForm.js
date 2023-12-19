import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import "./form-styles.css";

const AddVehicleForm = ({ onClose }) => {
  const [vehicleDetails, setVehicleDetails] = useState({
    make: "",
    model: "",
    year: "",
    vin: "",
    licensePlate: "",
    type: "",
  });

  const [, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "vehicles"), vehicleDetails);
      setLoading(false);
      setMessage("Vehicle added successfully");
      setVehicleDetails({
        make: "",
        model: "",
        year: "",
        vin: "",
        licensePlate: "",
        type: "",
      });
    } catch (error) {
      setLoading(false);
      setMessage("An error occurred");
    }
  };

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, "vehicles"), vehicleDetails);
      setMessage("Vehicle added successfully");
    } catch (error) {
      setMessage("Error adding vehicle: " + error);
    }
  };

  const handleClose = () => {
    onClose();
  };

    return (
      <div className="add-vehicle-form">
    <div className="form-container">
      <form>
        {/* Form input fields */}
        <input
          type="text"
          name="make"
          value={vehicleDetails.make}
          onChange={(e) =>
            setVehicleDetails({ ...vehicleDetails, make: e.target.value })
          }
          placeholder="Make"
        />
        <input
          type="text"
          name="model"
          value={vehicleDetails.model}
          onChange={(e) =>
            setVehicleDetails({ ...vehicleDetails, model: e.target.value })
          }
          placeholder="Model"
        />
        <input
          type="number"
          name="year"
          value={vehicleDetails.year}
          onChange={(e) =>
            setVehicleDetails({ ...vehicleDetails, year: e.target.value })
          }
          placeholder="Year"
        />
        <input
          type="text"
          name="vin"
          value={vehicleDetails.vin}
          onChange={(e) =>
            setVehicleDetails({ ...vehicleDetails, vin: e.target.value })
          }
          placeholder="VIN"
        />
        <input
          type="text"
          name="licensePlate"
          value={vehicleDetails.licensePlate}
          onChange={(e) =>
            setVehicleDetails({
              ...vehicleDetails,
              licensePlate: e.target.value,
            })
          }
          placeholder="License Plate"
        />
        <input
          type="text"
          name="type"
          value={vehicleDetails.type}
          onChange={(e) =>
            setVehicleDetails({ ...vehicleDetails, type: e.target.value })
          }
          placeholder="Type (AMB, W/C.)"
        />

        <button
          className="rounded-lg px-12 py-2 bg-blue-500 text-white"
          onClick={handleAdd}
        >
          Add Vehicle
        </button>

        {/* Display success or error message */}
        {message && <p>{message}</p>}

                </form>
                </div>
    </div>
  );
};

export default AddVehicleForm;
