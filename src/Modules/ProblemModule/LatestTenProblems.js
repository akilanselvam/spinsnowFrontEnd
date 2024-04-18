import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/problems/latestTen`;

function LatestTenProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatestProblems = async () => {
      try {
        const response = await axios.get(API_URL);
        setProblems(response.data.data.problems);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch latest problems. Please try again.");
        setLoading(false);
        console.error("Error fetching latest problems:", error);
      }
    };

    fetchLatestProblems();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70">
      <h2 className="text-2xl font-bold mb-4">Latest Ten Problems</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
      {!loading && !error && (
        <ul>
          {problems.map(problem => (
            <li key={problem._id} className="mb-4">
              <Link to={`/problem/${problem._id}`} className="text-blue-600 hover:underline">
                <h3 className="text-xl font-bold">{problem.title}</h3>
              </Link>
              <p className="text-gray-700 mb-2">{problem.description}</p>
              <p className="text-gray-700 mb-2">Category: {problem.category}</p>
              <p className="text-gray-700 mb-2">Urgency: {problem.urgency}</p>
              <p className="text-gray-700 mb-2">Impact Potential: {problem.impactPotential}</p>
              <p className="text-gray-700 mb-2">Status: {problem.status}</p>
              {/* Add any additional details here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LatestTenProblems;
