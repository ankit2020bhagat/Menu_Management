import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import "./dish.css";
import { Link } from "react-router-dom";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Dish = ({ item, callBack }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [inputValues, setInputValues] = useState({
    dishName: "",
    price: "",
    category: "",
    rating: "",
    id: "",
  });
  const [errors, setErrors] = useState({});

  const openModal = (data) => {
    setIsOpen(true);
    setInputValues({
      dishName: data.dishName,
      price: data.price,
      category: data.category,
      rating: data.rating,
      id: data._id,
    });
    setErrors({});
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("heelo");
    // Input validation
    const newErrors = {};
    if (!inputValues.dishName) {
      newErrors.dishName = "Dish Name is required";
    }
    if (!inputValues.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(inputValues.price)) {
      newErrors.price = "Price must be a number";
    }
    if (!inputValues.rating) {
      newErrors.rating = "Rating is required";
    } else if (
      isNaN(inputValues.rating) ||
      inputValues.rating < 0 ||
      inputValues.rating > 5
    ) {
      newErrors.rating = "Rating must be a number between 0 and 5";
    }
    if (!inputValues.category) {
      newErrors.category = "Category is required";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("dishName", inputValues.dishName);
      formData.append("price", inputValues.price);
      formData.append("category", inputValues.category);
      formData.append("rating", inputValues.rating);
      formData.append("id", inputValues.id);
      console.log(formData);
      try {
        const token = JSON.parse(sessionStorage.getItem("token"));
        if (token) {
          const response = await axios.put(
            `http://localhost:8000/menu_management/updateDish/${inputValues.id}`,
            formData,
            {
              headers: {
                Authorization: token.data.token,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            setInputValues({
              dishName: "",
              price: "",
              category: "",
              rating: "",
            });
            closeModal();
            callBack();
            setFile(null);
          } else {
            // Handle errors and show a message to the user
            console.error("Request failed with status:", response.status);
          }
        } else {
          return "UnAuthorise";
        }
      } catch (err) {
        console.error("An error occurred:", err);
      }
    }
  };

  return (
    <>
      <div className="dish-style me-5 shadow-lg mb-5 bg-body rounded">
        <img
          className="dish-img"
          src={`../../images/${item.image}`}
          alt={item.dishName}
        />
        <h4>
          <strong>{item.dishName}</strong>
        </h4>
        <div className="rating">
          <span className="price">Price: {item.price}</span>
          <span>{item.rating}</span>
          <span className="star fa fa-star checked"></span>
        </div>

        <button
          type="button"
          className="btn btn-warning btn-sm mb-5 rounded-pill w-50"
          onClick={() => openModal(item)}
        >
          Update Dish
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Update Dish Modal"
        style={customStyles}
      >
        <button onClick={closeModal}>Close</button>
        <div>
          <form className="form-container">
            <div>
              <label htmlFor="dishName" className="label">
                Dish Name
              </label>
              <input
                type="text"
                id="dishName"
                name="dishName"
                value={inputValues.dishName}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="input"
                required
              >
                <option value="">Select a category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
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
                onChange={handleInputChange}
                className="input"
                required
              />
              {errors.rating && <p className="error">{errors.rating}</p>}
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
            <button type="submit" className="button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
        <span>
          Login? <Link to={"/login"}>Login</Link>
        </span>
      </Modal>
    </>
  );
};

Dish.propTypes = {
  item: PropTypes.object.isRequired,
  callBack: PropTypes.func.isRequired,
};

export default Dish;
