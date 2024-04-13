import React, { useState } from "react";
import axios from "axios";
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/expert`;

function ExpertCreate() {
  const [formData, setFormData] = useState({
    userId: "", // Likely populated based on logged-in user
    fullName: "",
    expertiseAreas: [], // Array of strings
    bio: "",
    contactDetails: {
      email: "",
      phoneNumber: "",
      otherInfo: ""
    },
    availability: "" // Can be a string or an object (check API documentation)
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = event => {
    const { name, value } = event.target;
    // Handle expertiseAreas as an array of strings
    if (name === "expertiseAreas") {
      const newExpertiseAreas = value.split(",");
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: newExpertiseAreas
      }));
    } else if (name.includes("contactDetails.")) {
      // Nested destructuring for contact details
      const [fieldName, fieldValue] = name.split(".");
      setFormData(prevFormData => ({
        ...prevFormData,
        contactDetails: {
          ...prevFormData.contactDetails,
          [fieldName]: fieldValue
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
      setSuccessMessage("Expert created successfully");
      setErrorMessage("");
      resetForm();
    } catch (error) {
      console.error("Error creating expert:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to create expert. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      userId: "",
      fullName: "",
      expertiseAreas: [],
      bio: "",
      contactDetails: {
        email: "",
        phoneNumber: "",
        otherInfo: ""
      },
      availability: ""
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70 ">
      {successMessage && <p className="text-pink-800 font-semibold mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-serif text-xl mb-2">
            Full Name (required)
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expertiseAreas" className="block text-gray-700 font-serif text-xl mb-2">
            Expertise Areas (comma separated, required)
          </label>
          <input
            type="text"
            name="expertiseAreas"
            value={formData.expertiseAreas.join(",")} // Join expertise areas for display
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-gray-700 font-serif text-xl mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="px-4 py-2 h-28 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contactDetails.email" className="block text-gray-700 font-serif text-xl mb-2">
            Email (required)
          </label>
          <input
            type="email"
            name="contactDetails.email"
            value={formData.contactDetails.email}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contactDetails.phoneNumber" className="block text-gray-700 font-serif text-xl mb-2">
            Phone Number
          </label>
          <input
            type="tel" // Use tel input type for phone number
            name="contactDetails.phoneNumber"
            value={formData.contactDetails.phoneNumber}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contactDetails.otherInfo" className="block text-gray-700 font-serif text-xl mb-2">
            Other Contact Information
          </label>
          <input
            type="text"
            name="contactDetails.otherInfo"
            value={formData.contactDetails.otherInfo}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="availability" className="block text-gray-700 font-serif text-xl mb-2">
            Availability (refer to API documentation for format)
          </label>
          {/* Handle availability based on its data type (string or object) */}
          {typeof formData.availability === "string" ? (
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            />
          ) : (
            <div>{/* Implement form fields for availability object properties here */}</div>
          )}
        </div>
        <button
          type="submit"
          className=" text-pink-800 bg-pink-200 py-3 ml-2 mt-2 px-8 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
          Create Expert
        </button>
      </form>
    </div>
  );
}

export default ExpertCreate;
