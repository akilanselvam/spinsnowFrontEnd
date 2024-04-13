import React, { useState, useEffect } from "react";
import ProblemCreate from "./ProblemCreate";
import LatestTenProblems from "./LatestTenProblems";
const ProblemModule = () => {
  return (
    <div className="p-4">
      <ProblemCreate />
      <LatestTenProblems />
    </div>
  );
};

export default ProblemModule;
