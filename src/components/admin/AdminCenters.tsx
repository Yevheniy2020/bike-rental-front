import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCenters, deleteCenter } from "../../api/centerApi.ts"; // Adjust the import path as necessary
import { CreateRentingCenterDTO } from "../../api/types/types.ts";

const AdminCenters = () => {
  const navigate = useNavigate();
  const [centers, setCenters] = useState<CreateRentingCenterDTO[]>([]);

  const handleUpdate = (id) => {
    navigate(`/admin/update/center/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this center?")) {
      try {
        await deleteCenter(id); // Call the deleteCenter function from the API
        setCenters(centers.filter((center) => center.id !== id)); // Update the state to remove the deleted center
      } catch (error) {
        console.error("Failed to delete center:", error);
      }
    }
  };
  const handlePostNew = () => {
    navigate("/admin/create/center");
  };

  const fetchCenters = async () => {
    try {
      const response: any = await getAllCenters();
      setCenters(response); // Assuming response contains the centers
    } catch (error) {
      console.error("Failed to fetch centers:", error);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  return (
    <div style={{ maxWidth: "930px", margin: "40px auto" }}>
      <h1 style={{ textAlign: "center" }}>Admin Renting Centers</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Latitude
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Longitude
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {centers.map((center) => (
            <tr key={center.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {center.id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {center.latitude}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {center.longitude}
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
                  onClick={() => handleDelete(center.id)}
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
                  onClick={() => handleUpdate(center.id)}
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
          Create New Center
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

export default AdminCenters;
