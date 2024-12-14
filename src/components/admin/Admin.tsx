import React from "react";

const Admin = () => {
  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "390px",
        margin: "20px auto",
      }}
    >
      <h1>Admin Dashboard</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr", // Two columns
          gap: "20px", // Space between buttons
        }}
      >
        <button
          style={{
            ...buttonStyle,
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onClick={() => (window.location.href = "/admin/bikes")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1976D2"; // Darker blue on hover
            e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor; // Original blue
            e.currentTarget.style.transform = "scale(1)"; // Reset size
          }}
        >
          Bikes
        </button>
        <button
          style={{
            ...buttonStyle,
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onClick={() => (window.location.href = "/admin/brands")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1976D2"; // Darker blue on hover
            e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor; // Original blue
            e.currentTarget.style.transform = "scale(1)"; // Reset size
          }}
        >
          Brands
        </button>
        <button
          style={{
            ...buttonStyle,
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onClick={() => (window.location.href = "/admin/centers")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1976D2"; // Darker blue on hover
            e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor; // Original blue
            e.currentTarget.style.transform = "scale(1)"; // Reset size
          }}
        >
          Renting Centers
        </button>
        <button
          style={{
            ...buttonStyle,
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onClick={() => (window.location.href = "/admin/models")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1976D2"; // Darker blue on hover
            e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor; // Original blue
            e.currentTarget.style.transform = "scale(1)"; // Reset size
          }}
        >
          Models
        </button>
        <button
          style={{
            ...buttonStyle,
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onClick={() => (window.location.href = "/admin/orders")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1976D2"; // Darker blue on hover
            e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor; // Original blue
            e.currentTarget.style.transform = "scale(1)"; // Reset size
          }}
        >
          Orders
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#f44336",
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onClick={() => (window.location.href = "/")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#d32f2f"; // Darker red on hover
            e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#f44336"; // Original red
            e.currentTarget.style.transform = "scale(1)"; // Reset size
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "15px 30px",
  backgroundColor: "#2196F3",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Admin;
