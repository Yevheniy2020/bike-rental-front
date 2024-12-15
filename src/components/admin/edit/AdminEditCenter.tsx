import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import { updateCenter, getCenterById } from "../../../api/centerApi.ts"; // Updated to centerApi
import { CreateRentingCenterDTO } from "../../../api/types/types.ts"; // Updated to CreateCenterDTO
import { useParams } from "react-router-dom";

const AdminEditCenter = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [centerData, setCenterData] = useState<CreateRentingCenterDTO | null>(
    null
  ); // Changed to null

  useEffect(() => {
    const fetchCenterData = async () => {
      if (id) {
        try {
          const centerResponse = await getCenterById(parseInt(id)); // Fetch center data
          setCenterData(centerResponse as any); // Set fetched center data
        } catch (error) {
          console.error("Failed to fetch center data:", error);
        }
      }
    };
    fetchCenterData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (centerData) {
      setCenterData({ ...centerData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (centerData) {
      try {
        const centerId = id ? parseInt(id) : 0;
        await updateCenter(centerId, centerData);
        navigate("/admin/centers");
      } catch (error) {
        console.error("Failed to edit center:", error);
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
      <h1 style={{ textAlign: "center", color: "#333" }}>Edit Center</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="latitude"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Latitude:
          </label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={centerData?.latitude || 0} // Set default value
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
            htmlFor="longitude"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Longitude:
          </label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={centerData?.longitude || 0} // Set default value
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
        onClick={() => navigate("/admin/centers")}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#d32f2f";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f44336";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        To Admin Centers
      </button>
    </div>
  );
};

export default AdminEditCenter;
