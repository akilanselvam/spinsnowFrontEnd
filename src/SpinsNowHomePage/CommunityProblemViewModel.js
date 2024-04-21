import React, { useState } from "react";
import CommunityDetail from "../Modules/CommunityModule/CommunityDetail";
import CommunityProblemCreate from "../Modules/CommunityModule/CommunityProblemCreate";
import CommunityProblemView from "../Modules/CommunityModule/CommunityProblemView";
const CommunityProblemViewModel = () => {
  const [refreshCollabView, setRefreshCollabView] = useState(false);

  const handlePostSuccess = () => {
    setRefreshCollabView(!refreshCollabView);
  };

  return (
    <div className="">
      <CommunityDetail />
      <CommunityProblemCreate onPostSuccess={handlePostSuccess} />
      <CommunityProblemView key={refreshCollabView} />
    </div>
  );
};

export default CommunityProblemViewModel;
