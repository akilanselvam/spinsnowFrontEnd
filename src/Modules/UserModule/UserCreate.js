import React, { useState } from "react";
import axios from "axios";
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/user`;

function UserCreate() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    expert: "no", // Default value based on schema
    phoneNumber: "",
    state: "",
    country: "",
    age: "",
    sex: "",
    skills: [], // Array of strings
    expertise: [], // Array of strings
    areasOfInterest: [] // Array of strings
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = event => {
    const { name, value } = event.target;
    // Handle skills, expertise, and areasOfInterest as arrays
    if (name === "skills" || name === "expertise" || name === "areasOfInterest") {
      const newValues = value.split(",");
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: newValues
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
      setSuccessMessage("User created successfully");
      setErrorMessage("");
      resetForm();
    } catch (error) {
      console.error("Error creating user:", error);
      setSuccessMessage("");
      setErrorMessage(error.response?.data?.message || "Failed to create user. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      expert: "no",
      phoneNumber: "",
      state: "",
      country: "",
      age: "",
      sex: "",
      skills: [],
      expertise: [],
      areasOfInterest: []
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70 ">
      {successMessage && <p className="text-pink-800 font-semibold mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-serif text-xl mb-2">
            Username (required)
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-serif text-xl mb-2">
            Email (required)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-serif text-xl mb-2">
            Password (required, min 8 characters)
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="passwordConfirm" className="block text-gray-700 font-serif text-xl mb-2">
            Confirm Password (required)
          </label>
          <input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-serif text-xl mb-2">
            First Name (required)
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-serif text-xl mb-2">
            Last Name (required)
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expert" className="block text-gray-700 font-serif text-xl mb-2">
            Are You an Expert? (required)
          </label>
          <select
            name="expert"
            value={formData.expert}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 font-serif text-xl mb-2">
            Phone Number (optional)
          </label>
          <input
            type="tel" // Input type for phone number
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-full mr-2 mb-2">
            <label htmlFor="skills" className="block text-gray-700 font-serif text-xl mb-2">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills.join(",")} // Join skills for display
              onChange={handleChange}
              className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            />
          </div>
          <div className="w-full mr-2 mb-2">
            <label htmlFor="expertise" className="block text-gray-700 font-serif text-xl mb-2">
              Expertise (comma separated)
            </label>
            <input
              type="text"
              name="expertise"
              value={formData.expertise.join(",")} // Join expertise for display
              onChange={handleChange}
              className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="areasOfInterest" className="block text-gray-700 font-serif text-xl mb-2">
              Areas of Interest (comma separated)
            </label>
            <input
              type="text"
              name="areasOfInterest"
              value={formData.areasOfInterest.join(",")} // Join areas of interest for display
              onChange={handleChange}
              className="px-4 py-2 border border-pink-400 rounded-lg w-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700 font-serif text-xl mb-2">
            State (optional)
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700 font-serif text-xl mb-2">
            Country (optional)
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700 font-serif text-xl mb-2">
            Age (optional)
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sex" className="block text-gray-700 font-serif text-xl mb-2">
            Sex (optional)
          </label>
          <input
            type="text"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="px-4 py-2 border border-pink-400 rounded-lg w-full"
          />
        </div>
        <button
          type="submit"
          className=" text-pink-800 bg-pink-200 py-3 ml-2 mt-2 px-8 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
          Create User
        </button>
      </form>
    </div>
  );
}

export default UserCreate;
