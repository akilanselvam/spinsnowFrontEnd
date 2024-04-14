import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/expert`;
const API_URL_USERS = `${URLVALUE}/api/v1/user`;

function ExpertCreate() {
  const [formData, setFormData] = useState({
    userId: "", // Add userId to formData
    expertiseAreas: [],
    availability: "",
    problemId: ""
  });
  const [userOptions, setUserOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(API_URL_USERS);
        const usersData = response.data.data.users.map(user => ({
          value: user._id,
          label: user.username // You can use any user property for label
        }));
        setUserOptions(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleUserSelect = selectedOption => {
    setFormData(prevFormData => ({
      ...prevFormData,
      userId: selectedOption ? selectedOption.value : ""
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(API_URL, formData);
      setSuccessMessage("Expert created successfully");
      setErrorMessage("");
      resetForm();
      setUserOptions([]);
    } catch (error) {
      console.error("Error creating expert:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to create expert. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      userId: "",
      expertiseAreas: [],
      availability: "",
      problemId: ""
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70">
      {successMessage && <p className="text-pink-800 font-semibold mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="userId" className="block text-gray-700 font-serif text-xl mb-2">
            User ID (required)
          </label>
          <Select options={userOptions} onChange={handleUserSelect} placeholder="Select a user..." />
        </div>
        <div className="mb-4">
          <label htmlFor="expertiseAreas" className="block text-gray-700 font-serif text-xl mb-2">
            Expertise Areas (comma separated, required)
          </label>
          <input
            type="text"
            name="expertiseAreas"
            value={formData.expertiseAreas}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="availability" className="block text-gray-700 font-serif text-xl mb-2">
            Availability (refer to API documentation for format)
          </label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full">
            <option value="">Select Availability</option>
            <option value="Monday to Friday 9 am to 6 pm">Monday to Friday 9 am to 6 pm</option>
            <option value="Weekends only">Weekends only</option>
            <option value="24/7">24/7</option>
          </select>
        </div>
        <button
          type="submit"
          className="text-pink-800 bg-pink-200 py-3 ml-2 mt-2 px-8 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
          Create Expert
        </button>
      </form>
    </div>
  );
}

export default ExpertCreate;
