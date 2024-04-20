import React, { useState, useEffect } from "react";
import axios from "axios";
import { URLVALUE } from "./../../config.js";
import { useNavigate } from "react-router-dom";
const API_URL = `${URLVALUE}/api/v1/problems`;
const API_URL_USER = `${URLVALUE}/api/v1/user/retriveUserId`;

function HomePageCreateProblem() {
  const [userId, setUserId] = useState("");
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "{Description Required..Explain More!}",
    category: "global",
    urgency: "medium",
    impactPotential: "medium",
    status: "in progress",
    submittedBy: "", // This will be set to userId
    communityId: "66238329eaf5f71098af148e" // Predefined community ID
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchUserId() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_URL_USER, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.status === "success") {
          setUserId(response.data.userId);
          setFormData(prevFormData => ({
            ...prevFormData,
            submittedBy: response.data.userId
          }));
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
        setErrorMessage("Failed to fetch user ID. Please try again.");
      }
    }

    fetchUserId();
  }, []);

  const handleTitleChange = event => {
    setFormData(prevFormData => ({
      ...prevFormData,
      title: event.target.value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(API_URL, formData);
      console.log(response.data.data.problems._id);
      Navigate(`/problem/${response.data.data.problems._id}`);
      setSuccessMessage("Problem created successfully");
      setErrorMessage("");
      resetForm();
    } catch (error) {
      console.error("Error creating problem:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to create problem. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "{Description Required..Explain More!}",
      category: "global",
      urgency: "medium",
      impactPotential: "medium",
      status: "in progress",
      submittedBy: userId, // Set back to userId
      communityId: "66238329eaf5f71098af148e"
    });
  };

  return (
    <div className="max-w-3xl mt-24 lg:mx-24 px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70 ">
      {successMessage && <p className="text-indigo-800 font-semibold mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-serif text-xl mb-2">
            What's on your mind?
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            className="px-4 py-2 border border-indigo-400 rounded-lg w-full"
          />
        </div>

        {/* Other fields (category, urgency, impactPotential, status) are read-only */}

        {/* Similarly, make other fields read-only */}

        <button
          type="submit"
          className=" text-indigo-800 bg-indigo-200 py-3 ml-2 mt-2 px-8 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
          Post
        </button>
      </form>
    </div>
  );
}

export default HomePageCreateProblem;
