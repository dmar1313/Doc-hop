import React, { useState } from "react";

// Firebase imports
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import "./form-styles.css";

const AddDriverForm = ({ onClose }) => {
  const [driver, setDriver] = useState({
    firstName: "",
    lastName: "",
    dlNumber: "",
    address: "",
    phone: "",
    vehicle: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Add driver to 'drivers' collection
      await setDoc(doc(db, "drivers", driver.dlNumber), driver);

      setLoading(false);
      setMessage("Driver added successfully");

      // Clear form
      setDriver({
        firstName: "",
        lastName: "",
        dlNumber: "",
        address: "",
        phone: "",
        vehicle: "",
      });
    } catch (err) {
      setLoading(false);
      setMessage("Error adding driver");
      console.error(err);
    }
  };

  return (
     <div className="add-driver-form">
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={driver.firstName}
          onChange={(e) => setDriver({ ...driver, firstName: e.target.value })}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={driver.lastName}
          onChange={(e) => setDriver({ ...driver, lastName: e.target.value })}
        />

        <input
          type="text"
          placeholder="dlNumber"
          value={driver.dlNumber}
          onChange={(e) => setDriver({ ...driver, dlNumber: e.target.value })}
        />

        <input
          type="text"
          placeholder="phone"
          value={driver.phone}
          onChange={(e) => setDriver({ ...driver, phone: e.target.value })}
        />

        <input
          type="text"
          placeholder="vehicle"
          value={driver.vehicle}
          onChange={(e) => setDriver({ ...driver, vehicle: e.target.value })}
        />

        {loading && <p>Loading...</p>}

        {message && <p>{message}</p>}

        <button type="submit" disabled={loading}>
          Add Driver
        </button>
        </form>
        </div>
    </div>
  );
};

export default AddDriverForm;
