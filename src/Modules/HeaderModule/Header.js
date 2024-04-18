import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../SecurityModule/AuthProvider";

const Header = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center bg-gray-100 p-4">
      <div>
        <Link to="/" className="text-xl font-bold">
          SpinsNow
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <span className="mr-4">Hi, {localStorage.getItem("username")}</span>
            <button onClick={handleLogout} className="text-red-600 font-semibold">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
