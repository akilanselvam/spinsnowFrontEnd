import React, { useState, useEffect } from "react";
import axios from "axios";
import { URLVALUE } from "./../../config.js";
import Select from "react-select";

const API_URL = `${URLVALUE}/api/v1/project/`;
const API_URL_USERS = `${URLVALUE}/api/v1/user`;

function ProjectCreate() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    area: "",
    goals: [],
    timelines: {
      startDate: "",
      endDate: "",
      otherDates: []
    },
    progress: {},
    impactMeasurement: {},
    teamMembers: [],
    createdBy: "661a300d890d7f05801bb436"
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(API_URL_USERS);
        const usersData = response.data.data.users.map(user => ({
          value: user._id,
          label: `${user.username} (${user.firstName} ${user.lastName})`
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prevFormData => ({
        ...prevFormData,
        [parent]: {
          ...prevFormData[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleSelectChange = selectedOptions => {
    setSelectedUsers(selectedOptions);
    console.log(selectedUsers);
    setFormData(prevFormData => ({
      ...prevFormData,
      teamMembers: selectedOptions.map(option => option.value)
    }));
  };

  const handleSubmit = async event => {
    console.log(formData);
    event.preventDefault();

    try {
      await axios.post(API_URL, formData);
      setSuccessMessage("Project created successfully");
      setErrorMessage("");
      resetForm();
    } catch (error) {
      console.error("Error creating project:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to create project. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      area: "",
      goals: [],
      timelines: {
        startDate: "",
        endDate: "",
        otherDates: []
      },
      progress: {},
      impactMeasurement: {},
      teamMembers: [],
      createdBy: ""
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70 ">
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
          <label htmlFor="area" className="block text-gray-700 font-serif text-xl mb-2">
            Area (required)
          </label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="px-4 py-2 border border-indigo-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="goals" className="block text-gray-700 font-serif text-xl mb-2">
            Goals (comma separated)
          </label>
          <input
            type="text"
            name="goals"
            value={formData.goals} // Join goals for display
            onChange={handleChange}
            className="px-4 py-2 border border-indigo-400 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="timelines.startDate" className="block text-gray-700 font-serif text-xl mb-2">
            Start Date (format: YYYY-MM-DD)
          </label>
          <input
            type="date"
            name="timelines.startDate"
            value={formData.timelines.startDate}
            onChange={handleChange}
            className="px-4 py-2 border border-indigo-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="timelines.endDate" className="block text-gray-700 font-serif text-xl mb-2">
            End Date (format: YYYY-MM-DD)
          </label>
          <input
            type="date"
            name="timelines.endDate"
            value={formData.timelines.endDate}
            onChange={handleChange}
            className="px-4 py-2 border border-indigo-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="progress" className="block text-gray-700 font-serif text-xl mb-2">
            Progress (optional)
          </label>
          {/* Implement form fields based on the structure of your progress data */}
        </div>
        <div className="mb-4">
          <label htmlFor="impactMeasurement" className="block text-gray-700 font-serif text-xl mb-2">
            Impact Measurement (optional)
          </label>
          {/* Implement form fields based on the structure of your impactMeasurement data */}
        </div>
        <div className="mb-4">
          <label htmlFor="teamMembers" className="block text-gray-700 font-serif text-xl mb-2">
            Team Members (select existing users)
          </label>
          <Select options={users} value={selectedUsers} onChange={handleSelectChange} isMulti className="w-full" />
        </div>

        <div className="mb-4">
          <label htmlFor="createdBy" className="block text-gray-700 font-serif text-xl mb-2">
            Created By (likely pre-populated)
          </label>
          <input
            type="text"
            name="createdBy"
            value={formData.createdBy} // Likely pre-populated based on logged-in user
            onChange={handleChange}
            className="px-4 py-2 border border-indigo-400 rounded-lg w-full"
            disabled // Disable editing for now (assuming pre-populated)
          />
        </div>

        <button
          type="submit"
          className=" text-indigo-800 bg-indigo-200 py-3 ml-2 mt-2 px-8 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
          Create Project
        </button>
      </form>
    </div>
  );
}

export default ProjectCreate;
