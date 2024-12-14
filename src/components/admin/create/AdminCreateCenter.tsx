import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCenter } from "../../../api/centerApi.ts"; // Adjust the import path as necessary

const AdminCreateCenter = () => {
  const navigate = useNavigate();
  const [centerData, setCenterData] = useState({
    description: "",
    latitude: 0,
    longitude: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCenterData({ ...centerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCenter(centerData);
      navigate("/admin/centers");
    } catch (error) {
      console.error("Failed to create center:", error);
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
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Create a New Center
      </h1>
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
            value={centerData.description}
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
            htmlFor="latitude"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Latitude:
          </label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={centerData.latitude}
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
            htmlFor="longitude"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Longitude:
          </label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={centerData.longitude}
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
          Create Center
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
        onClick={() => navigate("/admin/centers")}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#d32f2f"; // Darker red on hover
          e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f44336"; // Original red
          e.currentTarget.style.transform = "scale(1)"; // Reset size
        }}
      >
        To Admin Centers
      </button>
    </div>
  );
};

export default AdminCreateCenter;
