import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div>
      <div className="container mt-5">
        <div className="jumbotron text-center">
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
