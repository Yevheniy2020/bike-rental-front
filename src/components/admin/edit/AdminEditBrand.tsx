import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import { updateBrand, getBrandById } from "../../../api/brandApi.ts"; // Added getBrandById
import { CreateBrandDTO } from "../../../api/types/types.ts";
import { useParams } from "react-router-dom";

const AdminEditBrand = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [brandData, setBrandData] = useState<CreateBrandDTO | null>(null); // Changed to null

  useEffect(() => {
    const fetchBrandData = async () => {
      if (id) {
        try {
          const brandResponse = await getBrandById(parseInt(id)); // Fetch brand data
          setBrandData(brandResponse as any); // Set fetched brand data
        } catch (error) {
          console.error("Failed to fetch brand data:", error);
        }
      }
    };
    fetchBrandData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (brandData) {
      setBrandData({ ...brandData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (brandData) {
      try {
        const brandId = id ? parseInt(id) : 0;
        await updateBrand(brandId, brandData);
        navigate("/admin/brands");
      } catch (error) {
        console.error("Failed to edit brand:", error);
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
      <h1 style={{ textAlign: "center", color: "#333" }}>Edit Brand</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Brand Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={brandData?.name || ""} // Set default value
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
            htmlFor="description"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={brandData?.description || ""} // Set default value
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
        onClick={() => navigate("/admin/brands")}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#d32f2f";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f44336";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        To Admin Brands
      </button>
    </div>
  );
};

export default AdminEditBrand;
