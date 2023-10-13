import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addDish.css";

import { Link } from "react-router-dom";
const AddDish = () => {
  const [inputValues, setInputValues] = useState({
    dishName: "",
    price: "",
    category: "",
    rating: "",
  });
  const [file, setFile] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("dishName", inputValues.dishName);
    formData.append("price", inputValues.price);
    formData.append("category", inputValues.category);
    formData.append("rating", inputValues.rating);
    console.log(inputValues.category);
    // Basic validation
    const newErrors = {};
    if (!inputValues.dishName) {
      newErrors.dishName = "Dish Name is required";
    }
    if (!inputValues.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(inputValues.price)) {
      newErrors.price = "Price must be a number";
    }
    if (!inputValues.category) {
      newErrors.category = "category is required";
    } else if (
      isNaN(inputValues.rating) ||
      inputValues.rating < 0 ||
      inputValues.unauthratingorise > 5
    ) {
      newErrors.rating = "rating must be a number between 0 and 5";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const token = JSON.parse(sessionStorage.getItem("token"));

        if (token) {
          const response = await axios.post(
            "http://localhost:8000/menu_management/addDish",
            formData,
            {
              headers: {
                Authorization: token.data.token,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          newErrors.unauthorise = "Unauthrise!! Go To Login";
        }

        setTimeout(() => {
          navigate("/");
        }, 3000);

        // Clear all input fields after submission
        setInputValues({
          dishName: "",
          price: "",
          category: "",
          rating: "",
        });
        // Reset the selected image

        // You can add navigation logic here if you have a router set up
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h2>Add Dish</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="dishName" className="label">
            Dish Name
          </label>
          <input
            type="text"
            id="dishName"
            name="dishName"
            value={inputValues.dishName}
            onChange={handleOnChange}
            className="input"
            required
          />
          {errors.dishName && <p className="error">{errors.dishName}</p>}
        </div>

        <div>
          <label htmlFor="price" className="label">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={inputValues.price}
            onChange={handleOnChange}
            className="input"
            required
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="category" className="label">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={inputValues.category}
            onChange={handleOnChange}
            className="input"
            required
          >
            <option value="">Select a category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <div>
          <label htmlFor="rating" className="label">
            Rating
          </label>
          <input
            type="text"
            id="rating"
            name="rating"
            value={inputValues.rating}
            onChange={handleOnChange}
            className="input"
            required
          />
          {errors.rating && <p className="error">{errors.rating}</p>}
        </div>

        <label htmlFor="image" className="label">
          Upload Image
        </label>
        <input
          filename={file}
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name="image"
          accept="image/*"
        ></input>
        <br />
        <button type="submit" className="button">
          Submit
        </button>
        {errors.unauthorise && <p className="error">{errors.unauthorise}</p>}
      </form>
      <span>
        Login? <Link to={"/login"}>Login</Link>
      </span>
    </div>
  );
  <span>
    Login? <Link to={"/login"}>Login</Link>
  </span>;
};

export default AddDish;
