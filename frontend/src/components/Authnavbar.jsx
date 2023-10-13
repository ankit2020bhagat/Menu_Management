import React from "react";
import "./Navbar.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
export default function Authnavbar() {
  const navigate = useNavigate();
  return (
    <div>
      <ul className="nav justify-content-end shadow-lg mb-5 py-3 bg-body rounded">
        <li className="nav-item">
          <NavLink
            className="nav-link fs-5 fw-bold text-black"
            href="#"
            to="/login"
          >
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
