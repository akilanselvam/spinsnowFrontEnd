import React, { useState, useEffect } from "react";
import axios from "axios";
import { URLVALUE } from "./../../config.js";
import Select from "react-select";

const API_URL = `${URLVALUE}/api/v1/collaboration`;
const API_URL_PROBLEMS = `${URLVALUE}/api/v1/problems`;

function CollaborationCreate() {
  const [problemOptions, setProblemOptions] = useState([]);
  const [formData, setFormData] = useState({
    problemId: "",
    users: ["661a3143ab37777490925dc8"],
    workspace: "",
    discussions: [],
    documents: []
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchProblems() {
      try {
        const response = await axios.get(API_URL_PROBLEMS);
        const problemsData = response.data.data.problems.map(problem => ({
          value: problem._id,
          label: problem.title
        }));
        setProblemOptions(problemsData);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    }

    fetchProblems();
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleProblemSelect = selectedOption => {
    setFormData(prevFormData => ({
      ...prevFormData,
      problemId: selectedOption ? selectedOption.value : ""
    }));
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
      users: ["661a3143ab37777490925dc8"],
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
            Problem
          </label>
          <Select options={problemOptions} onChange={handleProblemSelect} placeholder="Select a problem..." />
        </div>
        <div className="mb-4">
          <label htmlFor="users" className="block text-gray-700 font-serif text-xl mb-2">
            Users (comma separated IDs)
          </label>
          <input
            type="text"
            name="users"
            value={formData.users} // Join user IDs for display
            onChange={handleChange}
            disabled
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
            value={formData.discussions} // Join discussions for display
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
            value={formData.documents} // Join documents for display
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
