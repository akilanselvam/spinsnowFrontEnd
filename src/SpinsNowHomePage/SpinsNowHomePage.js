import React from "react";
import GlobalSearchBar from "../Modules/UserModule/GlobalSearchBar";
import LatestTenProblems from "../Modules/ProblemModule/LatestTenProblems";
import HomePageCreateProblem from "../Modules/ProblemModule/HomePageCreateProblem";

const SpinsNowHomePage = () => {
  return (
    <div className="relative">
      <div className="lg:block hidden">
        <GlobalSearchBar />
      </div>
      <HomePageCreateProblem />
      <LatestTenProblems />
    </div>
  );
};

export default SpinsNowHomePage;
