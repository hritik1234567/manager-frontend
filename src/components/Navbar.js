import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import AddMetric from './AddMetric'; // Import your modal component
import '../utility/navbar.css'; // For custom styles

function Navbar({ refreshData }) { // Accept refreshData as a prop
  const [showModal, setShowModal] = useState(false); // Manage modal state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const navigate = useNavigate();

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Set isAuthenticated to true if token exists
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    setIsAuthenticated(false); // Update authentication state
    navigate('/login'); // Navigate to login page
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* Navbar Brand */}
          <NavLink className="navbar-brand" to="/">Health Track</NavLink>

          {/* Navbar Toggler for mobile */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Navbar */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              {/* Dashboard Link */}
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/" 
                  end
                  activeClassName="active"
                >
                  Dashboard
                </NavLink>
              </li>
              
              {/* About Link */}
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/about"
                  activeClassName="active"
                >
                  About
                </NavLink>
              </li>

              {/* Add Metric Link */}
              <li className="nav-item">
                <span 
                  className="nav-link" 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => setShowModal(true)} // Open the modal when clicked
                >
                  Add
                </span>
              </li>
            </ul>

            {/* Right Side (Login/Signup/Logout) */}
            <div className="d-flex">
              {isAuthenticated ? (
                <button 
                  className="btn btn-danger mx-2" 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink 
                    className="btn btn-outline-primary mx-2" 
                    to="/signup"
                    activeClassName="active"
                  >
                    Sign Up
                  </NavLink>
                  <NavLink 
                    className="btn btn-primary mx-2" 
                    to="/login"
                    activeClassName="active"
                  >
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Render AddMetric modal and pass refreshData */}
      {showModal && <AddMetric closeModal={() => setShowModal(false)} refreshData={refreshData} />} 
    </>
  );
}

export default Navbar;
