import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Card } from "../ui/Card";
import { useNavigate } from "react-router-dom";
import "../styles.css";

function ClassRegistration() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    role: "Student"
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      // Register user with /user endpoint CHANGE TO OUR URL!!!!!!!!!!!
      const response = await fetch("https://equinox-backend.glitch.me/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: inputs.username,
          email: inputs.email,
          password: inputs.password,
          role: inputs.role.toLowerCase()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("Registration successful!");
      setTimeout(() => navigate("/login"), 1500); // Redirect to login after success
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Card className="registration-form">
      <h2 className="form-title">Register</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleSubmit} className="form-group">
        <Input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={inputs.username} 
          onChange={handleChange} 
        />


        <Button type="submit">Register</Button>
        <Button type="button" onClick={() => navigate("/")} variant="outline">Cancel</Button>
      </form>
    </Card>
  );
}

export default ClassRegistration;
