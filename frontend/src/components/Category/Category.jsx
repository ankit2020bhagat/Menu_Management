import React, { useEffect, useState } from "react";
import axios from "axios";
import Dish from "../Dish/Dish";
import CategoryNavbar from "./CategoryNavbar";
const Category = ({ type }) => {
  const [dishes, setDishes] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/menu_management/getdishbycategory/${type}`,
        {}
      );

      setDishes(response.data.dish);
    } catch (err) {}
  };
  useEffect(() => {
    fetchData();
  }, [type]);
  return (
    <div>
      <h1>{type}</h1>
      <CategoryNavbar />
      {dishes.map((dish, index) => (
        <Dish key={index} item={dish} callBack={fetchData} />
      ))}
    </div>
  );
};

export default Category;
