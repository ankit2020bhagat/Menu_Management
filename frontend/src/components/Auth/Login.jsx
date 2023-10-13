import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";
const Login = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/userRouter/login",
        {
          ...inputValues,
        }
      );

      sessionStorage.setItem("token", JSON.stringify(response));
      setTimeout(() => {
        navigate("/addDish");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  const handleOnChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInputValues((inputValues) => ({ ...inputValues, [name]: value }));
  };
  return (
    <div>
      <form onSubmit={login} className="form-container">
        <div>
          <label htmlFor="email"> Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={inputValues.email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="input">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={inputValues.password}
            onChange={handleOnChange}
            className="input"
            required
          />
        </div>
        <button type="submit" className="button">
          Login
        </button>
        <span>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
