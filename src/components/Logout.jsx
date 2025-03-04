import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Logout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track the login state
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Check if the user is logged in based on token in storage
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    console.log('Token in storage:', token);  // Debug log to check token
    setIsLoggedIn(!!token); // Set state to true if token exists
  };

  useEffect(() => {
    console.log('Checking login status...');
    checkLoginStatus(); // Check login status when the component mounts

    const storageListener = () => {
      console.log('Storage changed, checking login status again...');
      checkLoginStatus();  // Re-check login status when storage changes
    };

    window.addEventListener('storage', storageListener);

    return () => window.removeEventListener('storage', storageListener); // Cleanup listener
  }, []); // Only run on initial mount

  // Handle logout
  const handleLogout = () => {
    console.log('Logging out...');
    
    // Remove token from both localStorage and sessionStorage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    // Update the login state and redirect to login page
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    // Render the logout button only when logged in
    isLoggedIn ? (
      <button className="btn btn-outline-danger ms-auto" onClick={handleLogout}>
        Logout
      </button>
    ) : null // Do not render the button when not logged in
  );
}

export default Logout;
