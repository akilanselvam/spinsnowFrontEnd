import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { URLVALUE } from "./../../config.js";
import ProblemSearchBar from "./ProblemSearchBar.js";

const API_URL = `${URLVALUE}/api/v1/problems/latestTen`;

function LatestTenProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const fetchProblems = async () => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}`);
      if (response.data.status === "success") {
        // If it's the first page, set the problems directly
        // Otherwise, append the new problems to the existing ones
        if (page === 1) {
          setProblems(response.data.data.problems);
        } else {
          setProblems(prevProblems => [...prevProblems, ...response.data.data.problems]);
        }
      }
    } catch (error) {
      setError("Failed to fetch latest problems. Please try again.");
      console.error("Error fetching latest problems:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <div className="max-w-3xl  lg:mx-24 md:mx-auto px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
        {!loading && !error && (
          <div>
            {problems.map(problem => (
              <div key={problem._id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
                <Link to={`/problem/${problem._id}`} className="text-blue-600 hover:underline">
                  <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                </Link>
                <p className="text-gray-700 mb-2">{problem.description}</p>
                <p className="text-gray-700 mb-2">#Tag: {problem.category}</p>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={loadMore}>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LatestTenProblems;
