// src/RegistrationForm.jsx
import { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import "./styles.css";
import { useNavigate } from "react-router-dom"; 

function RegistrationForm() {
  const navigate = useNavigate(); // Fix for navigation
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    Fname: "",
    Lname: "",
    Pword: "",
    conPword: "",
    acctType: "Student",  // Default to "Student"
    shirtSize: "Medium",
    notifications: true,
    bio: ""
  });

  // Handles form submission
  function handleSubmit(event) {
    event.preventDefault();
    alert(`Username: ${inputs.username}\n` +
          `Email: ${inputs.email}\n` +
          `First Name: ${inputs.Fname}\n` +
          `Last Name: ${inputs.Lname}\n` +
          `Account Type: ${inputs.acctType}`);
  }

  // Handles input changes
  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  return (
    <Card className="registration-form">
      <h2 className="form-title">Register</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <Input type="text" name="username" placeholder="Username" value={inputs.username} onChange={handleChange} />
        <Input type="email" name="email" placeholder="Email" value={inputs.email} onChange={handleChange} />
        <Input type="text" name="Fname" placeholder="First Name" value={inputs.Fname} onChange={handleChange} />
        <Input type="text" name="Lname" placeholder="Last Name" value={inputs.Lname} onChange={handleChange} />
        <Input type="password" name="Pword" placeholder="Password" value={inputs.Pword} onChange={handleChange} />
        <Input type="password" name="conPword" placeholder="Confirm Password" value={inputs.conPword} onChange={handleChange} />

        <label>Account Type</label>
        <select name="acctType" value={inputs.acctType} onChange={handleChange}>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>

        <Button type="submit">Register</Button>
        <Button type="button" onClick={() => navigate("/")} variant="outline">Cancel</Button>
      </form>
    </Card>
  );
}

export { RegistrationForm };

