import React, { useEffect, useState } from "react";
import axios from "axios";
import Dish from "./Dish";
import Navbar from "../Navbar/Navbar";
const Dishes = () => {
  const [dishes, setDishes] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/menu_management/getDish",
        {}
      );
      //console.log(response.data.dish);
      setDishes(response.data.dish);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      {dishes.map((dish, index) => (
        <Dish key={index} item={dish} callBack={fetchData} />
      ))}
    </div>
  );
};

export default Dishes;
