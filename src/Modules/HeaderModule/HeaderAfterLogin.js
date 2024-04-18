import React from "react";
import { Link } from "react-router-dom";

const HeaderAfterLogin = ({ username, handleLogout }) => {
  return (
    <header className="flex justify-between items-center bg-gray-100 p-4">
      <div>
        <span className="text-xl font-bold">SpinsNow</span>
      </div>
      <div>
        <span className="mr-4">Hi, {username}</span>
        <button onClick={handleLogout} className="text-red-600 font-semibold">
          Logout
        </button>
      </div>
    </header>
  );
};

export default HeaderAfterLogin;
