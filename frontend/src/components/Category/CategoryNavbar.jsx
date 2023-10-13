import React from "react";
import "./Navbar.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
export default function CategoryNavbar() {
  const navigate = useNavigate();
  return (
    <div>
      <ul className="nav justify-content-end shadow-lg mb-5 py-3 bg-body rounded">
        <li className="nav-item">
          <NavLink
            className="nav-link active fs-5 fw-bold text-black "
            aria-current="page"
            href="#"
            to="/breakfast"
          >
            Breakfast
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link fs-5 fw-bold text-black"
            href="#"
            to="/lunch"
          >
            Lunch
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link fs-5 fw-bold text-black"
            href="#"
            to="/dinner"
          >
            Dinner
          </NavLink>
        </li>
        <button
          type="button"
          className="btn btn-warning btn-sm rounded-pill my-2 p-2 button2"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </ul>
    </div>
  );
}
