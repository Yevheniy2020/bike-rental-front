import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders, deleteOrder } from "../../api/orderApi.ts"; // Adjust the import path as necessary
import { CreateOrderDTO } from "../../api/types/types.ts"; // Adjust the import path as necessary

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<CreateOrderDTO[]>([]);

  const handleUpdate = (id) => {
    navigate(`/admin/update/order/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id); // Call the deleteOrder function from the API
        setOrders(orders.filter((order) => order.id !== id)); // Update the state to remove the deleted order
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    }
  };
  const handlePostNew = () => {
    navigate("/admin/create/order");
  };

  const fetchOrders = async () => {
    try {
      const response: any = await getAllOrders();
      setOrders(response); // Assuming response.data contains the orders
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ maxWidth: "930px", margin: "40px auto" }}>
      <h1 style={{ textAlign: "center" }}>Admin Orders</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Index</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              User ID
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Bike ID
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>To Pay</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {order.id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {order.userId}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {order.bikeId}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {order.toPay}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                  onClick={() => handleDelete(order.id)}
                >
                  Delete
                </button>
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleUpdate(order.id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onClick={() => handlePostNew()}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#45a049"; // Darker green on hover
            e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#4CAF50"; // Original green
            e.currentTarget.style.transform = "scale(1)"; // Reset size
          }}
        >
          Create New Order
        </button>
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
            marginLeft: "10px",
          }}
          onClick={() => navigate("/admin")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#d32f2f"; // Darker red on hover
            e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#f44336"; // Original red
            e.currentTarget.style.transform = "scale(1)"; // Reset size
          }}
        >
          To Admin
        </button>
      </div>
    </div>
  );
};

export default AdminOrders;
