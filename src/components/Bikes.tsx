import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBikes } from "../api/bikeApi.ts";
import { CreateBikeDTO } from "../api/types/types.ts";

const Bikes = () => {
  const [bikes, setBikes] = React.useState<CreateBikeDTO[]>([]);

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
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
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
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {bikes.map((bike) => (
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
