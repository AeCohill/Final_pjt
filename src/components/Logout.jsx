import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Logout() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [role, setRole] = useState(null); // State to store the user's role

  // Check if the user is logged in based on token in storage
  const isLoggedIn = !!localStorage.getItem('token') || !!sessionStorage.getItem('token');

  useEffect(() => {
    // If logged in, retrieve role from localStorage
    if (isLoggedIn) {
      const userRole = localStorage.getItem('role');
      setRole(userRole); // Set the role in state
    }
  }, [isLoggedIn]); // Only re-run this effect if the login state changes

  // Handle logout logic
  const handleLogout = () => {
    console.log('Logging out...');

    // Remove token and role from both localStorage and sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    sessionStorage.removeItem('token');

    // Redirect to login page
    navigate('/login');
    window.location.reload();
  };

  // Function to capitalize the first letter of the role
  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Render the logout button and role only when logged in
  if (!isLoggedIn) return null;

  return (
    <div>
      <span>Role: {role ? capitalizeFirstLetter(role) : 'Unknown'}</span> {/* Capitalize first letter */}
      <button className="btn btn-outline-danger ms-auto" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
