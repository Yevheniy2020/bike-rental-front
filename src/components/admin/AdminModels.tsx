import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllModels } from "../../api/modelApi.ts"; // Adjust the import path as necessary
import { CreateBikeModelDTO } from "../../api/types/types.ts"; // Adjust the import path as necessary

const AdminModels = () => {
  const navigate = useNavigate();
  const [models, setModels] = useState<CreateBikeModelDTO[]>([]);

  const handleUpdate = (index) => {
    console.log("Update model with index:", index);
  };
  const handleDelete = (index) => {
    console.log("Delete model with index:", index);
  };
  const handlePostNew = () => {
    navigate("/admin/create/model");
  };

  const fetchModels = async () => {
    try {
      const response: any = await getAllModels();
      setModels(response); // Assuming response.data contains the models
    } catch (error) {
      console.error("Failed to fetch models:", error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <div style={{ maxWidth: "930px", margin: "40px auto" }}>
      <h1 style={{ textAlign: "center" }}>Admin Models</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Index</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Brand ID
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {models.map((model, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {index + 1}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {model.name}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {model.brandId}
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
                  onClick={() => handleDelete(index)}
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
                  onClick={() => handleUpdate(index)}
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
          Create New Model
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

export default AdminModels;
