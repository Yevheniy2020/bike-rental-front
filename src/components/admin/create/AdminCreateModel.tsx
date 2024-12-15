import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addModel } from "../../../api/modelApi.ts"; // Adjust the import path as necessary

const AdminCreateModel = () => {
  const navigate = useNavigate();
  const [modelData, setModelData] = useState({
    name: "",
    brandId: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModelData({
      ...modelData,
      [name]: name === "brandId" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addModel(modelData);
      navigate("/admin/models");
    } catch (error) {
      console.error("Failed to create model:", error);
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
      <h1 style={{ textAlign: "center", color: "#333" }}>Create a New Model</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={modelData.name}
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
            htmlFor="brandId"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Brand ID:
          </label>
          <input
            type="number"
            id="brandId"
            name="brandId"
            value={modelData.brandId}
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
          Create Model
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
        onClick={() => navigate("/admin/models")}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#d32f2f"; // Darker red on hover
          e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f44336"; // Original red
          e.currentTarget.style.transform = "scale(1)"; // Reset size
        }}
      >
        To Admin Models
      </button>
    </div>
  );
};

export default AdminCreateModel;
