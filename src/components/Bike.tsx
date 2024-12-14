import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBikeById } from "../api/bikeApi.ts";
import { getBrandById } from "../api/brandApi.ts";
import { getCenterById } from "../api/centerApi.ts";
import { getModelById } from "../api/modelApi.ts";
import {
  CreateBikeDTO,
  CreateBikeModelDTO,
  CreateBrandDTO,
  CreateRentingCenterDTO,
} from "../api/types/types.ts";

const YUMMY_DATA_BRAND = {
  name: "Yummy Brand 1",
  description: "This is a delicious brand for all your biking needs.",
};
const YUMMY_DATA_RENTING_CENTER = {
  latitude: 34.0522,
  longitude: -118.2437,
  description: "Yummy Renting Center 1 - The best place to rent bikes!",
};
const YUMMY_DATA_MODEL = {
  name: "Yummy Model 1",
  brandId: 1,
};
const Bike = () => {
  const { id } = useParams();
  const [bike, setBike] = React.useState<CreateBikeDTO | null>(null);
  const [brand, setBrand] = React.useState<CreateBrandDTO | null>(null);
  const [rentingCenter, setRentingCenter] =
    React.useState<CreateRentingCenterDTO | null>(null);
  const [model, setModel] = React.useState<CreateBikeModelDTO | null>(null);

  const fetchBike = async (bikeId) => {
    const bikeResponse: any = await getBikeById(bikeId);
    setBike(bikeResponse);
    return bikeResponse;
  };

  const fetchBrand = async (bikeModelId) => {
    const brandResponse: any = await getBrandById(bikeModelId);
    setBrand(brandResponse);
  };

  const fetchRentingCenter = async (rentingCenterId) => {
    const centerResponse: any = await getCenterById(rentingCenterId);
    setRentingCenter(centerResponse);
  };

  const fetchModel = async (bikeModelId) => {
    const modelResponse: any = await getModelById(bikeModelId);
    setModel(modelResponse);
  };

  const fetchBikeData = async () => {
    try {
      const bikeResponse = await fetchBike(id);
      await fetchBrand(bikeResponse.bikeModelId);
      await fetchRentingCenter(bikeResponse.rentingCenterId);
      await fetchModel(bikeResponse.bikeModelId); // Fixed to use bikeModelId instead of rentingCenterId
    } catch (error) {
      console.error("Failed to fetch bike data:", error);
    }
  };

  useEffect(() => {
    fetchBikeData();
    console.log(bike);
    console.log(brand);
    console.log(rentingCenter);
    console.log(model);
  }, [id]);

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
      <h2 style={{ color: "#4CAF50" }}>{YUMMY_DATA_MODEL.name}</h2>
      <h3 style={{ color: "#333" }}>Brand Information</h3>
      <p>
        <strong>Name:</strong> {YUMMY_DATA_BRAND.name}
      </p>
      <p>
        <strong>Description:</strong> {YUMMY_DATA_BRAND.description}
      </p>
      <h3 style={{ color: "#333" }}>Renting Center Location</h3>
      <p>
        <strong>Latitude:</strong> {YUMMY_DATA_RENTING_CENTER.latitude}
      </p>
      <p>
        <strong>Longitude:</strong> {YUMMY_DATA_RENTING_CENTER.longitude}
      </p>
      <p>
        <strong>Description:</strong> {YUMMY_DATA_RENTING_CENTER.description}
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
          onClick={() => alert("Order placed for " + YUMMY_DATA_MODEL.name)}
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
