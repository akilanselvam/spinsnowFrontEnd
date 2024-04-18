import React, { useState, useEffect } from "react";
import axios from "axios";
import { URLVALUE } from "./../../config.js";
import Select from "react-select"; // Import the Select component

const API_URL = `${URLVALUE}/api/v1/resource`;

function ResourceCreate() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    uploader: "abcdef012345678901234567", // Likely populated based on logged-in user
    uploadDate: "", // Likely pre-populated with current date
    file: "", // Handle file upload
    communityId: "", // Optional association with a community
    createdAt: "" // Created at is set by the backend
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [communityOptions, setCommunityOptions] = useState([]);

  useEffect(() => {
    async function fetchCommunities() {
      try {
        const response = await axios.get(`${URLVALUE}/api/v1/community`);
        const communitiesData = response.data.data.communities.map(community => ({
          value: community._id,
          label: community.title
        }));
        setCommunityOptions(communitiesData);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    }

    fetchCommunities();
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleCommunitySelect = selectedOption => {
    setFormData(prevFormData => ({
      ...prevFormData,
      communityId: selectedOption ? selectedOption.value : ""
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(API_URL, formData);
      console.log(response);
      setSuccessMessage("Resource created successfully");
      setErrorMessage("");
      resetForm();
    } catch (error) {
      console.error("Error creating resource:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to create resource. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      uploader: "abcdef012345678901234567",
      uploadDate: "",
      file: "",
      communityId: "",
      createdAt: ""
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70">
      {successMessage && <p className="text-indigo-800 font-semibold mb-4">{successMessage}</p>}
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
            className="px-4 py-2 border border-indigo-400 rounded-lg w-full"
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
            className="px-4 py-2 h-28 border border-indigo-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-serif text-xl mb-2">
            Category (required)
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
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700 font-serif text-xl mb-2">
            File (required)
          </label>
          <input
            type="text"
            name="file"
            value={formData.file}
            onChange={handleChange}
            className="px-4 py-2 border border-indigo-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="communityId" className="block text-gray-700 font-serif text-xl mb-2">
            Community (optional)
          </label>
          <Select
            options={communityOptions}
            value={communityOptions.find(option => option.value === formData.communityId)}
            onChange={handleCommunitySelect}
            isClearable
            isSearchable
            placeholder="Select a community..."
          />
        </div>
        <button
          type="submit"
          className="text-indigo-800 bg-indigo-200 py-3 ml-2 mt-2 px-8 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
          Create Resource
        </button>
      </form>
    </div>
  );
}

export default ResourceCreate;
