import React, { useState } from "react";
import ProblemModule from "../Modules/ProblemModule/ProblemModule";
import CollaborationModule from "../Modules/CollaborationModule/CollaborationModule";
import CommunityModule from "../Modules/CommunityModule/CommunityModule";
import ExpertModule from "../Modules/ExpertModule/ExpertModule";
import FeedbackModule from "../Modules/FeedbackModule/FeedbackModule";
import ProjectModule from "../Modules/ProjectModule/ProjectModule";
import UserModule from "../Modules/UserModule/UserModule";
import ResourceModule from "../Modules/ResourceModule/ResourceModule";
import LoginPage from "../Modules/SecurityModule/LoginPage";
function SpinsNowModuleHomePage() {
  const [selectedModule, setSelectedModule] = useState("ProblemModule");

  const handleModuleChange = event => {
    setSelectedModule(event.target.value);
  };

  return (
    <>
      <div className="p-4">
        <div className="px-6 mt-6 text-red-700">"SpinsNow Module HomePage!"</div>
        <div className="mt-4">
          <select
            value={selectedModule}
            onChange={handleModuleChange}
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="ProblemModule">Problem Module</option>
            <option value="CollaborationModule">Collaboration Module</option>
            <option value="CommunityModule">Community Module</option>
            <option value="ExpertModule">Expert Module</option>
            <option value="FeedbackModule">Feedback Module</option>
            <option value="ProjectModule">Project Module</option>
            <option value="ResourceModule">Resource Module</option>
            <option value="UserModule">User Module</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {selectedModule === "ProblemModule" && <ProblemModule />}
        {selectedModule === "CollaborationModule" && <CollaborationModule />}
        {selectedModule === "CommunityModule" && <CommunityModule />}
        {selectedModule === "ExpertModule" && <ExpertModule />}
        {selectedModule === "FeedbackModule" && <FeedbackModule />}
        {selectedModule === "ProjectModule" && <ProjectModule />}
        {selectedModule === "ResourceModule" && <ResourceModule />}
        {selectedModule === "UserModule" && <UserModule />}
      </div>
    </>
  );
}

export default SpinsNowModuleHomePage;
