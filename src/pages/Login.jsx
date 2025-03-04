import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Card } from "../ui/Card";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(event) {
  event.preventDefault();

  setError("");  // Clear previous errors

  try {
    const response = await fetch("https://equinox-backend.glitch.me/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: inputs.username,
        password: inputs.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    // ✅ Save token and role to localStorage
    localStorage.setItem("token", data.token);  // Save the auth token
    localStorage.setItem("role", data.role);  // Save the user's role (received from the backend)

    // Optionally, navigate to a different route if you don't want to refresh
    navigate("/");  // Redirect to the dashboard or home page
    window.location.reload(); 
  } catch (err) {
    setError(err.message);
  }
}


  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <Card className="login-form">
      <h2 className="form-title">Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="form-group">
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={inputs.username}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
        />

        <Button type="submit">Login</Button>
        <Button type="button" onClick={() => navigate("/")} variant="outline">
          Cancel
        </Button>
      </form>

      <p>Not Registered? <Link to="/register">CLICK HERE!</Link></p>
    </Card>
  );
}

export default Login;
