import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBike } from "../../../api/bikeApi.ts"; // Adjust the import path as necessary
import { CreateBikeDTO } from "../../../api/types/types.ts";
const AdminCreateBike = () => {
  const navigate = useNavigate();
  const [bikeData, setBikeData] = useState({
    description: "",
    photoUrl: "",
    pricePerHour: 0,
    bikeModelId: 0,
    rentingCenterId: 0,
    state: 0, // Changed state to number
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBikeData({
      ...bikeData,
      [name]: name === "state" ? Number(value) : value,
    }); // Convert state to number
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBike(bikeData as CreateBikeDTO);
      navigate("/admin/bikes");
    } catch (error) {
      console.error("Failed to create bike:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "930px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>Create a New Bike</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="description"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={bikeData.description}
            onChange={handleChange}
            required
            style={{
              width: "calc(100% - 20px)", // Adjusted width
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="photoUrl"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Photo URL:
          </label>
          <input
            type="url"
            id="photoUrl"
            name="photoUrl"
            value={bikeData.photoUrl}
            onChange={handleChange}
            required
            style={{
              width: "calc(100% - 20px)", // Adjusted width
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="pricePerHour"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Price per Hour:
          </label>
          <input
            type="number"
            id="pricePerHour"
            name="pricePerHour"
            value={bikeData.pricePerHour}
            onChange={handleChange}
            required
            style={{
              width: "calc(100% - 20px)", // Adjusted width
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="bikeModelId"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Bike Model ID:
          </label>
          <input
            type="number"
            id="bikeModelId"
            name="bikeModelId"
            value={bikeData.bikeModelId}
            onChange={handleChange}
            required
            style={{
              width: "calc(100% - 20px)", // Adjusted width
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="rentingCenterId"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Renting Center ID:
          </label>
          <input
            type="number"
            id="rentingCenterId"
            name="rentingCenterId"
            value={bikeData.rentingCenterId}
            onChange={handleChange}
            required
            style={{
              width: "calc(100% - 20px)", // Adjusted width
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="state"
            style={{ display: "block", marginBottom: "5px" }}
          >
            State:
          </label>
          <input
            type="number" // Changed input type to number
            id="state"
            name="state"
            value={bikeData.state}
            onChange={handleChange}
            required
            style={{
              width: "calc(100% - 20px)", // Adjusted width
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s, transform 0.2s",
            marginTop: "20px",
          }}
        >
          Create Bike
        </button>
      </form>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s, transform 0.2s",
          marginTop: "20px",
        }}
        onClick={() => navigate("/admin/bikes")}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#d32f2f"; // Darker red on hover
          e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f44336"; // Original red
          e.currentTarget.style.transform = "scale(1)"; // Reset size
        }}
      >
        To Admin Bike
      </button>
    </div>
  );
};

export default AdminCreateBike;
