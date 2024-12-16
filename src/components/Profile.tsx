import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../api/orderApi.ts"; // Importing the getMyOrders function

interface UserData {
  username: string;
  role: number;
}

const Profile = () => {
  const [parsedData, setParsedData] = useState<UserData | undefined>();
  const [orders, setOrders] = useState<any[]>([]); // State to hold orders
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user") !== "null";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = localStorage.getItem("userData");
        if (userData) {
          setParsedData(JSON.parse(userData));
        } else {
          console.log("No user data found.");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersResponse = await getMyOrders(); // Using the imported getMyOrders function
      console.log(ordersResponse);
      setOrders(ordersResponse || []); // Ensure orders is an array
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "20px auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ color: "#4CAF50" }}>Personal Profile</h2>
      <p>
        <strong>Name:</strong> {parsedData?.username || "Not Found"}
      </p>
      <p>
        <strong>Role:</strong> {parsedData?.role === 1 ? "User" : "Admin"}
      </p>
      <h3>My Orders</h3>
      <ul>
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order, index) => (
            <li key={index}>
              <a href={"/bike-view/" + order.bike.id}>
                {order.bike.description} / ${order.toPay}
              </a>
            </li> // Render each order
          ))
        ) : (
          <li>No orders found.</li>
        )}
      </ul>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            padding: "15px 30px",
            backgroundColor: "#F44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onClick={() => {
            localStorage.setItem("userData", "null");
            localStorage.setItem("user", "null");
            window.location.reload();
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#D32F2F";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#F44336";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Log Out
        </button>
        <button
          style={{
            padding: "15px 30px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onClick={() => (window.location.href = "/")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1976D2";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#2196F3";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
