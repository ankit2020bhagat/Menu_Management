import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";
const Signup = () => {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const register = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/userRouter/register",
        {
          ...inputValues,
        }
      );
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues((inputValues) => ({ ...inputValues, [name]: value }));
  };
  return (
    <div>
      <form onSubmit={register} className="form-container ">
        <h2>Signup Page</h2>
        <div>
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputValues.email}
            onChange={handleOnChange}
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="username" className="label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={inputValues.username}
            onChange={handleOnChange}
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={inputValues.password}
            onChange={handleOnChange}
            className="input"
            required
          />
        </div>
        <button type="submit" className="button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
