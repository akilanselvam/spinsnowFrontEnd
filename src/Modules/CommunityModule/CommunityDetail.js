import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URLVALUE } from "./../../config.js";
import { AuthContext } from ".././SecurityModule/AuthProvider.js";

const API_URL = `${URLVALUE}/api/v1/community`;

function CommunityDetail() {
  const { isLoggedIn } = useContext(AuthContext);

  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedCommunity, setEditedCommunity] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await axios.get(`${API_URL}/${communityId}`);
        const data = response.data;
        if (data.status === "success") {
          setCommunity(data.data.community);
          setEditedCommunity({ title: data.data.community.title, description: data.data.community.description });
        } else {
          setErrorMessage("Failed to fetch community");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch community");
      }
    };

    fetchCommunity();
  }, [communityId]);

  const handleEdit = () => {
    if (!isLoggedIn) {
      setErrorMessage("Please login to proceed further!");
      return;
    }
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`${API_URL}/${communityId}`, editedCommunity, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = response.data;

      if (data.status === "Success") {
        setCommunity(data.data.community);
        setIsEditing(false);
      } else {
        setErrorMessage("Failed to update community");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update community" + error.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedCommunity(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="max-w-3xl lg:mx-24 px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70">
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      {community && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            {isEditing ? (
              <input
                name="title"
                value={editedCommunity.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            ) : (
              community.title
            )}
          </h2>
          <p className="text-gray-700 mb-4">
            {isEditing ? (
              <textarea
                name="description"
                value={editedCommunity.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 h-64"
              />
            ) : (
              community.description
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

export default CommunityDetail;
