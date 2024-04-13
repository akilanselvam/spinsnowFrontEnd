import React, { useState } from "react";
import axios from "axios";
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/community`;

function CommunityCreate() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "", // Needs to be formatted for backend consumption (check documentation)
    location: "",
    neededExpertise: "",
    createdBy: "", // Likely populated based on logged-in user
    projectId: "" // Optional, might need to be handled differently
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(API_URL, formData);
      setSuccessMessage("Community created successfully");
      setErrorMessage("");
      resetForm();
    } catch (error) {
      console.error("Error creating community:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to create community. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      neededExpertise: "",
      createdBy: "",
      projectId: ""
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70 ">
      {successMessage && <p className="text-pink-800 font-semibold mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-serif text-xl mb-2">
            Title (required)
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-serif text-xl mb-2">
            Description (required)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="px-4 py-2 h-28 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-serif text-xl mb-2">
            Date (required - format: YYYY-MM-DD)
          </label>
          <input
            type="date" // Use date input type for easier user experience
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-serif text-xl mb-2">
            Location (required)
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="neededExpertise" className="block text-gray-700 font-serif text-xl mb-2">
            Needed Expertise (required)
          </label>
          <input
            type="text"
            name="neededExpertise"
            value={formData.neededExpertise}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="createdBy" className="block text-gray-700 font-serif text-xl mb-2">
            Created By (likely pre-populated)
          </label>
          <input
            type="text"
            name="createdBy"
            value={formData.createdBy} // Pre-populate based on logged-in user
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            disabled // Disable editing for now (assuming pre-populated)
          />
        </div>
        <div className="mb-4">
          <label htmlFor="projectId" className="block text-gray-700 font-serif text-xl mb-2">
            Project ID (optional)
          </label>
          <input
            type="text"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <button
          type="submit"
          className=" text-pink-800 bg-pink-200 py-3 ml-2 mt-2 px-8 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
          Create Community
        </button>
      </form>
    </div>
  );
}

export default CommunityCreate;
