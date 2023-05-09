import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './Logout-Button';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <img
          alt="logo"
          src="/Logo.jpg"
          style={{
            height: 40,
            width: 40
          }}
        />
        <Link className="navbar-brand" to="/">
        🏠Signal House🏠
        </Link>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
