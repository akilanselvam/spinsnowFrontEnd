import React, { useState } from "react";
import ProblemDetail from "../Modules/ProblemModule/ProblemDetail";
import CollaborationProblem from "../Modules/CollaborationModule/CollaborationProblem";
import CollaborationProblemView from "../Modules/CollaborationModule/CollaborationProblemView";

const ProblemCollabViewModel = () => {
  const [refreshCollabView, setRefreshCollabView] = useState(false);

  const handlePostSuccess = () => {
    setRefreshCollabView(!refreshCollabView);
  };

  return (
    <div className="">
      <ProblemDetail />
      <CollaborationProblem onPostSuccess={handlePostSuccess} />
      <CollaborationProblemView key={refreshCollabView} />
    </div>
  );
};

export default ProblemCollabViewModel;
