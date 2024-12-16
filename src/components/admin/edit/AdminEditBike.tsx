import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import { updateBike, getBikeById } from "../../../api/bikeApi.ts"; // Updated to bikeApi
import { CreateBikeDTO } from "../../../api/types/types.ts";
import { useParams } from "react-router-dom";

const AdminEditBike = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [bikeData, setBikeData] = useState<CreateBikeDTO | null>(null); // Changed to null

  useEffect(() => {
    const fetchBikeData = async () => {
      if (id) {
        try {
          const bikeResponse = await getBikeById(parseInt(id)); // Fetch bike data
          setBikeData(bikeResponse as any); // Set fetched bike data
        } catch (error) {
          console.error("Failed to fetch bike data:", error);
        }
      }
    };
    fetchBikeData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (bikeData) {
      setBikeData({ ...bikeData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (bikeData) {
      try {
        const bikeId = id ? parseInt(id) : 0;
        // Parse bikeData.state to int before updating
        const updatedBikeData = {
          ...bikeData,
          state: parseInt(bikeData.state as any),
        };
        await updateBike(bikeId, updatedBikeData); // Updated to updateBike
        navigate("/admin/bikes");
      } catch (error) {
        console.error("Failed to edit bike:", error);
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
      <h1 style={{ textAlign: "center", color: "#333" }}>Edit Bike</h1>
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
            value={bikeData?.description || ""} // Set default value
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
            htmlFor="photoUrl"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Photo URL:
          </label>
          <input
            type="text"
            id="photoUrl"
            name="photoUrl"
            value={bikeData?.photoUrl || ""} // Set default value
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
            htmlFor="pricePerHour"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Price per Hour:
          </label>
          <input
            type="number"
            id="pricePerHour"
            name="pricePerHour"
            value={bikeData?.pricePerHour || 0} // Set default value
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
            htmlFor="bikeModelId"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Bike Model ID:
          </label>
          <input
            type="number"
            id="bikeModelId"
            name="bikeModelId"
            value={bikeData?.bikeModelId || 0} // Set default value
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
            htmlFor="rentingCenterId"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Renting Center ID:
          </label>
          <input
            type="number"
            id="rentingCenterId"
            name="rentingCenterId"
            value={bikeData?.rentingCenterId || 0} // Set default value
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
            htmlFor="state"
            style={{ display: "block", marginBottom: "5px" }}
          >
            State:
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={bikeData?.state || 0} // Set default value
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
        onClick={() => navigate("/admin/bikes")}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#d32f2f";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f44336";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        To Admin Bikes
      </button>
    </div>
  );
};

export default AdminEditBike;
