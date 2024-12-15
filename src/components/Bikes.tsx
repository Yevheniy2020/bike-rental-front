import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBikes } from "../api/bikeApi.ts";
import { CreateBikeDTO } from "../api/types/types.ts";

const Bikes = () => {
  const [bikes, setBikes] = useState<CreateBikeDTO[]>([]);
  const [modelFilter, setModelFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  const fetchBikes = async () => {
    try {
      const response: any = await getAllBikes();
      console.log(response);
      setBikes(response);
    } catch (error) {
      console.error("Failed to fetch bikes:", error);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const navigate = useNavigate();

  const handleBikeClick = (id) => {
    navigate(`/bike-view/${id}`);
  };

  const filteredBikes = bikes.filter((bike) => {
    const modelName = bike.bikeModelId
      ? bike.bikeModel?.name.toLowerCase()
      : "";
    const brandName = bike.bikeModelId
      ? bike.bikeModel?.brand?.name.toLowerCase()
      : "";
    return (
      (modelFilter === "" || modelName.includes(modelFilter.toLowerCase())) &&
      (brandFilter === "" || brandName.includes(brandFilter.toLowerCase()))
    );
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
          gap: "20px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
          gap: "20px",
        }}
      >
        <select
          value={modelFilter}
          onChange={(e) => setModelFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            fontSize: "16px",
            color: "#333",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            width: "200px", // Added optimal width
          }}
        >
          <option value="">Filter by model</option>
          {[...new Set(bikes.map((bike) => bike.bikeModel?.name))].map(
            (modelName, index) => (
              <option key={index} value={modelName}>
                {modelName}
              </option>
            )
          )}
        </select>
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            fontSize: "16px",
            color: "#333",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            width: "200px", // Added optimal width
          }}
        >
          <option value="">Filter by brand</option>
          {[...new Set(bikes.map((bike) => bike.bikeModel?.brand?.name))].map(
            (brandName, index) => (
              <option key={index} value={brandName}>
                {brandName}
              </option>
            )
          )}
        </select>
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
          onClick={() => navigate("/admin")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1976D2"; // Darker blue on hover
            e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#2196F3"; // Original blue
            e.currentTarget.style.transform = "scale(1)"; // Reset size
          }}
        >
          To Admin
        </button>
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
            // Add your logout logic here
            localStorage.setItem("user", "null"); // Set user data in local storage
            window.location.reload(); // Reload the current page
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#D32F2F"; // Darker red on hover
            e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#F44336"; // Original red
            e.currentTarget.style.transform = "scale(1)"; // Reset size
          }}
        >
          Log Out
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {filteredBikes.map((bike) => (
          <div
            key={bike.id}
            onClick={() => handleBikeClick(bike.id)}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={bike.photoUrl}
              alt={bike.description}
              style={{
                width: "100%",
                borderRadius: "8px",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <h3>{bike.description}</h3>
            <p>Price per hour: ${bike.pricePerHour}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bikes;
