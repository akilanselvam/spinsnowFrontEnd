import React, { useState, useEffect } from "react";
import ProblemCreate from "./ProblemCreate";
import LatestTenProblems from "./LatestTenProblems";
import ProblemDetail from "./ProblemDetail";
const ProblemModule = () => {
  return (
    <div className="p-4">
      <ProblemCreate />
      <div className="p-4">
        <LatestTenProblems />
      </div>
    </div>
  );
};

export default ProblemModule;
