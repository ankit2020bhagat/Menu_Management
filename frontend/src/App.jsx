import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Dishes from "./components/Dish/Dishes";
import AddDish from "./components/AddDish/AddDish";
import Login from "./components/Auth/Login";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Category from "./components/Category/Category";
const App = () => {
  return (
    <div>
      <h1 className="food-style fs-1 fw-bolder">FlavorFusion Bistro</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dishes />}></Route>
          <Route path="/addDish" element={<AddDish />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="breakfast"
            element={<Category type="Breakfast" />}
          ></Route>
          <Route path="lunch" element={<Category type="Lunch" />}></Route>
          <Route path="dinner" element={<Category type="Dinner" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
