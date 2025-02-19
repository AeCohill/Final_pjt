// src/login.jsx
import { useState } from "react";
import Input  from "../ui/Input";
import Button  from "../ui/Button";
import { Card } from "../ui/Card";
import { useNavigate } from "react-router-dom";
import "../styles.css";

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    acctType: "Student"
  });

  function handleSubmit(event) {
    event.preventDefault();
    alert(`Username: ${inputs.username}\n` +
          `Password: ${inputs.password}\n` +
          `Account Type: ${inputs.acctType}`);
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
    </Card>
  );
}

export default Login;
