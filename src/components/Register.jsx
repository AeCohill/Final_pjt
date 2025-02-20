// src/RegistrationForm.jsx
import { useState } from "react";
import Input  from "../ui/Input";
import Button  from "../ui/Button";
import { Card } from "../ui/Card";
import "../styles.css";

function RegistrationForm({ onClose }) {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    shirtSize: "Medium",
    notifications: true,
    bio: ""
  });

  function handleSubmit(event) {
    event.preventDefault();
    alert(`Username: ${inputs.username}\n` +
          `Email: ${inputs.email}\n` +
          `Shirt size: ${inputs.shirtSize}\n` +
          `Notifications: ${inputs.notifications}\n` +
          `Bio: ${inputs.bio}`);
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.type === "checkbox" ? 
       event.target.checked : event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  return (
    <Card className="registration-form">
      <h2 className="form-title">Register</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <Input type="text" name="username" placeholder="Username" value={inputs.username} onChange={handleChange} />
        <Input type="email" name="email" placeholder="Email" value={inputs.email} onChange={handleChange} />
        <Input type="email" name="Fname" placeholder="First Name" value={inputs.email} onChange={handleChange} />
        <Input type="email" name="Lname" placeholder="Last Name" value={inputs.email} onChange={handleChange} />
        <Input type="email" name="Pword" placeholder="Password" value={inputs.email} onChange={handleChange} />
        <Input type="email" name="conPword" placeholder="Confirm Password" value={inputs.email} onChange={handleChange} />
        
        <label>Student or Teacher</label>
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
