import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import { updateOrder, getOrderById } from "../../../api/orderApi.ts"; // Updated to orderApi
import { CreateOrderDTO } from "../../../api/types/types.ts"; // Updated to CreateOrderDTO
import { useParams } from "react-router-dom";

const AdminEditOrder = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<CreateOrderDTO | null>(null); // Changed to null

  useEffect(() => {
    const fetchOrderData = async () => {
      if (id) {
        try {
          const orderResponse = await getOrderById(parseInt(id)); // Fetch order data
          setOrderData(orderResponse as any); // Set fetched order data
        } catch (error) {
          console.error("Failed to fetch order data:", error);
        }
      }
    };
    fetchOrderData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (orderData) {
      setOrderData({ ...orderData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (orderData) {
      try {
        const orderId = id ? parseInt(id) : 0;
        await updateOrder(orderId, orderData);
        navigate("/admin/orders");
      } catch (error) {
        console.error("Failed to edit order:", error);
      }
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
      <h1 style={{ textAlign: "center", color: "#333" }}>Edit Order</h1>
      <form onSubmit={handleSubmit}>
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
            value={orderData?.toPay || 0} // Set default value
            onChange={handleChange}
            required
            style={{
              width: "calc(100% - 20px)",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
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
            value={orderData?.userId || 0} // Set default value
            onChange={handleChange}
            required
            style={{
              width: "calc(100% - 20px)",
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
            value={orderData?.bikeId || 0} // Set default value
            onChange={handleChange}
            required
            style={{
              width: "calc(100% - 20px)",
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
          Save Changes
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
          e.currentTarget.style.backgroundColor = "#d32f2f";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f44336";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        To Admin Orders
      </button>
    </div>
  );
};

export default AdminEditOrder;
