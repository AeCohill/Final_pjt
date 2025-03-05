import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function NavBar({ isLoggedIn }) {  // Accept isLoggedIn as a prop
  const navigate = useNavigate(); // Hook for navigation

  const userRole = localStorage.getItem("role")

  return (
    <nav className="navbar bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logout Button (only show when logged in) */}
        {isLoggedIn && <Logout />} {/* If logged in, show logout button */}

        {/* Offcanvas Menu */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Navigation
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {/* Home Link (always visible) */}
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">
                  Home
                </Link>
              </li>

              {/* Login Link (only show if not logged in) */}
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/login">
                    Login
                  </Link>
                </li>
              )}

              {/* Other Links (only visible when logged in) */}
              {isLoggedIn && (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Classes & Registration
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-start">
                      <li>
                        <Link className="dropdown-item" to="/courselist">
                          Course List
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      
                      <li>
                        <Link className="dropdown-item" to="/registration">
                          Register for Classes
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Admin Settings Dropdown */}
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin Settings
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-start">
                      <li>
                        <Link className="dropdown-item" to="/course">
                          Add Classes
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/api">
                          API Testing
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
            {/* Search Form */}
            <form className="d-flex mt-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
