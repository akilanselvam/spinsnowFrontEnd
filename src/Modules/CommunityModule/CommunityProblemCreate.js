import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { URLVALUE } from "./../../config.js";
import { useParams } from "react-router-dom";
import { AuthContext } from ".././SecurityModule/AuthProvider.js";

const API_URL = `${URLVALUE}/api/v1/problems`;
const API_URL_USER = `${URLVALUE}/api/v1/user/retriveUserId`;

function CommunityProblemCreate({ onPostSuccess }) {
  const { communityId } = useParams(); // Get communityId from useParams
  const { isLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "medium", // Set urgency default to "medium"
    impactPotential: "medium", // Set impactPotential default to "medium"
    status: "pending", // Set status default to "pending"
    submittedBy: "", // Initialize submittedBy to an empty string
    communityId: communityId // Set communityId from useParams
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState(""); // State variable to store the user ID

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchUserId() {
      try {
        const response = await axios.get(API_URL_USER, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.status === "success") {
          setUserId(response.data.userId);
          setFormData(prevFormData => ({
            ...prevFormData,
            submittedBy: response.data.userId // Update submittedBy with the user ID
          }));
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
        setErrorMessage("Failed to fetch user ID. Please try again.");
      }
    }

    if (token) {
      fetchUserId();
    }
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!isLoggedIn) {
      setErrorMessage("Please login to proceed further!");
      return;
    }
    try {
      const response = await axios.post(API_URL, formData);
      console.log(response);
      setSuccessMessage("Problem created successfully");
      setErrorMessage("");
      resetForm();
      if (typeof onPostSuccess === "function") {
        onPostSuccess();
      }
    } catch (error) {
      console.error("Error creating problem:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to create problem. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      urgency: "medium",
      impactPotential: "medium",
      status: "pending",
      submittedBy: userId, // Reset submittedBy to the user ID
      communityId: communityId
    });
  };

  return (
    <div className="max-w-3xl lg:mx-24 px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70 ">
      {successMessage && <p className="text-indigo-800 font-semibold mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-serif text-xl mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="px-4 py-2 border border-indigo-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-serif text-xl mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="px-4 py-2 h-28 border border-indigo-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-serif text-xl mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="px-4 py-2 border border-indigo-400 rounded-lg w-full"
            required
          />
        </div>

        <button
          type="submit"
          className=" text-indigo-800 bg-indigo-200 py-3 ml-2 mt-2 px-8 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
          Create Problem
        </button>
      </form>
    </div>
  );
}

export default CommunityProblemCreate;
