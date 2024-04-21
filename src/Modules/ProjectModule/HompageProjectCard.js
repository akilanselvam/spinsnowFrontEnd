import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
// Assuming you have react-router-dom installed and configured
import { URLVALUE } from "./../../config.js";

const API_URL = `${URLVALUE}/api/v1/project`;

const HompageProjectCard = () => {
  const navigate = useNavigate(); // Initializing useNavigate
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    fetch(API_URL + `/getRandomSuggestedProjects`)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          const projectsWithShowProperty = data.data.projects.map(project => ({
            ...project,
            show: true
          }));
          setProjectData(projectsWithShowProperty);
        } else {
          console.error("Failed to fetch project data");
        }
      })
      .catch(error => {
        console.error("Error fetching project data:", error);
      });
  }, []);

  const handleNotInterested = projectId => {
    setProjectData(projectData.filter(project => project._id !== projectId));
  };

  const handleViewDetails = projectId => {
    navigate(`/project/${projectId}`); // Navigating to /project/projectId
  };

  return (
    <div>
      {projectData.length === 0 ? (
        <div
          className="bg-gray-50 my-4 lg:mr-44 px-4 rounded-xl shadow-md overflow-hidden"
          style={{ display: "block" }}>
          <div className="md:flex">
            <div className="p-6">
              <p className="block mt-1 text-lg leading-tight font-medium text-black text-center">
                You're caught up with all the projects!
              </p>
            </div>
          </div>
        </div>
      ) : (
        projectData.map(project => (
          <div
            key={project._id}
            className="bg-gray-50 my-4 lg:mr-44 px-4 rounded-xl shadow-md overflow-hidden lg:block hidden"
            style={{ display: project.show ? "block" : "none" }}>
            <div className="md:flex">
              <div className="p-6">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Area: {project.area}
                </div>
                <p className="block mt-1 text-lg leading-tight font-medium text-black">
                  Start Date: {new Date(project.timelines.startDate).toLocaleDateString()} - End Date:{" "}
                  {new Date(project.timelines.endDate).toLocaleDateString()}
                </p>
                <p className="mt-2 text-gray-500">
                  {project.title.length > 30 ? project.title.slice(0, 45) + "..." : project.title}
                </p>
                <button
                  onClick={() => handleViewDetails(project._id)} // Handling click event for View Details button
                  className="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  View Details
                </button>
                <button
                  onClick={() => handleNotInterested(project._id)}
                  className="mt-5 ml-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Not Interested
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HompageProjectCard;
