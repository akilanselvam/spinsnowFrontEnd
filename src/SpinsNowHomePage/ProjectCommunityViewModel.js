import React, { useState } from "react";
import ProjectDetail from "../Modules/ProjectModule/ProjectDetail";
import ProjectCommunityCreate from "../Modules/CommunityModule/ProjectCommunityCreate";
import ProjectCommunityView from "../Modules/CommunityModule/ProjectCommunityView";
const ProjectCommunityViewModel = () => {
  const [refreshCollabView, setRefreshCollabView] = useState(false);

  const handlePostSuccess = () => {
    setRefreshCollabView(!refreshCollabView);
  };

  return (
    <div className="">
      <ProjectDetail />
      <ProjectCommunityCreate onPostSuccess={handlePostSuccess} />
      <ProjectCommunityView key={refreshCollabView} />
    </div>
  );
};

export default ProjectCommunityViewModel;
