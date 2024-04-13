import React, { useState } from "react";
import axios from "axios";
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/project`;

function ProjectCreate() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    area: "",
    goals: [], // Array of strings
    timelines: {
      startDate: "", // Needs to be formatted for backend consumption (check documentation)
      endDate: "", // Needs to be formatted for backend consumption (check documentation)
      otherDates: [] // Array of dates
    },
    progress: {}, // Can be any data structure based on your requirements
    impactMeasurement: {}, // Can be any data structure based on your requirements
    teamMembers: [], // Array of user IDs (object IDs)
    createdBy: "" // Likely populated based on logged-in user
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = event => {
    const { name, value } = event.target;
    // Handle goals and otherDates as arrays
    if (name === "goals") {
      const newGoals = value.split(",");
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: newGoals
      }));
    } else if (name.includes("timelines.otherDates")) {
      const newOtherDates = [...formData.timelines.otherDates]; // Copy existing dates
      if (value) {
        newOtherDates.push(new Date(value)); // Add new date
      }
      setFormData(prevFormData => ({
        ...prevFormData,
        timelines: {
          ...prevFormData.timelines,
          otherDates: newOtherDates
        }
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
          <label htmlFor="area" className="block text-gray-700 font-serif text-xl mb-2">
            Area (required)
          </label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
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
            value={formData.goals.join(",")} // Join goals for display
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
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
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
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
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="timelines.otherDates" className="block text-gray-700 font-serif text-xl mb-2">
            Other Important Dates (optional - format: YYYY-MM-DD)
          </label>
          <div>
            {formData.timelines.otherDates.map((date, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="date"
                  name={`timelines.otherDates[${index}]`}
                  value={date}
                  onChange={handleChange}
                  className="px-4 py-2 border border-pink-400 rounded-lg mr-2"
                />
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 p-1"
                  onClick={() => {
                    const newOtherDates = [...formData.timelines.otherDates];
                    newOtherDates.splice(index, 1);
                    setFormData(prevFormData => ({
                      ...prevFormData,
                      timelines: {
                        ...prevFormData.timelines,
                        otherDates: newOtherDates
                      }
                    }));
                  }}>
                  Remove
                </button>
              </div>
            ))}
            <input
              type="date"
              name="timelines.otherDates" // Empty name for adding new dates
              onChange={handleChange}
              className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            />
          </div>
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
          {/* Implement a way to select existing users (dropdown, search, etc.) */}
          {/* Update formData.teamMembers on user selection */}
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
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            disabled // Disable editing for now (assuming pre-populated)
          />
        </div>
        <button
          type="submit"
          className=" text-pink-800 bg-pink-200 py-3 ml-2 mt-2 px-8 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
          Create Project
        </button>
      </form>
    </div>
  );
}

export default ProjectCreate;
