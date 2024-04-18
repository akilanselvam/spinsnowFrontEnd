import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/collaboration/getCollaborationsByProblemId`;
const API_URL_USER = `${URLVALUE}/api/v1/user`;

function CollaborationProblemView() {
  const { problemId } = useParams(); // Get problemId from URL params
  const [collaborations, setCollaborations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1); // Initialize page to 1

  useEffect(() => {
    async function fetchCollaborations() {
      try {
        const response = await axios.get(`${API_URL}/${problemId}?page=${page}`);
        if (response.data.status === "success") {
          // Fetch user details for each collaboration
          const collaborationsWithUserDetails = await Promise.all(
            response.data.data.collaborations.map(async collaboration => {
              const userDetails = await getUserDetails(collaboration.users[0]);
              return { ...collaboration, createdBy: userDetails };
            })
          );
          // If it's the first page, set the collaborations directly
          // Otherwise, append the new collaborations to the existing ones
          if (page === 1) {
            setCollaborations(collaborationsWithUserDetails);
          } else {
            setCollaborations(prevCollaborations => [...prevCollaborations, ...collaborationsWithUserDetails]);
          }
        }
      } catch (error) {
        console.error("Error fetching collaborations:", error);
        setErrorMessage("Failed to fetch collaborations. Please try again.");
      }
    }

    fetchCollaborations();
  }, [problemId, page]); // Include problemId and page in dependency array

  const loadMore = () => {
    setPage(prevPage => prevPage + 1); // Increment page when "Load More" is clicked
  };

  const getUserDetails = async userId => {
    try {
      const response = await axios.get(`${API_URL_USER}/${userId}`);
      if (response.data.status === "success") {
        return response.data.data.user.username;
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      return "Unknown";
    }
  };

  return (
    <div>
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      {collaborations.map(collaboration => (
        <div
          key={collaboration._id}
          className="max-w-3xl mx-auto px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70">
          <p>Created By: {collaboration.createdBy}</p>
          <p>Discussion: {collaboration.discussions}</p>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <button
          onClick={loadMore}
          className="text-indigo-800 bg-indigo-200 py-2 px-8 mb-4 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out">
          Load More
        </button>
      </div>
    </div>
  );
}

export default CollaborationProblemView;
