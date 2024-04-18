import React from "react";
import { Link } from "react-router-dom";

const HeaderBeforeLogin = () => {
  return (
    <header className="flex justify-between items-center bg-gray-100 p-4">
      <div>
        <Link to="/" className="text-xl font-bold">
          SpinsNow
        </Link>
      </div>
      <div>
        <Link to="/login" className="text-blue-600 font-semibold">
          Login
        </Link>
      </div>
    </header>
  );
};

export default HeaderBeforeLogin;
