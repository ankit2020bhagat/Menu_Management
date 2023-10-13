import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateDish = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [inputValues, setInputValues] = useState({
    dishName: "",
    price: "",
    category: "",
    rating: "",
  });
  const [id, setId] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  const searchInput = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/menu_management/getdishbyname/${inputSearch}`
      );
      if (response.data) {
        setStatus(true);
        const dish = response.data.dish;
        setInputValues({
          dishName: dish.dishName,
          price: dish.price,
          category: dish.category,
          rating: dish.rating,
        });
        setId(dish._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateForm = () => {
    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setInputValues({
        ...inputValues,
        [name]: value,
      });
    };

    const handleSubmit = async (event) => {
      console.log("heelo");
      event.preventDefault();
      const formData = new FormData();
      console.log("inputValues", inputValues);
      formData.append("image", file);
      formData.append("dishName", inputValues.dishName);
      formData.append("price", inputValues.price);
      formData.append("category", inputValues.category);
      formData.append("rating", inputValues.rating);
      console.log(inputValues.rating);
      formData.append("id", id); // Append the dish ID
      console.log(formData);
      try {
        const token = JSON.parse(sessionStorage.getItem("token"));
        if (token) {
          const response = await axios.put(
            `http://localhost:8000/menu_management/updateDish/${id}`,
            formData,
            {
              headers: {
                Authorization: token.data.token,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          return "UnAuthorise";
        }

        // Clear all input fields after submission
        setInputValues({
          dishName: "",
          price: "",
          category: "",
          rating: "",
        });
        // Reset the selected image
        setFile(null);
        setId(null);

        // Redirect to the desired page after successful submission
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div>
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
          </div>
          <div>
            <label htmlFor="category" className="label">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={inputValues.category}
              onChange={handleOnChange}
              className="input"
              required
            />
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
          </div>
          <label htmlFor="image" className="label">
            Upload Image
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            name="image"
            accept="image/*"
          />
          <br />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <h1>Update Dish</h1>
      <div>
        <label htmlFor="dishName" className="label"></label>
        <input
          type="text"
          id="dishName"
          name="dishName"
          placeholder="Enter Dish Name"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          className="input"
          required
        />
        <button className="myButton" onClick={searchInput}>
          Search
        </button>
        <br />
        {status && updateForm()}
      </div>
    </div>
  );
};

export default UpdateDish;
