import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBrands, deleteBrand } from "../../api/brandApi.ts"; // Adjust the import path as necessary
import { CreateBrandDTO } from "../../api/types/types.ts";

const AdminBrands = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<CreateBrandDTO[]>([]);

  const handleUpdate = (id) => {
    navigate(`/admin/update/brand/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      try {
        await deleteBrand(id); // Call the deleteBrand function from the API
        setBrands(brands.filter((brand) => brand.id !== id)); // Update the state to remove the deleted brand
      } catch (error) {
        console.error("Failed to delete brand:", error);
      }
    }
  };
  const handlePostNew = () => {
    navigate("/admin/create/brand");
  };

  const fetchBrands = async () => {
    try {
      const response: any = await getAllBrands();
      setBrands(response); // Assuming response.data contains the brands
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div style={{ maxWidth: "930px", margin: "40px auto" }}>
      <h1 style={{ textAlign: "center" }}>Admin Brands</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Description
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {brand.id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {brand.name}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {brand.description}
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
                  onClick={() => handleDelete(brand.id)}
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
                  onClick={() => handleUpdate(brand.id)}
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
          Create New Brand
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

export default AdminBrands;
