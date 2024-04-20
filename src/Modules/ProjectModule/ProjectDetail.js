import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/project`;

function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(API_URL + `/${projectId}`);
        const data = response.data;
        if (data.status === "success") {
          setProject(data.data.project);
          setEditedProject({ title: data.data.project.title, description: data.data.project.description });
        } else {
          setErrorMessage("Failed to fetch project");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch project");
      }
    };

    fetchProject();
  }, [projectId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(API_URL + `/${projectId}`, editedProject, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = response.data;

      if (data.status === "Success") {
        setProject(data.data.project);
        setIsEditing(false);
      } else {
        setErrorMessage("Failed to update project");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update project" + error.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedProject(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="max-w-3xl lg:mx-24 px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70">
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      {project && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            {isEditing ? (
              <input
                name="title"
                value={editedProject.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            ) : (
              project.title
            )}
          </h2>
          <p className="text-gray-700 mb-4">
            {isEditing ? (
              <textarea
                name="description"
                value={editedProject.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 h-64"
              />
            ) : (
              project.description
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

export default ProjectDetail;
