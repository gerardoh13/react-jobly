import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  let activeClassName = "nav-link active fw-bold";

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Jobly
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-start">
            <li className="nav-item">
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive ? activeClassName : "nav-link"
                }
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="signup"
                className={({ isActive }) =>
                  isActive ? activeClassName : "nav-link"
                }
              >
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
