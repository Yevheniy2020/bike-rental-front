import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBikes } from "../../api/bikeApi.ts"; // Adjust the import path as necessary
import { CreateBikeDTO } from "../../api/types/types.ts"; // Adjust the import path as necessary

const AdminBikes = () => {
  const navigate = useNavigate();
  const [bikes, setBikes] = useState<CreateBikeDTO[]>([]);

  const handleUpdate = (id) => {
    console.log("lol");
  };
  const handleDelete = (id) => {
    console.log("lol");
  };
  const handlePostNew = () => {
    navigate("/admin/create/bike");
  };

  const fetchBikes = async () => {
    try {
      const response: any = await getAllBikes();
      setBikes(response);
    } catch (error) {
      console.error("Failed to fetch bikes:", error);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  return (
    <div style={{ maxWidth: "930px", margin: "40px auto" }}>
      <h1 style={{ textAlign: "center" }}>Admin Bikes</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Description
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Photo</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Price per Hour
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Bike Model ID
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Renting Center ID
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike) => (
            <tr key={bike.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {bike.id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {bike.description}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <img
                  src={bike.photoUrl}
                  alt={bike.description}
                  style={{ width: "100px", borderRadius: "4px" }}
                />
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                ${bike.pricePerHour}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {bike.bikeModelId}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {bike.rentingCenterId}
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
                  onClick={() => handleDelete(bike.id)}
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
                    marginTop: "5px",
                  }}
                  onClick={() => handleUpdate(bike.id)}
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
          Create New Bike
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

export default AdminBikes;
