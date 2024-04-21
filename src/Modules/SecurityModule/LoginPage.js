// LoginPage.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/user/login`;
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        // Store token and username in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("expert", data.expert);
        // Update header
        handleLogin();
        // Redirect to index page
        navigate("/");
      } else {
        setErrorMessage(data.message); // Assuming API returns error message
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred, please try again.");
    }
  };

  return (
    <div className="">
      <div className="px-8 py-4 my-4 lg:mx-32 bg-gray-50 rounded-lg shadow-md opacity-70">
        {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-serif text-xl mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 border border-indigo-400 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-serif text-xl mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-2 border border-indigo-400 rounded-lg w-full"
            />
          </div>
          <button
            type="submit"
            className="text-indigo-800 bg-indigo-200 py-3 ml-2 mt-2 px-8 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
