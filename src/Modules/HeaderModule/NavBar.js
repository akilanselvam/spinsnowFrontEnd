import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="overflow-hidden shadow-lg bg-gray-50 mb-4 rounded-lg rounded-t-lg border-red-light md:w-2/12 ml-6 my-4 lg:block hidden">
        <div className="px-6 py-4  mt-4 mb-2">
          <div className="flex items-center uppercase tracking-wide text-c2 mb-4">
            <i className="fas fa-box-open w-6 h-6 fill-current text-gray-500 mr-2"></i>
            Your Space
          </div>
          <div
            className="flex cursor-pointer border px-4 py-2 text-md text-grey-darkest border-b-0"
            onClick={() => navigate("/")}>
            <div className="pr-2">
              <i className="fas fa-home w-6 h-6 fill-current text-gray-500"></i>
            </div>
            <div>Home</div>
          </div>
          <div
            className="flex cursor-pointer border px-4 py-2 text-md text-grey-darkest "
            onClick={() => navigate("/dashboard")}>
            <div className="pr-2">
              <i className="far fa-compass w-6 h-6 fill-current text-gray-500"></i>
            </div>
            <div>Dashboard</div>
          </div>
        </div>
        <div className="px-6 py-2 ">
          <div className="flex items-center uppercase tracking-wide text-c2 mb-4">
            <i className="fas fa-fire w-6 h-6 fill-current text-gray-500 mr-2"></i>
            Trending
          </div>
          <div
            className="flex cursor-pointer border px-4 py-2 text-md text-grey-darkest border-b-0"
            onClick={() => navigate("/")}>
            <div className="pr-2">
              <i className="fas fa-project-diagram w-6 h-6 fill-current text-gray-500"></i>
            </div>
            <div>Projects</div>
          </div>
          <div
            className="flex cursor-pointer border px-4 py-2 text-md text-grey-darkest border-b-0"
            onClick={() => navigate("/explore")}>
            <div className="pr-2">
              <i className="fas fa-users w-6 h-6 fill-current text-gray-500"></i>
            </div>
            <div>Communities</div>
          </div>
          <div
            className="flex cursor-pointer border px-4 py-2 text-md text-grey-darkest"
            onClick={() => navigate("/search")}>
            <div className="pr-2">
              <i className="fas fa-tools w-6 h-6 fill-current text-gray-500"></i>
            </div>
            <div>Problems</div>
          </div>
          {/* Additional sections */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
