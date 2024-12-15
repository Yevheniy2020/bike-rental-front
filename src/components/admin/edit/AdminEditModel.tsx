import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import { updateModel, getModelById } from "../../../api/modelApi.ts"; // Updated to modelApi
import { CreateBikeModelDTO } from "../../../api/types/types.ts"; // Updated to CreateBikeModelDTO
import { useParams } from "react-router-dom";

const AdminEditModel = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [modelData, setModelData] = useState<CreateBikeModelDTO | null>(null); // Changed to null

  useEffect(() => {
    const fetchModelData = async () => {
      if (id) {
        try {
          const modelResponse = await getModelById(parseInt(id)); // Fetch model data
          setModelData(modelResponse as any); // Set fetched model data
        } catch (error) {
          console.error("Failed to fetch model data:", error);
        }
      }
    };
    fetchModelData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (modelData) {
      setModelData({ ...modelData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modelData) {
      try {
        const modelId = id ? parseInt(id) : 0;
        await updateModel(modelId, modelData);
        navigate("/admin/models");
      } catch (error) {
        console.error("Failed to edit model:", error);
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
      <h1 style={{ textAlign: "center", color: "#333" }}>Edit Model</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={modelData?.name || ""} // Set default value
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
            htmlFor="brandId"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Brand ID:
          </label>
          <input
            type="number"
            id="brandId"
            name="brandId"
            value={modelData?.brandId || 0} // Set default value
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
        onClick={() => navigate("/admin/models")}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#d32f2f";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f44336";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        To Admin Models
      </button>
    </div>
  );
};

export default AdminEditModel;
