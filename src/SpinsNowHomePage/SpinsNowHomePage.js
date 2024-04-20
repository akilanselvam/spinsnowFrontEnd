import React from "react";
import ProblemSearchBar from "../Modules/ProblemModule/ProblemSearchBar";
import LatestTenProblems from "../Modules/ProblemModule/LatestTenProblems";
import HomePageCreateProblem from "../Modules/ProblemModule/HomePageCreateProblem";

const SpinsNowHomePage = () => {
  return (
    <div className="relative">
      <ProblemSearchBar />
      <HomePageCreateProblem />
      <LatestTenProblems />
    </div>
  );
};

export default SpinsNowHomePage;
