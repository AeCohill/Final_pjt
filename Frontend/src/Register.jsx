// src/RegistrationForm.jsx
import { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";

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
        
        <label>Shirt size:</label>
        <select name="shirtSize" value={inputs.shirtSize} onChange={handleChange}>
           <option value="Small">Small</option>
           <option value="Medium">Medium</option>
           <option value="Large">Large</option>
        </select>

        <label>
          <input type="checkbox" name="notifications" checked={inputs.notifications} onChange={handleChange} />
          Receive notifications?
        </label>

        <textarea name="bio" placeholder="Short bio" value={inputs.bio} onChange={handleChange}></textarea>

        <Button type="submit">Register</Button>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
      </form>
    </Card>
  );
}

export { RegistrationForm };
