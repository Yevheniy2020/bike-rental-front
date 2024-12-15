import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi.ts"; // Adjust the import path as necessary
import { LoginUserDTO } from "../../api/types/types.ts"; // Adjust the import path as necessary

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Changed email to username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: LoginUserDTO = { username, password }; // Changed email to username

    try {
      const response = await login(data);

      console.log(response);

      localStorage.setItem("user", response.accessToken); // Set user data in local storage
      navigate("/"); // Redirect to dashboard or another page after successful login
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="username"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "calc(100%)", // Adjusted width for padding
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box", // Ensures padding is included in width
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "calc(100% )", // Adjusted width for padding
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box", // Ensures padding is included in width
            }}
          />
        </div>
        <div>
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
            }}
          >
            Login
          </button>
          <button
            type="button"
            style={{
              padding: "10px 20px",
              backgroundColor: "#008CBA",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background-color 0.3s, transform 0.2s",
              marginLeft: "10px", // Add some space between buttons
            }}
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
