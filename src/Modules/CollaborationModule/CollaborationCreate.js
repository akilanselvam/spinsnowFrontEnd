import React, { useState } from "react";
import axios from "axios";
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/collaboration`;

function CollaborationCreate() {
  const [formData, setFormData] = useState({
    problemId: "",
    users: [],
    workspace: "",
    discussions: [],
    documents: []
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = event => {
    const { name, value } = event.target;
    // Handle users as an array of strings representing user IDs
    if (name === "users") {
      const newUsers = value.split(",");
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: newUsers
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(API_URL, formData);
      setSuccessMessage("Collaboration created successfully");
      setErrorMessage("");
      resetForm();
    } catch (error) {
      console.error("Error creating collaboration:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to create collaboration. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      problemId: "",
      users: [],
      workspace: "",
      discussions: [],
      documents: []
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70 ">
      {successMessage && <p className="text-pink-800 font-semibold mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="problemId" className="block text-gray-700 font-serif text-xl mb-2">
            Problem ID
          </label>
          <input
            type="text"
            name="problemId"
            value={formData.problemId}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="users" className="block text-gray-700 font-serif text-xl mb-2">
            Users (comma separated IDs)
          </label>
          <input
            type="text"
            name="users"
            value={formData.users.join(",")} // Join user IDs for display
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="workspace" className="block text-gray-700 font-serif text-xl mb-2">
            Workspace
          </label>
          <input
            type="text"
            name="workspace"
            value={formData.workspace}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="discussions" className="block text-gray-700 font-serif text-xl mb-2">
            Discussions (optional)
          </label>
          <textarea
            name="discussions"
            value={formData.discussions.join("\n")} // Join discussions for display
            onChange={handleChange}
            className="px-4 py-2 h-28 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="documents" className="block text-gray-700 font-serif text-xl mb-2">
            Documents (optional)
          </label>
          <textarea
            name="documents"
            value={formData.documents.join("\n")} // Join documents for display
            onChange={handleChange}
            className="px-4 py-2 h-28 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <button
          type="submit"
          className=" text-pink-800 bg-pink-200 py-3 ml-2 mt-2 px-8 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
          Create Collaboration
        </button>
      </form>
    </div>
  );
}

export default CollaborationCreate;
