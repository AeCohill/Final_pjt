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
    acctType: "Student"
  });

  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");  // Clear previous errors

    try {
      const response = await fetch("https://equinox-backend.glitch.me/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: inputs.username,
          password: inputs.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ✅ Save token to localStorage (for keeping user logged in)
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", inputs.username);
      localStorage.setItem("role", inputs.acctType);  // Optional: You might want to track this

      // Redirect to another page after login
      navigate("/");  // Change to your actual app route
    } catch (err) {
      setError(err.message);
    }
  }

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  return (
    <Card className="login-form">
      <h2 className="form-title">Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="form-group">
        <Input type="text" name="username" placeholder="Username" value={inputs.username} onChange={handleChange} />
        <Input type="password" name="password" placeholder="Password" value={inputs.password} onChange={handleChange} />
        
        <label>Account Type</label>
        <select name="acctType" value={inputs.acctType} onChange={handleChange}>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>

        <Button type="submit">Login</Button>
        <Button type="button" onClick={() => navigate("/")} variant="outline">Cancel</Button>
      </form>

      <p>Not Registered? <Link to="/register">CLICK HERE!</Link></p> 
    </Card>
  );
}

export default Login;
