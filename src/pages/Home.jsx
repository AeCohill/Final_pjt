import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("uname");
    localStorage.removeItem("auth");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="jumbotron text-center">
          <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
          <h1 className="display-4">Welcome to Our Student Registration Website!</h1>
          <p className="lead">We're glad to have you here. Explore and enjoy your stay.</p>
          <hr className="my-4" />
          <p>Get started by logging in with the button below.</p>
          <Link className="nav-button" to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
