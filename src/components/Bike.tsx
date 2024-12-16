import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBikeById } from "../api/bikeApi.ts";
import { getCenterById } from "../api/centerApi.ts";
import { addOrder } from "../api/orderApi.ts";

import {
  CreateBikeByBikeIdDTO,
  CreateRentingCenterDTO,
  CreateOrderDTO,
} from "../api/types/types.ts";

const Bike = () => {
  const { id } = useParams();
  const [bike, setBike] = React.useState<CreateBikeByBikeIdDTO | null>(null);
  const [rentingCenter, setRentingCenter] =
    React.useState<CreateRentingCenterDTO | null>(null);

  const fetchBike = async (bikeId) => {
    const bikeResponse: any = await getBikeById(bikeId);
    setBike(bikeResponse);
    console.log(bikeResponse); // Fixed log to show the fetched bike response

    return bikeResponse;
  };

  const fetchRentingCenter = async (rentingCenterId) => {
    const centerResponse: any = await getCenterById(rentingCenterId);
    setRentingCenter(centerResponse);
    console.log(centerResponse); // Fixed log to show the fetched renting center response
  };

  const fetchBikeData = async () => {
    try {
      const bikeResponse = await fetchBike(id);
      await fetchRentingCenter(bikeResponse.rentingCenterId);
    } catch (error) {
      console.error("Failed to fetch bike data:", error);
    }
  };

  useEffect(() => {
    fetchBikeData();
  }, [id]);

  const handlerOnClickOrderNow = async () => {
    if (!bike) return; // Ensure bike data is available
    const userData = localStorage.getItem("userData");
    const parsedData = userData ? JSON.parse(userData) : null;

    if (!parsedData) {
      alert("User data not found. Please log in.");
      return;
    }

    const orderData: CreateOrderDTO = {
      userId: parsedData.id, // Replace with actual user ID from context or state
      bikeId: bike.id,
      toPay: bike.pricePerHour, // Assuming pricePerHour is the amount to pay
    };
    try {
      await addOrder(orderData);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #4CAF50",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "20px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {bike?.photoUrl && (
        <img
          src={bike.photoUrl}
          alt={bike?.bikeModel?.name}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      )}
      <h2 style={{ color: "#4CAF50" }}>{bike?.bikeModel?.name}</h2>
      <p>{bike?.description}</p>
      <h3 style={{ color: "#333" }}>Brand Information</h3>
      <p>
        <strong>Name:</strong> {bike?.bikeModel?.brand?.name}
      </p>
      <p>
        <strong>Description:</strong> {bike?.bikeModel?.brand?.description}
      </p>
      <h3 style={{ color: "#333" }}>Renting Center Location</h3>
      <div style={{ width: "100%", height: "300px" }}>
        <iframe
          title="Renting Center Location"
          src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyAFsQWz4yW6KYla1oKHFOcajtmaorkA6F4&center=${rentingCenter?.latitude},${rentingCenter?.longitude}&zoom=15`}
          style={{ width: "100%", height: "100%", border: "0" }}
          allowFullScreen
        ></iframe>
      </div>
      <p>
        <strong>Price per Hour:</strong> ${bike?.pricePerHour?.toFixed(2)}
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center", // Center buttons horizontally
          justifyContent: "center", // Center buttons vertically
          margin: "20px 0", // Add margin for spacing
        }}
      >
        <button
          style={{
            padding: "15px 30px", // Increased padding
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            margin: "10px 0", // Add margin for spacing between buttons
            transition: "background-color 0.3s, transform 0.2s", // Transition for hover effect
          }}
          onClick={handlerOnClickOrderNow}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#45a049"; // Darker green on hover
            e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#4CAF50"; // Original green
            e.currentTarget.style.transform = "scale(1)"; // Reset size
          }}
        >
          Order Now
        </button>
        <button
          style={{
            padding: "15px 30px", // Increased padding
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            margin: "10px 0", // Add margin for spacing between buttons
            transition: "background-color 0.3s, transform 0.2s", // Transition for hover effect
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

export default Bike;
