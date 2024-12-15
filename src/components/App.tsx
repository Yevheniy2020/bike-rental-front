import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bikes from "./Bikes.tsx";

const App = () => {
  const navigate = useNavigate();
  const isAuthenticated = checkAuth(); // Check authentication based on local storage

  useEffect(() => {
    console.log(localStorage.getItem("user") !== "null");

    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ maxWidth: "930px", margin: "40px auto" }}>
      {isAuthenticated ? <Bikes /> : null}
    </div>
  );
};

const checkAuth = () => {
  return localStorage.getItem("user") !== "null";
};

export default App;
