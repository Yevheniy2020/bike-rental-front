import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bikes from "./Bikes.tsx";

const App = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user") !== "null";
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ maxWidth: "930px", margin: "40px auto" }}>
      {isAuthenticated ? <Bikes /> : null}
    </div>
  );
};

export default App;
