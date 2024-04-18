import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProblemDetail() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProblem, setEditedProblem] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/problems/${problemId}`);
        const data = response.data;
        if (data.status === "success") {
          setProblem(data.data.problem);
          setEditedProblem({ title: data.data.problem.title, description: data.data.problem.description });
        } else {
          setErrorMessage("Failed to fetch problem");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch problem");
      }
    };

    fetchProblem();
  }, [problemId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/problems/${problemId}`, editedProblem, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = response.data;
      if (data.status === "Success") {
        setProblem(data.data.problem);
        setIsEditing(false);
      } else {
        setErrorMessage("Failed to update problem");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update problem" + error.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedProblem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70">
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      {problem && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            {isEditing ? (
              <input
                name="title"
                value={editedProblem.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            ) : (
              problem.title
            )}
          </h2>
          <p className="text-gray-700 mb-4">
            {isEditing ? (
              <textarea
                name="description"
                value={editedProblem.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 h-64"
              />
            ) : (
              problem.description
            )}
          </p>
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="text-green-800 bg-green-200 py-2 px-4 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 duration-300 ease-in-out">
              Update
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="text-indigo-800 bg-indigo-200 py-2 px-4 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProblemDetail;
