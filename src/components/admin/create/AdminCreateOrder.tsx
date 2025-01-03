import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../../api/orderApi.ts"; // Adjust the import path as necessary

const AdminCreateOrder = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    userId: 0,
    bikeId: 0,
    toPay: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addOrder(orderData);
      navigate("/admin/orders");
    } catch (error) {
      console.error("Failed to create order:", error);
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
      <h1 style={{ textAlign: "center", color: "#333" }}>Create a New Order</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="userId"
            style={{ display: "block", marginBottom: "5px" }}
          >
            User ID:
          </label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={orderData.userId}
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
            htmlFor="bikeId"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Bike ID:
          </label>
          <input
            type="number"
            id="bikeId"
            name="bikeId"
            value={orderData.bikeId}
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
            htmlFor="toPay"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Amount to Pay:
          </label>
          <input
            type="number"
            id="toPay"
            name="toPay"
            value={orderData.toPay}
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
          Create Order
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
        onClick={() => navigate("/admin/orders")}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#d32f2f"; // Darker red on hover
          e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f44336"; // Original red
          e.currentTarget.style.transform = "scale(1)"; // Reset size
        }}
      >
        To Admin Orders
      </button>
    </div>
  );
};

export default AdminCreateOrder;
