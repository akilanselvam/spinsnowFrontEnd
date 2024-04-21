import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/problems/getProblemsBySubmittedId`;
const API_URL_USER = `${URLVALUE}/api/v1/user/retriveUserId`;

function UserProblemView() {
  const [problems, setProblems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [userId, setUserId] = useState(null); // State to hold the user ID

  useEffect(() => {
    // Fetch user ID from token
    const token = localStorage.getItem("token");
    async function fetchUserId() {
      try {
        const response = await axios.get(API_URL_USER, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.status === "success") {
          setUserId(response.data.userId);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
        setErrorMessage("Failed to fetch user ID. Please try again.");
      }
    }

    if (token && !userId) {
      // Fetch user ID only if it's not already fetched
      fetchUserId();
    }
  }, [userId]); // Fetch user ID whenever it changes

  const fetchProblems = async () => {
    try {
      const response = await axios.get(`${API_URL}/${userId}?page=${page}`);
      if (response.data.status === "success") {
        const newProblems = response.data.data.problems;
        if (newProblems.length === 0 && page !== 1) {
          setHasMore(false);
        }
        if (page === 1) {
          setProblems(newProblems);
        } else {
          setProblems(prevProblems => [...prevProblems, ...newProblems]);
        }
      } else {
        setErrorMessage("Problems not found for the given user ID");
      }
    } catch (error) {
      console.error("Error fetching problems:", error);
      setErrorMessage("Failed to fetch problems. Please try again.");
    }
  };

  useEffect(() => {
    if (userId) {
      // Fetch problems only if user ID is available
      fetchProblems();
    }
  }, [userId, page]);

  const loadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="lg:mx-24">
      <div className="bg-gray-50 max-w-3xl my-4 text-center rounded-xl shadow-md " style={{ display: "block" }}>
        <div className="md:flex">
          <div className="p-6">
            <p className="block mt-1 text-lg  leading-tight font-medium text-black justify-center">
              Problems Created By You
            </p>
          </div>
        </div>
      </div>
      {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
      {problems.map(problem => (
        <div key={problem._id} className="max-w-3xl px-8 py-4 my-4 bg-gray-50 rounded-lg shadow-md opacity-70">
          <Link to={`/problem/${problem._id}`} className="font-bold hover:underline">
            <p>Title: {problem.title}</p>
          </Link>
          <p>Description: {problem.description}</p>
          <p>Category: {problem.category}</p>
          <p>Urgency: {problem.urgency}</p>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          onClick={loadMore}
          className="text-indigo-800 bg-indigo-200 py-2 px-8 mb-4 rounded-xl cursor-pointer shadow-lg focus:shadow-xl hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 duration-300 ease-in-out"
          disabled={!hasMore}>
          {hasMore ? "Load More" : "No More Problems"}
        </button>
      </div>
    </div>
  );
}

export default UserProblemView;
