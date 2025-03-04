import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Logout() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Check if the user is logged in based on token in storage
  const isLoggedIn = !!localStorage.getItem('token') || !!sessionStorage.getItem('token');

  // Handle logout logic
  const handleLogout = () => {
    console.log('Logging out...');

    // Remove token from both localStorage and sessionStorage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    // Redirect to login page
    
    navigate('/login');

    window.location.reload();
  };

  // Render the logout button only when logged in
  if (!isLoggedIn) return null;

  return (
    <button className="btn btn-outline-danger ms-auto" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
