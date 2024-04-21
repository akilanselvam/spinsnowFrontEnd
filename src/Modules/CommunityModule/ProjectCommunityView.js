import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom"; // Import Link from react-router-dom
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/community/getbyProject`;

function ProjectCommunityView() {
  const { projectId } = useParams();
  const [communities, setCommunities] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchCommunities() {
      try {
        const response = await axios.get(`${API_URL}/${projectId}?page=${page}`);
        if (response.data.status === "success") {
          const newCommunities = response.data.data.communities;
          if (newCommunities.length === 0 && page !== 1) {
            setHasMore(false);
          }
          if (page === 1) {
            setCommunities(newCommunities);
          } else {
            setCommunities(prevCommunities => [...prevCommunities, ...newCommunities]);
          }
        } else {
          setErrorMessage("Communities not found for the given project ID");
        }
      } catch (error) {
        // Handle error
      }
    }

    fetchCommunities();
  }, [projectId, page]);

  const loadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="lg:mx-24">
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      {communities.map(community => (
        <div key={community._id} className="max-w-3xl px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70">
          <Link to={`/community/${community._id}`} className="font-bold hover:underline">
            {" "}
            {/* Wrap the title in Link */}
            <p>Title: {community.title}</p>
          </Link>
          <p>Description: {community.description}</p>
          <p>Location: {community.location}</p>
          <p>Needed Expertise: {community.neededExpertise}</p>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          onClick={loadMore}
          className="text-indigo-800 bg-indigo-200 py-2 px-8 mb-4 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out"
          disabled={!hasMore}>
          {hasMore ? "Load More" : "No More Communities"}
        </button>
      </div>
    </div>
  );
}

export default ProjectCommunityView;
