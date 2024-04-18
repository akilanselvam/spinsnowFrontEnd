import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/collaboration`;
const API_URL_USER = `${URLVALUE}/api/v1/user/retriveUserId`;

function CollaborationProblem({ onPostSuccess }) {
  const { problemId } = useParams(); // Get problemId from URL params
  const token = localStorage.getItem("token");

  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    problemId,
    users: [],
    discussions: null,
    workspace: "none",
    documents: null
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
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
            users: [response.data.userId]
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
  }, [token]);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(API_URL, formData);
      setSuccessMessage("Collaboration created successfully");
      setErrorMessage("");
      resetForm();
      // Invoke callback function after successful submission
      if (typeof onPostSuccess === "function") {
        onPostSuccess();
      }
    } catch (error) {
      console.error("Error creating collaboration:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to create collaboration. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      problemId,
      users: [userId],
      discussions: "",
      workspace: "none",
      documents: null
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70 ">
      {successMessage && <p className="text-indigo-800 font-semibold mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        {/* Problem ID (removed selection) */}
        <input type="hidden" name="problemId" value={problemId} />

        {/* User IDs */}
        <input type="hidden" name="users" value={userId} />

        {/* Workspace (removed field) */}

        <div className="mb-4">
          <label htmlFor="discussions" className="block text-gray-700 font-serif text-xl mb-2">
            What you would do?
          </label>
          <textarea
            name="discussions"
            value={formData.discussions}
            onChange={e => setFormData({ ...formData, discussions: e.target.value })}
            className="px-4 py-2 h-28 border border-indigo-400 rounded-lg w-full"
          />
        </div>

        <button
          type="submit"
          className=" text-indigo-800 bg-indigo-200 py-3 ml-2 mt-2 px-8 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
          Post{" "}
        </button>
      </form>
    </div>
  );
}

export default CollaborationProblem;
