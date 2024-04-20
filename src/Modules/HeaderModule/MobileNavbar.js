import React from "react";
import { useNavigate } from "react-router-dom";

const MobileNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 px-7 bg-gray-200 shadow-lg rounded-t-4xl rounded-xl  opacity-85 my-8 mx-8 p-2 z-50">
      <div className="flex justify-around">
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center flex-col text-center px-4 py-2 text-black hover:text-indigo-500 focus:outline-none">
          <i className="far fa-home text-2xl mb-1"></i>
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => navigate("/suggestedProjectFeed")}
          className="flex items-center justify-center flex-col text-center px-4 py-2 text-black hover:text-indigo-500 focus:outline-none">
          <i className="far fa-compass text-2xl mb-1"></i>
          <span className="text-xs">Explore</span>
        </button>
        <button
          onClick={() => navigate("/search")}
          className="flex items-center justify-center flex-col text-center px-4 py-2 text-black hover:text-indigo-500 focus:outline-none">
          <i className="far fa-search text-2xl mb-1"></i>
          <span className="text-xs">Search</span>
        </button>
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center justify-center flex-col text-center px-4 py-2 text-black hover:text-indigo-500 focus:outline-none">
          <i className="far fa-cog text-2xl mb-1"></i>
          <span className="text-xs">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNavbar;
